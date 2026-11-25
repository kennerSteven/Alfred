import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';
import authService, { TokenPayload } from '../modules/auth/auth.service.js';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw ApiError.unauthorized('No se proporcionó un token de autorización válido');
  }

  const token = authHeader.split(' ')[1];
  const payload = authService.verifyToken(token);
  req.user = payload;
  next();
};
