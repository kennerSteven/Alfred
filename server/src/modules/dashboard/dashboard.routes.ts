import { Router } from 'express';
import dashboardController from './dashboard.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/investigator', dashboardController.getInvestigatorData);
router.get('/fiscal', dashboardController.getFiscalData);

export default router;
