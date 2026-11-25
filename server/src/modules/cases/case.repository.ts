import prisma from '../../config/prisma.js';
import { CreateCaseInput, CaseFilterInput } from './case.schemas.js';

export class CaseRepository {
  async getNextCaseNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await prisma.case.count();
    const sequence = String(count + 1).padStart(5, '0');
    return `${year}-${sequence}`;
  }

  async create(data: CreateCaseInput & { caseNumber: string; investigatorId: string; prosecutorId?: string }) {
    return prisma.case.create({
      data: {
        caseNumber: data.caseNumber,
        crimeType: data.crimeType,
        crimeDescription: data.crimeDescription,
        incidentDate: new Date(data.incidentDate),
        incidentTime: data.incidentTime,
        incidentLocation: data.incidentLocation,
        suspectName: data.suspectName,
        suspectDocId: data.suspectDocId,
        investigatorId: data.investigatorId,
        prosecutorId: data.prosecutorId,
        status: 'RUTA_EN_EJECUCION',
      },
      include: {
        investigator: {
          select: { fullName: true, badgeNumber: true, unit: true },
        },
        prosecutor: {
          select: { fullName: true, badgeNumber: true, unit: true },
        },
      },
    });
  }

  async findByCaseNumber(caseNumber: string) {
    return prisma.case.findUnique({
      where: { caseNumber },
      include: {
        investigator: {
          select: { id: true, fullName: true, badgeNumber: true, unit: true },
        },
        prosecutor: {
          select: { id: true, fullName: true, badgeNumber: true, unit: true },
        },
        route: {
          include: {
            tasks: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
        sourceCoincidences: {
          include: {
            matchedCase: true,
          },
        },
      },
    });
  }

  async findMany(filters: CaseFilterInput) {
    return prisma.case.findMany({
      where: {
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.investigatorId ? { investigatorId: filters.investigatorId } : {}),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        investigator: {
          select: { fullName: true, badgeNumber: true, unit: true },
        },
        prosecutor: {
          select: { fullName: true, badgeNumber: true, unit: true },
        },
        sourceCoincidences: true,
      },
    });
  }

  async updateStatus(caseNumber: string, status: string) {
    return prisma.case.update({
      where: { caseNumber },
      data: { status },
    });
  }
}

export default new CaseRepository();
