import { Request, Response, NextFunction } from 'express';
import caseService from './case.service.js';

export class CaseController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const createdCase = await caseService.registerCrimeReport(
        req.body,
        req.user!.id
      );

      res.status(201).json({
        success: true,
        message: 'Denuncia penal registrada exitosamente',
        data: createdCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async getByNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const caseNumber = String(req.params.caseNumber);
      const criminalCase = await caseService.getCaseByNumber(caseNumber);

      res.status(200).json({
        success: true,
        data: criminalCase,
      });
    } catch (error) {
      next(error);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const cases = await caseService.listCases(req.query as any);
      res.status(200).json({
        success: true,
        data: cases,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAuditLog(req: Request, res: Response, next: NextFunction) {
    try {
      const caseNumber = String(req.params.caseNumber);
      const audit = await caseService.getAuditLog(caseNumber);
      res.status(200).json({
        success: true,
        data: audit,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CaseController();
