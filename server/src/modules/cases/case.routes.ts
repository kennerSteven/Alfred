import { Router } from 'express';
import caseController from './case.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { createCaseSchema } from './case.schemas.js';

const router = Router();

// Todas las operaciones de casos requieren autenticación
router.use(authenticate);

// Listado de casos (compartido con filtros)
router.get('/', caseController.list);

// Detalle de un caso específico
router.get('/:caseNumber', caseController.getByNumber);

// Historial de auditoría inmutable
router.get('/:caseNumber/audit', caseController.getAuditLog);

// Registro de denuncia: EXCLUSIVO INVESTIGADOR (regla de negocio)
router.post(
  '/',
  requireRole(['INVESTIGADOR']),
  validateRequest({ body: createCaseSchema }),
  caseController.register
);

export default router;
