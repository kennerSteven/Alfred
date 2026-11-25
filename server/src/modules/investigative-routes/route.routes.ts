import { Router } from 'express';
import routeController from './route.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';

const router = Router();

router.use(authenticate);

// Conmutar tarea completada: EXCLUSIVO INVESTIGADOR DE CAMPO
router.patch(
  '/tasks/:taskId/toggle',
  requireRole(['INVESTIGADOR']),
  routeController.toggleTask
);

// Solicitar validación formal al Fiscal: EXCLUSIVO INVESTIGADOR
router.post(
  '/:caseNumber/request-validation',
  requireRole(['INVESTIGADOR']),
  routeController.requestValidation
);

// Aprobar ruta procesal y elevar caso: EXCLUSIVO FISCAL
router.post(
  '/:caseNumber/approve',
  requireRole(['FISCAL']),
  routeController.approveRoute
);

export default router;
