import { Router } from 'express';
import authController from './auth.controller.js';
import { validateRequest } from '../../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from './auth.schemas.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/login',
  validateRequest({ body: loginSchema }),
  authController.login
);

router.post(
  '/register',
  validateRequest({ body: registerSchema }),
  authController.register
);

router.get(
  '/me',
  authenticate,
  authController.me
);

export default router;
