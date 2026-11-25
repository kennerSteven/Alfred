# Plan de Desarrollo y Seguimiento de Tareas — Alfred SIC

Sistema de Información y Coordinación Criminalística (MVP).

---

## Control de Estados
- `[PENDIENTE]` — Aún no iniciada.
- `[EN_PROGRESO]` — En ejecución activa.
- `[EN_REVISION]` — Implementada y verificada internamente, esperando revisión y aprobación.
- `[BLOQUEADA]` — Depende de otra tarea no completada o de una decisión previa.
- `[COMPLETADA]` — Aprobada formalmente.

---

## Resumen de Avance

| Etapa | Descripción | Tareas | Estado |
| :--- | :--- | :---: | :---: |
| **Etapa 1** | Preparación del Entorno y Base de Datos (Fundación) | 3 | `[COMPLETADA]` |
| **Etapa 2** | Sistema de Diseño y Componentes Compartidos (UI) | 3 | `[COMPLETADA]` |
| **Etapa 3** | Autenticación, Usuarios y Control de Acceso (RBAC) | 2 | `[COMPLETADA]` |
| **Etapa 4** | Registro y Gestión de Noticias Criminales (Casos) | 2 | `[COMPLETADA]` |
| **Etapa 5** | Rutas Investigativas (Checklist Pericial) | 2 | `[COMPLETADA]` |
| **Etapa 6** | Módulo de Coincidencias Criminológicas (Matching) | 2 | `[COMPLETADA]` |
| **Etapa 7** | Dashboards Especializados por Rol | 2 | `[COMPLETADA]` |
| **Etapa 8** | Integración, Auditoría y Pruebas Finales | 2 | `[COMPLETADA]` |
| **Etapa 4** | Registro y Gestión de Noticias Criminales (Casos) | 2 | `[PENDIENTE]` |
| **Etapa 5** | Rutas Investigativas (Checklist Pericial) | 2 | `[PENDIENTE]` |
| **Etapa 6** | Módulo de Coincidencias Criminológicas (Matching) | 2 | `[PENDIENTE]` |
| **Etapa 7** | Dashboards Especializados por Rol | 2 | `[PENDIENTE]` |
| **Etapa 8** | Integración, Auditoría y Pruebas Finales | 2 | `[PENDIENTE]` |

---

## Desglose Detallado de Tareas

### ETAPA 1: Preparación del Entorno y Base de Datos (Fundación)

#### Tarea 1.1: Inicialización de la estructura de proyecto y dependencias base
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Crear la estructura de carpetas monorepo para `server/` (Node + Express + TypeScript) y `client/` (Vite + React + TypeScript), configurar dependencias iniciales y scripts de ejecución.
* **Archivos Involucrados:**
  - `server/package.json`
  - `server/tsconfig.json`
  - `server/.env.example`
  - `server/.env`
  - `server/src/app.ts`
  - `server/src/server.ts`
  - `client/package.json`
  - `client/tsconfig.json`
  - `client/vite.config.ts`
  - `client/tailwind.config.js`
  - `client/postcss.config.js`
  - `client/src/main.tsx`
  - `client/src/index.css`
  - `.gitignore`
* **Checklist:**
  - [x] Se creó la estructura de directorios `/server` y `/client`.
  - [x] Se configuró `server/package.json` con Express, CORS, dotenv, tsx/ts-node y tipos.
  - [x] Se configuró `server/tsconfig.json` con modo estricto.
  - [x] Se creó la separación limpia entre `app.ts` (configuración) y `server.ts` (arranque HTTP).
  - [x] Se inicializó `client` con Vite + React 19 + TypeScript y Tailwind CSS configurado con la paleta de Alfred SIC.
  - [x] Se configuró `.gitignore` para omitir `node_modules`, `.env`, y bases de datos SQLite locales.
  - [x] El servidor compila (`npm --prefix server run build` exitoso con ruta `/api/health` registrada).
  - [x] El cliente compila (`npm --prefix client run build` genera bundle sin errores de TypeScript).

---

#### Tarea 1.2: Configuración de Base de Datos SQLite y Prisma ORM
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Definir `schema.prisma` completo con relaciones relacionales, generar la migración SQLite inicial (`dev.db`) y crear el script de sembrado (`seed.ts`) con datos base (1 Investigador, 1 Fiscal, 2 casos de prueba con sus rutas investigativas).
* **Archivos Involucrados:**
  - `server/prisma/schema.prisma`
  - `server/prisma/seed.ts`
  - `server/src/config/prisma.ts`
  - `server/package.json`
* **Checklist:**
  - [x] Se definió `schema.prisma` con modelos: `User`, `Case`, `InvestigativeRoute`, `InvestigativeTask`, `CaseCoincidence`, `RouteValidationRequest`, `CaseAuditLog`.
  - [x] Se configuró el proveedor SQLite (`provider = "sqlite"`, `url = env("DATABASE_URL")`).
  - [x] Se ejecutó la migración inicial de Prisma generando el esquema en `dev.db`.
  - [x] Se generó el cliente de Prisma tipado (`@prisma/client`).
  - [x] Se creó el módulo de conexión centralizado `server/src/config/prisma.ts`.
  - [x] Se implementó `seed.ts` con contraseñas encriptadas con `bcrypt`.
  - [x] Se ejecutó el script de seed y se verificó la persistencia de usuarios y casos de prueba.

---

#### Tarea 1.3: Middleware Centralizado y Cliente Axios Base
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar clase `ApiError`, middleware global de errores en Express, validador de esquemas Zod y configurar la instancia cliente de Axios con interceptores.
* **Archivos Involucrados:**
  - `server/src/utils/api-error.ts`
  - `server/src/middlewares/error.middleware.ts`
  - `server/src/middlewares/validate.middleware.ts`
  - `server/src/app.ts`
  - `client/src/shared/services/api.client.ts`
  - `client/src/shared/types/api.types.ts`
  - `client/src/vite-env.d.ts`
* **Checklist:**
  - [x] Se creó la clase `ApiError` para excepciones HTTP tipadas.
  - [x] Se implementó `error.middleware.ts` en Express capturando `ApiError`, errores de Zod y excepciones inesperadas en formato JSON `{ success: false, message, errors }`.
  - [x] Se implementó `validate.middleware.ts` para validación de `body`, `query` y `params` con Zod.
  - [x] Se integraron los middlewares en `server/src/app.ts`.
  - [x] Se crearon tipos estándar para respuestas de API en el cliente (`ApiResponse<T>`, `ApiErrorResponse`).
  - [x] Se configuró el cliente Axios en `client/src/shared/services/api.client.ts` con inyección de JWT e interceptor de errores.
  - [x] El backend compila sin errores de TypeScript (`npm --prefix server run build`).
  - [x] El cliente compila sin errores de TypeScript (`npm --prefix client run build`).

---

### ETAPA 2: Sistema de Diseño y Componentes Compartidos (UI)

#### Tarea 2.1: Primitivas UI Reutilizables (Botones, Badges, Cards, Alertas)
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar los componentes atómicos del sistema visual de Alfred SIC respetando la estética plana, sin sombras decorativas y la paleta *Total Blue* del prototipo HTML.
* **Archivos Involucrados:**
  - `client/src/shared/components/ui/Button.tsx`
  - `client/src/shared/components/ui/Badge.tsx`
  - `client/src/shared/components/ui/Card.tsx`
  - `client/src/shared/components/ui/AlertBox.tsx`
* **Checklist:**
  - [x] Se creó `Button.tsx` con variantes: `primary` (`#5087F7`), `secondary` (`#8BCFF1`), `outline` y soporte para `disabled`/carga.
  - [x] Se creó `Badge.tsx` para estados procesales (`Ruta en ejecución`, `Validación Pendiente`, `Aprobado/Elevado`, `Match`).
  - [x] Se creó `Card.tsx` con bordes planos (`#BDC7D7`) y fondos institucionales (`#FFFFFF` y `#F8FAFC`).
  - [x] Se creó `AlertBox.tsx` con el diseño naranja del prototipo (`#FEF3C7` y borde `#F59E0B`) para coincidencias.
  - [x] Los componentes compilan sin errores en TypeScript (`npm --prefix client run build`).

---

#### Tarea 2.2: Componentes de Formulario y Tablas Reutilizables
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar inputs, selects y tablas accesibles con bordes `#BDC7D7` y soporte para validaciones de React Hook Form.
* **Archivos Involucrados:**
  - `client/src/shared/components/forms/InputField.tsx`
  - `client/src/shared/components/forms/SelectField.tsx`
  - `client/src/shared/components/tables/Table.tsx`
* **Checklist:**
  - [x] Se creó `InputField.tsx` con etiqueta en mayúsculas, descripción de ayuda y renderizado de mensaje de error.
  - [x] Se creó `SelectField.tsx` plano estilizado según el prototipo.
  - [x] Se creó `Table.tsx` con encabezado gris pizarra `#F8FAFC`, bordes inferiores y filas con hover.
  - [x] Compilación exitosa en TypeScript sin advertencias (`npm --prefix client run build`).

---

#### Tarea 2.3: Layout Institucional, Header y Subheader Dinámico
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar la estructura global de navegación del prototipo: barra superior fija con logo/MVP, selector dinámico de roles (Investigador vs Fiscal), subheader contextual y footer.
* **Archivos Involucrados:**
  - `client/src/app/layouts/Header.tsx`
  - `client/src/app/layouts/Footer.tsx`
  - `client/src/app/layouts/MainLayout.tsx`
* **Checklist:**
  - [x] Se creó `Header.tsx` con marca "Alfred SIC", badge "MVP", enlaces de navegación activa y switch interactivo de roles.
  - [x] Se creó `Footer.tsx` con el texto de copyright y filosofía de diseño del prototipo.
  - [x] Se creó `MainLayout.tsx` conteniendo el subheader con título dinámico (`Panel Operativo` vs `Despacho Fiscal`) y badge de rol (`Trabajo de Campo` vs `Dirección y Control`).
  - [x] Compilación exitosa en TypeScript (`npm --prefix client run build`).

---

### ETAPA 3: Autenticación, Usuarios y Control de Acceso (RBAC)

#### Tarea 3.1: Backend — Endpoints de Auth, JWT y Middlewares RBAC
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar el módulo de autenticación en el backend: login, obtención de usuario actual (`/me`), generación de JWT con rol institucional y middlewares de autorización por roles.
* **Archivos Involucrados:**
  - `server/src/modules/auth/auth.schemas.ts`
  - `server/src/modules/auth/auth.repository.ts`
  - `server/src/modules/auth/auth.service.ts`
  - `server/src/modules/auth/auth.controller.ts`
  - `server/src/modules/auth/auth.routes.ts`
  - `server/src/middlewares/auth.middleware.ts`
  - `server/src/middlewares/role.middleware.ts`
  - `server/src/app.ts`
* **Checklist:**
  - [x] Se crearon esquemas Zod para login y registro en `auth.schemas.ts`.
  - [x] Se implementó `auth.repository.ts` para consulta de usuarios en SQLite mediante Prisma.
  - [x] Se implementó `auth.service.ts` validando contraseñas con `bcrypt` y firmando JWT con payload `{ id, email, role, fullName }`.
  - [x] Se implementó `auth.controller.ts` y sus rutas `POST /api/auth/login` y `GET /api/auth/me`.
  - [x] Se implementó `auth.middleware.ts` verificando el token Bearer.
  - [x] Se implementó `role.middleware.ts` (`requireRole(['INVESTIGADOR'])`) para proteger endpoints sensibles.
  - [x] Se montaron las rutas en `server/src/app.ts`.
  - [x] Compilación exitosa de TypeScript en el backend (`npm --prefix server run build`).
  - [x] Verificación de login exitoso con credenciales sembradas (`carlos.mendoza@policia.gob` y `elena.restrepo@fiscalia.gob`).

---

#### Tarea 3.2: Frontend — AuthProvider, Hook de Sesión y Rutas Protegidas
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar el contexto global de autenticación en React (`AuthContext`), sincronización con `localStorage`, soporte para alternancia ágil de roles (switch de pruebas MVP) y enrutamiento con React Router.
* **Archivos Involucrados:**
  - `client/src/features/auth/context/AuthContext.tsx`
  - `client/src/features/auth/hooks/useAuth.ts`
  - `client/src/features/auth/services/auth.service.ts`
  - `client/src/app/router/AppRouter.tsx`
  - `client/src/app/router/ProtectedRoute.tsx`
  - `client/src/main.tsx`
* **Checklist:**
  - [x] Se implementó `auth.service.ts` en el cliente consumiendo `/api/auth/login` y `/api/auth/me`.
  - [x] Se implementó `AuthContext.tsx` con métodos `login`, `logout` y `switchRoleDev` para alternar entre el Investigador y la Fiscal del seed.
  - [x] Se creó el hook `useAuth()`.
  - [x] Se configuró `AppRouter.tsx` con rutas iniciales (`/dashboard`, `/cases/:caseId`, `/cases/new`).
  - [x] Se implementó `ProtectedRoute.tsx` y restricción de rol para `/cases/new` (solo `INVESTIGADOR`).
  - [x] El cliente compila sin errores en TypeScript (`npm --prefix client run build`).

---

### ETAPA 4: Registro y Gestión de Noticias Criminales (Casos)

#### Tarea 4.1: Backend — API de Casos y Numeración Automática
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar rutas, controlador, servicio y repositorio para creación, consulta por ID y listado filtrado de casos criminales, con generación correlativa de número de caso (`2026-XXXXX`).
* **Archivos Involucrados:**
  - `server/src/modules/cases/case.schemas.ts`
  - `server/src/modules/cases/case.repository.ts`
  - `server/src/modules/cases/case.service.ts`
  - `server/src/modules/cases/case.controller.ts`
  - `server/src/modules/cases/case.routes.ts`
  - `server/src/app.ts`
* **Checklist:**
  - [x] Se crearon esquemas Zod en `case.schemas.ts` para creación de caso (`crimeType`, `incidentDate`, `incidentTime`, `incidentLocation`, `suspectDocId`, etc.).
  - [x] Se implementó `case.repository.ts` con consultas Prisma (`create`, `findByCaseNumber`, `findMany`).
  - [x] Se implementó `case.service.ts` con generación automática de código `2026-XXXXX`, asignación del investigador creador y registro de auditoría.
  - [x] Se implementó `case.controller.ts` con manejo de estados HTTP.
  - [x] Se implementó `case.routes.ts` protegiendo `POST /api/cases` con `requireRole(['INVESTIGADOR'])`.
  - [x] Se montaron las rutas en `server/src/app.ts`.
  - [x] Compilación exitosa de TypeScript en el backend (`npm --prefix server run build`).
  - [x] Verificación de creación de caso en SQLite y consulta de detalle confirmada.

---

#### Tarea 4.2: Frontend — Formulario de Registro de Denuncia y Detalle de Caso
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar la vista completa del formulario de registro (`CaseRegisterForm`) con React Hook Form + Zod, y la vista de detalle de caso (`CaseDetailView`) con Bloque 1 (Datos de la causa), consumiendo la API de casos.
* **Archivos Involucrados:**
  - `client/src/features/cases/types/case.types.ts`
  - `client/src/features/cases/services/case.service.ts`
  - `client/src/features/cases/components/CaseRegisterForm.tsx`
  - `client/src/features/cases/components/CaseDetailView.tsx`
  - `client/src/app/router/AppRouter.tsx`
* **Checklist:**
  - [x] Se crearon tipos TypeScript para casos y formularios (`CaseItem`, `CreateCaseFormData`).
  - [x] Se creó `case.service.ts` para consumir `POST /api/cases`, `GET /api/cases/:caseNumber`, `GET /api/cases`.
  - [x] Se implementó `CaseRegisterForm.tsx` con React Hook Form y Zod resolver, replicando exactamente `#view-register` del prototipo.
  - [x] Se implementó `CaseDetailView.tsx` renderizando la cabecera del expediente y el Bloque 1 (Datos de la Causa).
  - [x] Se conectaron las rutas reales en `AppRouter.tsx`.
  - [x] El cliente compila sin errores en TypeScript (`npm --prefix client run build`).

---

### ETAPA 5: Rutas Investigativas (Checklist Pericial)

#### Tarea 5.1: Backend — Motor de Reglas Periciales y Gestión de Tareas
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Definir las plantillas legales y periciales según tipo de delito (Robo Calificado, Homicidio, Extorsión, Tráfico Ilícito, Fraude Digital), auto-generar la ruta con tareas al crear el caso, y habilitar endpoints para alternar cumplimiento (`PATCH /api/cases/:caseNumber/tasks/:taskId`) y solicitar validación formal (`POST /api/cases/:caseNumber/request-validation`).
* **Archivos Involucrados:**
  - `server/src/modules/investigative-routes/route.templates.ts`
  - `server/src/modules/investigative-routes/route.service.ts`
  - `server/src/modules/investigative-routes/route.controller.ts`
  - `server/src/modules/investigative-routes/route.routes.ts`
  - `server/src/modules/cases/case.service.ts`
  - `server/src/app.ts`
* **Checklist:**
  - [x] Se crearon plantillas periciales completas con fundamentos legales en `route.templates.ts`.
  - [x] `CaseService.registerCrimeReport` invoca la generación automática de la ruta y sus tareas en SQLite.
  - [x] Se implementó endpoint `PATCH /api/routes/tasks/:taskId/toggle` restringido al rol `INVESTIGADOR`.
  - [x] Se implementó endpoint `POST /api/routes/:caseNumber/request-validation` que actualiza el estado a `VALIDACION_PENDIENTE` y crea `RouteValidationRequest`.
  - [x] Se implementó endpoint `POST /api/routes/:caseNumber/approve` restringido al rol `FISCAL` que actualiza el estado a `APROBADO_ELEVADO`.
  - [x] Compilación exitosa de TypeScript en el backend (`npm --prefix server run build`).
  - [x] Pruebas unitarias de conmutación de tareas y cambio de estados comprobadas exitosamente.

---

#### Tarea 5.2: Frontend — Bloque 2: Checklist Interactivo y Acciones Condicionales
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar el componente `RouteChecklist` dentro del detalle de caso (`CaseDetailView`), permitiendo marcar tareas y solicitar validación al Investigador, y mostrando el checklist en solo lectura con botón de aprobación para el Fiscal.
* **Archivos Involucrados:**
  - `client/src/features/investigative-routes/types/route.types.ts`
  - `client/src/features/investigative-routes/services/route.service.ts`
  - `client/src/features/investigative-routes/components/RouteChecklist.tsx`
  - `client/src/features/cases/components/CaseDetailView.tsx`
* **Checklist:**
  - [x] Se crearon tipos TypeScript para rutas y tareas (`InvestigativeRoute`, `InvestigativeTask`).
  - [x] Se implementó `route.service.ts` consumiendo los endpoints de conmutación, solicitud y aprobación.
  - [x] Se creó `RouteChecklist.tsx` replicando con exactitud el Bloque 2 del HTML.
  - [x] Checkboxes deshabilitados con estilo visual atenuado cuando el rol activo es `FISCAL`.
  - [x] Botones condicionales: *"Marcar tareas y Solicitar Validación"* para Investigador vs *"Aprobar Ruta y Avanzar Caso"* para Fiscal.
  - [x] Mensaje temporal de retroalimentación (5 segundos) al ejecutar acciones.
  - [x] El cliente compila sin errores en TypeScript (`npm --prefix client run build`).

---

### ETAPA 6: Módulo de Coincidencias Criminológicas (Matching)

#### Tarea 6.1: Backend — Servicio y Detección Automática de Coincidencias
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar la lógica de negocio para comparar la cédula del sospechoso con otros casos al registrar una denuncia criminal, registrando correlaciones con score del 98% en `CaseCoincidence` y excluyendo el caso actual.
* **Archivos Involucrados:**
  - `server/src/modules/coincidences/coincidence.service.ts`
  - `server/src/modules/coincidences/coincidence.controller.ts`
  - `server/src/modules/coincidences/coincidence.routes.ts`
  - `server/src/modules/cases/case.service.ts`
  - `server/src/app.ts`
* **Checklist:**
  - [x] Se implementó `coincidence.service.ts` con método `findAndRecordMatches(caseId, suspectDocId)`.
  - [x] Búsqueda indexada que excluye explícitamente el caso fuente (`id: { not: caseId }`).
  - [x] Invocación automática de detección de coincidencias dentro de `CaseService.registerCrimeReport`.
  - [x] Endpoint `GET /api/coincidences/case/:caseNumber` para consultar antecedentes cruzados.
  - [x] Se montaron las rutas en `server/src/app.ts`.
  - [x] Compilación exitosa en TypeScript en backend (`npm --prefix server run build`).
  - [x] Verificación de coincidencia generada y recuperada con éxito (Caso `2026-04823` con `2026-01149`).

---

#### Tarea 6.2: Frontend — Bloque 3: Banner de Coincidencia Criminológica
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Desarrollar el componente `CoincidenceBox` en el frontend e integrarlo en `CaseDetailView`, mostrando la alerta naranja destacada con tag `MATCH POSITIVO 98%` y los datos del caso histórico relacionado.
* **Archivos Involucrados:**
  - `client/src/features/coincidences/types/coincidence.types.ts`
  - `client/src/features/coincidences/services/coincidence.service.ts`
  - `client/src/features/coincidences/components/CoincidenceBox.tsx`
  - `client/src/features/cases/components/CaseDetailView.tsx`
* **Checklist:**
  - [x] Se crearon tipos TypeScript para coincidencias (`CaseCoincidenceItem`).
  - [x] Se implementó `coincidence.service.ts` consumiendo `GET /api/coincidences/case/:caseNumber`.
  - [x] Se implementó `CoincidenceBox.tsx` replicando con exactitud el Bloque 3 del prototipo HTML.
  - [x] Se integró `CoincidenceBox` en `CaseDetailView` de forma condicional (solo visible si existen matches).
  - [x] El cliente compila sin errores en TypeScript (`npm --prefix client run build`).

---

### ETAPA 7: Dashboards Especializados por Rol

#### Tarea 7.1: Backend — Métricas y Consultas Especializadas de Dashboard
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar los endpoints agregados para alimentar el dashboard de Investigador (casos asignados, lista de tareas urgentes pendientes) y el de Fiscal (métricas de 12 activos, 3 pendientes de validación, 28 resueltos, alerta global de coincidencia y tabla de casos del despacho).
* **Archivos Involucrados:**
  - `server/src/modules/dashboard/dashboard.service.ts`
  - `server/src/modules/dashboard/dashboard.controller.ts`
  - `server/src/modules/dashboard/dashboard.routes.ts`
  - `server/src/app.ts`
* **Checklist:**
  - [x] Se implementó `dashboard.service.ts` con consultas optimizadas de agregación en Prisma SQLite.
  - [x] Endpoint `GET /api/dashboard/investigator` retorna `assignedCases` y lista de `pendingTasks`.
  - [x] Endpoint `GET /api/dashboard/fiscal` retorna `metrics` (activos, pendientes, resueltos), `activeCoincidenceAlert` y `prosecutorCases`.
  - [x] Se implementaron controladores y rutas protegidas con autenticación.
  - [x] Se montaron las rutas en `server/src/app.ts`.
  - [x] Compilación exitosa en TypeScript en backend (`npm --prefix server run build`).
  - [x] Verificación de respuestas JSON de ambos dashboards comprobada exitosamente.

---

#### Tarea 7.2: Frontend — Vistas de Dashboard para Investigador y Fiscal
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Implementar las vistas completas `InvestigatorDashboard` y `FiscalDashboard` en React, consumiendo la API y replicando con fidelidad pixel-perfect las secciones `#view-dashboard-investigador` y `#view-dashboard-fiscal` del prototipo HTML.
* **Archivos Involucrados:**
  - `client/src/features/dashboard/services/dashboard.service.ts`
  - `client/src/features/dashboard/components/InvestigatorDashboard.tsx`
  - `client/src/features/dashboard/components/FiscalDashboard.tsx`
  - `client/src/features/dashboard/pages/DashboardPage.tsx`
  - `client/src/app/router/AppRouter.tsx`
* **Checklist:**
  - [x] Se implementó `dashboard.service.ts` consumiendo `/dashboard/investigator` y `/dashboard/fiscal`.
  - [x] Se creó `InvestigatorDashboard.tsx` con acción primaria de registro, tabla de casos en campo y tarjeta lateral con tareas urgentes.
  - [x] Se creó `FiscalDashboard.tsx` con las 3 tarjetas métricas gigantes, banner naranja de coincidencia y tabla con badges de `MATCH`.
  - [x] Se integró `DashboardPage.tsx` que alterna de forma fluida la vista al conmutar el rol en el header.
  - [x] El cliente compila sin errores en TypeScript (`npm --prefix client run build`).

---

### ETAPA 8: Integración, Auditoría y Pruebas Finales

#### Tarea 8.1: Registro de Auditoría y Trazabilidad Procesal
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Asegurar que cada actuación relevante (creación de caso, conmutación de diligencias, envío a revisión, firma fiscal) quede debidamente registrada en la tabla `CaseAuditLog` y habilitar endpoint de consulta de historial.
* **Archivos Involucrados:**
  - `server/src/modules/cases/case.routes.ts`
  - `server/src/modules/cases/case.controller.ts`
  - `server/src/modules/cases/case.service.ts`
* **Checklist:**
  - [x] Se implementó consulta de historial de auditoría `GET /api/cases/:caseNumber/audit`.
  - [x] Las acciones críticas (`CREACION`, `MARCADO_TAREA`, `SOLICITUD_VALIDACION`, `APROBACION_FISCAL`) contienen autor, fecha y detalle JSON.
  - [x] Backend compila sin errores en TypeScript (`npm --prefix server run build`).
  - [x] Verificación de 3 registros reales de auditoría recuperados para el caso `2026-04823`.

---

#### Tarea 8.2: Verificación Integral End-to-End, Scripts Concurrencia y Cierre
* **Estado:** `[COMPLETADA]`
* **Objetivo:** Configurar el script de ejecución concurrente raíz (`package.json`), verificar la compilación limpia de frontend y backend, comprobar la integridad del flujo pericial completo y generar documentación final de uso del MVP.
* **Archivos Involucrados:**
  - `package.json`
  - `client/dist/`
  - `server/dist/`
  - `docs/PLAN_DESARROLLO.md`
  - `README.md`
* **Checklist:**
  - [x] Se creó el `package.json` en la raíz con scripts convenientes (`npm run dev:server`, `npm run dev:client`, `npm run build`, `npm run seed`).
  - [x] Compilación final exitosa de `server` sin errores de tipos (`npm run build:server`).
  - [x] Compilación final exitosa de `client` sin errores de tipos (`npm run build:client`).
  - [x] Se documentó en `README.md` la arquitectura, credenciales institucionales de prueba y comandos de ejecución.

---

*(Las etapas 2 a 8 se detallarán a medida que avancemos, manteniendo la rigurosidad de un único frente de trabajo a la vez).*
