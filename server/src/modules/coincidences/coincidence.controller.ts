import { Request, Response, NextFunction } from 'express';
import coincidenceService from './coincidence.service.js';

export class CoincidenceController {
  async getByCaseNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const caseNumber = String(req.params.caseNumber);
      const coincidences = await coincidenceService.getCoincidencesByCaseNumber(caseNumber);

      res.status(200).json({
        success: true,
        data: coincidences,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CoincidenceController();
