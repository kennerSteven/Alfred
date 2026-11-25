import caseRepository from './case.repository.js';
import { CreateCaseInput, CaseFilterInput } from './case.schemas.js';
import { ApiError } from '../../utils/api-error.js';
import prisma from '../../config/prisma.js';
import routeService from '../investigative-routes/route.service.js';
import coincidenceService from '../coincidences/coincidence.service.js';

export class CaseService {
  async registerCrimeReport(input: CreateCaseInput, investigatorId: string) {
    const caseNumber = await caseRepository.getNextCaseNumber();

    // Asignar fiscal titular por defecto para el despacho
    const defaultProsecutor = await prisma.user.findFirst({
      where: { role: 'FISCAL' },
    });

    const newCase = await caseRepository.create({
      ...input,
      caseNumber,
      investigatorId,
      prosecutorId: defaultProsecutor?.id,
    });

    // Auto-generación de la Ruta Investigativa con diligencias periciales según delito
    await routeService.generateRouteForCase(newCase.id, newCase.crimeType);

    // Detección automática de coincidencias cruzadas por cédula/DNI
    if (newCase.suspectDocId) {
      await coincidenceService.findAndRecordMatches(newCase.id, newCase.suspectDocId);
    }

    // Auditoría inmutable
    await prisma.caseAuditLog.create({
      data: {
        caseId: newCase.id,
        userId: investigatorId,
        action: 'CREACION',
        detailsJson: JSON.stringify({
          caseNumber: newCase.caseNumber,
          crimeType: newCase.crimeType,
          suspectDocId: newCase.suspectDocId,
        }),
      },
    });

    return newCase;
  }

  async getCaseByNumber(caseNumber: string) {
    const criminalCase = await caseRepository.findByCaseNumber(caseNumber);
    if (!criminalCase) {
      throw ApiError.notFound(`Expediente N° ${caseNumber} no encontrado`);
    }
    return criminalCase;
  }

  async listCases(filters: CaseFilterInput) {
    return caseRepository.findMany(filters);
  }

  async getAuditLog(caseNumber: string) {
    const criminalCase = await caseRepository.findByCaseNumber(caseNumber);
    if (!criminalCase) {
      throw ApiError.notFound(`Expediente N° ${caseNumber} no encontrado`);
    }

    return prisma.caseAuditLog.findMany({
      where: { caseId: criminalCase.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { fullName: true, badgeNumber: true, role: true },
        },
      },
    });
  }
}

export default new CaseService();
