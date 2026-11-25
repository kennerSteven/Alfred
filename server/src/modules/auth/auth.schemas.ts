import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Debe ser un correo institucional válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  email: z.string().email('Debe ser un correo institucional válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  role: z.enum(['INVESTIGADOR', 'FISCAL'], {
    errorMap: () => ({ message: 'El rol debe ser INVESTIGADOR o FISCAL' }),
  }),
  badgeNumber: z.string().min(2, 'Debe especificar placa o despacho'),
  unit: z.string().min(2, 'Debe especificar unidad o fiscalía'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
