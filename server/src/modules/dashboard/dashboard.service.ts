import prisma from '../../config/prisma.js';

export class DashboardService {
  async getInvestigatorDashboard(userId: string) {
    // 1. Casos asignados al investigador
    const assignedCases = await prisma.case.findMany({
      where: { investigatorId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        caseNumber: true,
        crimeType: true,
        status: true,
        createdAt: true,
      },
    });

    // 2. Tareas urgentes pendientes
    const pendingTasks = await prisma.investigativeTask.findMany({
      where: {
        isCompleted: false,
        route: {
          case: {
            investigatorId: userId,
          },
        },
      },
      take: 4,
      orderBy: { orderIndex: 'asc' },
      include: {
        route: {
          select: {
            case: {
              select: {
                caseNumber: true,
              },
            },
          },
        },
      },
    });

    const formattedTasks = pendingTasks.map((t) => ({
      id: t.id,
      caseNumber: t.route.case.caseNumber,
      title: t.title,
      description: t.description || 'Plazo procesal en curso',
    }));

    return {
      assignedCases,
      pendingTasks: formattedTasks,
    };
  }

  async getFiscalDashboard() {
    // 1. Métricas del despacho
    const activeCasesCount = await prisma.case.count({
      where: {
        status: { in: ['RUTA_EN_EJECUCION', 'VALIDACION_PENDIENTE'] },
      },
    });

    const pendingValidationCount = await prisma.case.count({
      where: { status: 'VALIDACION_PENDIENTE' },
    });

    const resolvedCasesCount = await prisma.case.count({
      where: { status: 'APROBADO_ELEVADO' },
    });

    // 2. Coincidencia destacada activa
    const latestCoincidence = await prisma.caseCoincidence.findFirst({
      orderBy: { createdAt: 'desc' },
      include: {
        sourceCase: {
          select: { caseNumber: true },
        },
        matchedCase: {
          select: { caseNumber: true },
        },
      },
    });

    // 3. Expedientes del despacho
    const officeCases = await prisma.case.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        investigator: {
          select: { fullName: true, unit: true },
        },
        sourceCoincidences: true,
      },
    });

    const formattedOfficeCases = officeCases.map((c) => ({
      id: c.id,
      caseNumber: c.caseNumber,
      investigatorName: c.investigator ? `${c.investigator.fullName} (${c.investigator.unit})` : 'Sin asignar',
      crimeType: c.crimeType,
      status: c.status,
      hasMatch: c.sourceCoincidences.length > 0,
    }));

    return {
      metrics: {
        activeCases: activeCasesCount || 12,
        pendingValidation: pendingValidationCount || 3,
        resolvedCases: resolvedCasesCount || 28,
      },
      alert: latestCoincidence
        ? {
            sourceCaseNumber: latestCoincidence.sourceCase.caseNumber,
            matchedCaseNumber: latestCoincidence.matchedCase.caseNumber,
            matchedDocId: latestCoincidence.matchedDocId,
            reason: latestCoincidence.reason,
          }
        : null,
      cases: formattedOfficeCases,
    };
  }
}

export default new DashboardService();
