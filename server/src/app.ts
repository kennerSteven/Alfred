import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes.js';
import caseRoutes from './modules/cases/case.routes.js';
import routeRoutes from './modules/investigative-routes/route.routes.js';
import coincidenceRoutes from './modules/coincidences/coincidence.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

// Endpoint base de chequeo de salud
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      service: 'Alfred SIC API',
      status: 'ok',
      timestamp: new Date().toISOString()
    }
  });
});

// Rutas de Módulos
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/coincidences', coincidenceRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Middleware centralizado de errores
app.use(errorHandler);

export default app;
