import { Router } from 'express';
import coincidenceController from './coincidence.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/case/:caseNumber', coincidenceController.getByCaseNumber);

export default router;
