import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Limpiando base de datos SQLite...');
  await prisma.caseAuditLog.deleteMany();
  await prisma.caseCoincidence.deleteMany();
  await prisma.routeValidationRequest.deleteMany();
  await prisma.investigativeTask.deleteMany();
  await prisma.investigativeRoute.deleteMany();
  await prisma.case.deleteMany();
  await prisma.user.deleteMany();

  console.log('[Seed] Creando usuarios institucionales...');
  const passwordHash = await bcrypt.hash('alfred2026', 10);

  // 1. Investigador
  const investigator = await prisma.user.create({
    data: {
      email: 'carlos.mendoza@policia.gob',
      passwordHash,
      fullName: 'Insp. Carlos Mendoza',
      role: 'INVESTIGADOR',
      badgeNumber: 'IP-88412',
      unit: 'Unidad de Investigación de Hurtos y Homicidios (SIJIN)',
    },
  });

  // 2. Fiscal
  const prosecutor = await prisma.user.create({
    data: {
      email: 'elena.restrepo@fiscalia.gob',
      passwordHash,
      fullName: 'Dra. Elena Restrepo',
      role: 'FISCAL',
      badgeNumber: 'DF-0492',
      unit: 'Fiscalía Local / Seccional N° 3',
    },
  });

  console.log('[Seed] Creando casos criminales y rutas periciales...');

  // Caso 1: Caso histórico anterior para generar MATCH
  const caseHistory = await prisma.case.create({
    data: {
      caseNumber: '2026-01149',
      crimeType: 'Hurto Calificado',
      crimeDescription: 'Asalto a transporte de valores y blindados en vía pública con armas de fuego.',
      incidentDate: new Date('2026-01-14T09:30:00Z'),
      incidentTime: '09:30',
      incidentLocation: 'Sector Industrial El Roble, Bodega 4',
      suspectName: 'Rodrigo Andrés Peña Silva',
      suspectDocId: '109402315',
      status: 'APROBADO_ELEVADO',
      investigatorId: investigator.id,
      prosecutorId: prosecutor.id,
    },
  });

  // Caso 2: Caso Principal del Prototipo
  const caseMain = await prisma.case.create({
    data: {
      caseNumber: '2026-04823',
      crimeType: 'Hurto Calificado',
      crimeDescription: 'Hurto Calificado y Agravado en Entidad Financiera con Arma de Fuego.',
      incidentDate: new Date('2026-03-22T10:14:00Z'),
      incidentTime: '10:14',
      incidentLocation: "Carrera 7 con Calle 72, Banco Metropolitano - Sucursal Central",
      suspectName: 'Rodrigo Andrés Peña Silva',
      suspectDocId: '109402315',
      status: 'RUTA_EN_EJECUCION',
      investigatorId: investigator.id,
      prosecutorId: prosecutor.id,
    },
  });

  // Ruta Investigativa del Caso Principal
  const routeMain = await prisma.investigativeRoute.create({
    data: {
      caseId: caseMain.id,
      crimeTemplate: 'HURTO_CALIFICADO',
      tasks: {
        create: [
          {
            orderIndex: 1,
            title: '1. Inspección del lugar de los hechos y fijación fotográfica',
            description: 'Completada • Fijadas 42 tomas en archivo digital y dactiloscopia',
            legalBasis: 'Art. 213 CPP (Ley 906) - Inspección del lugar de los hechos',
            isCompleted: true,
            completedAt: new Date('2026-03-22T12:00:00Z'),
            completedByUserId: investigator.id,
          },
          {
            orderIndex: 2,
            title: '2. Recolectar y asegurar cámaras de seguridad perimétricas',
            description: 'Completada • DVR incautado bajo cadena de custodia #8812',
            legalBasis: 'Art. 254 CPP (Ley 906) - Cadena de custodia y recolección de EMP',
            isCompleted: true,
            completedAt: new Date('2026-03-22T15:30:00Z'),
            completedByUserId: investigator.id,
          },
          {
            orderIndex: 3,
            title: '3. Solicitar antecedentes judiciales y anotaciones SPOA del implicado',
            description: 'En gestión • Requiere consolidación de coincidencias previas',
            legalBasis: 'Art. 205 CPP (Ley 906) - Actividad de policía judicial',
            isCompleted: false,
          },
          {
            orderIndex: 4,
            title: '4. Toma de entrevistas a cajero principal, guardia y testigos presenciales',
            description: 'Pendiente de comparecencia en sede policial',
            legalBasis: 'Art. 206 CPP (Ley 906) - Entrevista forense de testigos',
            isCompleted: false,
          },
          {
            orderIndex: 5,
            title: '5. Peritaje balístico y dactiloscópico de evidencias halladas',
            description: 'Remitido a Laboratorio de Criminalística (DIJIN / CTI)',
            legalBasis: 'Art. 257 CPP (Ley 906) - Examen pericial de EMP',
            isCompleted: false,
          },
        ],
      },
    },
  });

  // Coincidencia Criminológica (MATCH POSITIVO 98%)
  await prisma.caseCoincidence.create({
    data: {
      sourceCaseId: caseMain.id,
      matchedCaseId: caseHistory.id,
      matchedDocId: '109402315',
      confidenceScore: 0.98,
      reason: 'Cédula de ciudadanía 109402315 y rasgos fisonómicos periciales coinciden con el expediente radicado en Fiscalía Seccional por hurto calificado a blindados.',
    },
  });

  // Caso 3: Caso adicional para lista de investigador
  await prisma.case.create({
    data: {
      caseNumber: '2026-04790',
      crimeType: 'Extorsión',
      crimeDescription: 'Extorsión y Coacción Agravada vía telefónica sistemática.',
      incidentDate: new Date('2026-03-20T16:00:00Z'),
      incidentTime: '16:00',
      incidentLocation: 'Distrito Central',
      suspectName: 'Desconocido (Alias El Ruso)',
      status: 'RUTA_EN_EJECUCION',
      investigatorId: investigator.id,
      prosecutorId: prosecutor.id,
    },
  });

  // Caso 4: Caso con validación pendiente para vista fiscal
  await prisma.case.create({
    data: {
      caseNumber: '2026-04611',
      crimeType: 'Homicidio',
      crimeDescription: 'Homicidio en Grado de Tentativa en vía pública.',
      incidentDate: new Date('2026-03-18T22:15:00Z'),
      incidentTime: '22:15',
      incidentLocation: 'Sector Sur, Pasaje Los Aromos',
      suspectName: 'Matías Ignacio Soto Paredes',
      suspectDocId: '19.452.109-8',
      status: 'VALIDACION_PENDIENTE',
      investigatorId: investigator.id,
      prosecutorId: prosecutor.id,
    },
  });

  console.log('[Seed] Datos iniciales insertados con éxito.');
  console.log(`- Investigador: ${investigator.email} (Password: alfred2026)`);
  console.log(`- Fiscal: ${prosecutor.email} (Password: alfred2026)`);
  console.log(`- Caso Principal: ${caseMain.caseNumber} con ruta ${routeMain.id}`);
}

main()
  .catch((e) => {
    console.error('[Seed Error]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
