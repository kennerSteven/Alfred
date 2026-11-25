import prisma from '../../config/prisma.js';

export class CoincidenceService {
  async findAndRecordMatches(caseId: string, suspectDocId: string) {
    if (!suspectDocId || suspectDocId.trim() === '') return [];

    // Buscar casos previos con el mismo DNI excluyendo el caso actual
    const previousCases = await prisma.case.findMany({
      where: {
        suspectDocId: suspectDocId.trim(),
        id: { not: caseId },
      },
      select: {
        id: true,
        caseNumber: true,
        crimeType: true,
        suspectName: true,
      },
    });

    const recordedCoincidences = [];

    for (const prev of previousCases) {
      const match = await prisma.caseCoincidence.upsert({
        where: {
          sourceCaseId_matchedCaseId: {
            sourceCaseId: caseId,
            matchedCaseId: prev.id,
          },
        },
        create: {
          sourceCaseId: caseId,
          matchedCaseId: prev.id,
          matchedDocId: suspectDocId.trim(),
          confidenceScore: 0.98,
          reason: `El sospechoso coincide con Caso N° ${prev.caseNumber}. Posible actor recurrente (${prev.crimeType}).`,
        },
        update: {},
      });
      recordedCoincidences.push(match);
    }

    return recordedCoincidences;
  }

  async getCoincidencesByCaseNumber(caseNumber: string) {
    const criminalCase = await prisma.case.findUnique({
      where: { caseNumber },
    });

    if (!criminalCase) return [];

    return prisma.caseCoincidence.findMany({
      where: { sourceCaseId: criminalCase.id },
      include: {
        matchedCase: {
          select: {
            caseNumber: true,
            crimeType: true,
            crimeDescription: true,
            incidentLocation: true,
            status: true,
          },
        },
      },
    });
  }
}

export default new CoincidenceService();
