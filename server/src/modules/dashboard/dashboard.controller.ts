import { Request, Response, NextFunction } from 'express';
import dashboardService from './dashboard.service.js';

export class DashboardController {
  async getInvestigatorData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getInvestigatorDashboard(req.user!.id);
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFiscalData(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await dashboardService.getFiscalDashboard();
      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();
