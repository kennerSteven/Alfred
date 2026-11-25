import { Request, Response, NextFunction } from 'express';
import routeService from './route.service.js';

export class RouteController {
  async toggleTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskId = String(req.params.taskId);
      const updated = await routeService.toggleTaskStatus(taskId, req.user!.id);

      res.status(200).json({
        success: true,
        message: 'Estado de diligencia pericial actualizado',
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async requestValidation(req: Request, res: Response, next: NextFunction) {
    try {
      const caseNumber = String(req.params.caseNumber);
      const result = await routeService.requestValidation(caseNumber, req.user!.id);

      res.status(200).json({
        success: true,
        message: 'Ruta investigativa remitida al Despacho Fiscal exitosamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async approveRoute(req: Request, res: Response, next: NextFunction) {
    try {
      const caseNumber = String(req.params.caseNumber);
      const result = await routeService.approveRoute(caseNumber, req.user!.id);

      res.status(200).json({
        success: true,
        message: 'Ruta procesal aprobada formalmente por Fiscalía',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RouteController();
