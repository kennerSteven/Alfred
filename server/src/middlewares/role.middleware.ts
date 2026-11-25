import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';

export const requireRole = (allowedRoles: Array<'INVESTIGADOR' | 'FISCAL'>) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw ApiError.unauthorized('Usuario no autenticado');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden(
        `Acceso restringido: El rol ${req.user.role} no tiene permisos para esta operación`
      );
    }

    next();
  };
};
