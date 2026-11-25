import prisma from '../../config/prisma.js';
import { getTemplateForCrime } from './route.templates.js';
import { ApiError } from '../../utils/api-error.js';

export class RouteService {
  async generateRouteForCase(caseId: string, crimeType: string) {
    const templates = getTemplateForCrime(crimeType);

    return prisma.investigativeRoute.create({
      data: {
        caseId,
        crimeTemplate: crimeType.toUpperCase().replace(/\s+/g, '_'),
        tasks: {
          create: templates.map((t) => ({
            orderIndex: t.orderIndex,
            title: t.title,
            description: t.description,
            legalBasis: t.legalBasis,
            isCompleted: false,
          })),
        },
      },
      include: {
        tasks: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
  }

  async toggleTaskStatus(taskId: string, userId: string) {
    const task = await prisma.investigativeTask.findUnique({
      where: { id: taskId },
      include: { route: true },
    });

    if (!task) {
      throw ApiError.notFound('Diligencia pericial no encontrada');
    }

    const updatedTask = await prisma.investigativeTask.update({
      where: { id: taskId },
      data: {
        isCompleted: !task.isCompleted,
        completedAt: !task.isCompleted ? new Date() : null,
        completedByUserId: !task.isCompleted ? userId : null,
      },
    });

    // Auditoría
    await prisma.caseAuditLog.create({
      data: {
        caseId: task.route.caseId,
        userId,
        action: 'MARCADO_TAREA',
        detailsJson: JSON.stringify({
          taskId: task.id,
          title: task.title,
          isCompleted: updatedTask.isCompleted,
        }),
      },
    });

    return updatedTask;
  }

  async requestValidation(caseNumber: string, userId: string) {
    const criminalCase = await prisma.case.findUnique({
      where: { caseNumber },
    });

    if (!criminalCase) {
      throw ApiError.notFound('Expediente no encontrado');
    }

    // Actualizar estado del caso
    await prisma.case.update({
      where: { caseNumber },
      data: { status: 'VALIDACION_PENDIENTE' },
    });

    // Crear solicitud formal
    const request = await prisma.routeValidationRequest.create({
      data: {
        caseId: criminalCase.id,
        requestedByUserId: userId,
        status: 'PENDIENTE',
      },
    });

    // Auditoría
    await prisma.caseAuditLog.create({
      data: {
        caseId: criminalCase.id,
        userId,
        action: 'SOLICITUD_VALIDACION',
        detailsJson: JSON.stringify({ requestId: request.id }),
      },
    });

    return {
      status: 'VALIDACION_PENDIENTE',
      requestId: request.id,
    };
  }

  async approveRoute(caseNumber: string, prosecutorId: string) {
    const criminalCase = await prisma.case.findUnique({
      where: { caseNumber },
    });

    if (!criminalCase) {
      throw ApiError.notFound('Expediente no encontrado');
    }

    // Actualizar estado a Aprobado / Elevado
    await prisma.case.update({
      where: { caseNumber },
      data: { status: 'APROBADO_ELEVADO' },
    });

    // Cerrar solicitud formal si existe
    await prisma.routeValidationRequest.updateMany({
      where: { caseId: criminalCase.id, status: 'PENDIENTE' },
      data: { status: 'APROBADO', resolvedAt: new Date() },
    });

    // Auditoría
    await prisma.caseAuditLog.create({
      data: {
        caseId: criminalCase.id,
        userId: prosecutorId,
        action: 'APROBACION_FISCAL',
        detailsJson: JSON.stringify({ approvedBy: prosecutorId }),
      },
    });

    return {
      status: 'APROBADO_ELEVADO',
    };
  }
}

export default new RouteService();
