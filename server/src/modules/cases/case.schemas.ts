import { z } from 'zod';

export const createCaseSchema = z.object({
  crimeType: z.string().min(2, 'Debe seleccionar un tipo de delito tipificado'),
  crimeDescription: z.string().optional(),
  incidentDate: z.string().min(8, 'Debe ingresar una fecha válida (YYYY-MM-DD)'),
  incidentTime: z.string().min(4, 'Debe ingresar la hora estimada (HH:MM)'),
  incidentLocation: z.string().min(3, 'Debe especificar el lugar del suceso'),
  suspectName: z.string().optional(),
  suspectDocId: z.string().min(3, 'Debe ingresar la cédula o DNI del implicado'),
});

export const caseFilterSchema = z.object({
  status: z.string().optional(),
  investigatorId: z.string().optional(),
});

export type CreateCaseInput = z.infer<typeof createCaseSchema>;
export type CaseFilterInput = z.infer<typeof caseFilterSchema>;
