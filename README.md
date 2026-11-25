# Alfred SIC — Sistema Automatizado de Investigación Criminalística (MVP)

Aplicación web institucional orientada al apoyo operativo y la coordinación procesal entre investigadores de policía judicial y fiscales del Ministerio Público.

---

## 1. Arquitectura y Tecnologías

### Frontend (`/client`)
- **Framework:** React 19 + TypeScript + Vite.
- **Estilos:** Tailwind CSS con la paleta de identidad visual institucional *Total Blue* del prototipo:
  - Títulos/Textos: `#120B8F`
  - Primario/Acciones: `#5087F7`
  - Acentos/Secundario: `#8BCFF1`
  - Bordes planos: `#BDC7D7`
  - Alertas de coincidencia (Match): `#FEF3C7` / `#F59E0B`
- **Formularios & Validación:** React Hook Form + Zod.
- **Navegación:** React Router DOM v7 con rutas protegidas (`ProtectedRoute`) y control de acceso por roles (RBAC).
- **HTTP:** Axios con interceptores de autenticación JWT y normalización de errores.

### Backend (`/server`)
- **Runtime & Servidor:** Node.js + Express + TypeScript.
- **Base de Datos:** SQLite local con Prisma ORM (`dev.db`).
- **Arquitectura:** Por capas estricta (`Routes` $\rightarrow$ `Controllers` $\rightarrow$ `Services` $\rightarrow$ `Repositories` $\rightarrow$ `Prisma/SQLite`).
- **Seguridad:** Encriptación de contraseñas con `bcrypt` y tokens firmados con `jsonwebtoken`.
- **Manejo de Errores:** Clase `ApiError`, middleware centralizado y validación de esquemas Zod en `req.body`, `req.params` y `req.query`.

---

## 2. Credenciales y Usuarios de Prueba (Seed)

| Rol | Nombre | Correo Institucional | Contraseña | Unidad / Despacho | Placa / Código |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **INVESTIGADOR** | Insp. Carlos Mendoza | `carlos.mendoza@policia.gob` | `alfred2026` | División de Investigaciones de Robos y Homicidios | `IP-88412` |
| **FISCAL** | Dra. Elena Restrepo | `elena.restrepo@fiscalia.gob` | `alfred2026` | Fiscalía de Focos Delictivos N° 3 | `DF-0492` |

> [!NOTE]
> En la barra superior de la aplicación (Header), se incluye el selector rápido de roles que permite alternar la sesión activa entre Investigador y Fiscal de forma inmediata para probar los flujos cruzados del MVP.

---

## 3. Instrucciones de Ejecución

### Requisitos Previos
- Node.js (v18 o superior).
- npm.

### Comandos Principales (desde la raíz del proyecto)

1. **Re-sembrar la base de datos con datos de prueba:**
   ```bash
   npm run seed
   ```

2. **Compilar todo el proyecto (Backend + Frontend):**
   ```bash
   npm run build
   ```

3. **Iniciar el Backend en desarrollo (Puerto 4000):**
   ```bash
   npm run dev:server
   ```

4. **Iniciar el Frontend en desarrollo (Puerto 3000):**
   ```bash
   npm run dev:client
   ```

---

## 4. Flujo Procesal Implementado

1. **Investigador:** Inicia en su Dashboard, hace clic en **"+ Registrar Nueva Denuncia"**, completa el formulario con delito, fecha, hora, lugar y cédula del sospechoso.
2. **Motor de Reglas:** Genera automáticamente el número de expediente (`2026-XXXXX`), la **Ruta Investigativa** y sus diligencias periciales ordenadas según el delito.
3. **Módulo de Coincidencias:** Si la cédula coincide con un caso previo registrado (como `18.940.231-K`), dispara el banner de **"MATCH POSITIVO 98%"** vinculándolo con el Caso antecedente `N° 2026-01149`.
4. **Ejecución de Campo:** El investigador marca las diligencias completadas en el checklist y presiona **"Marcar tareas y Solicitar Validación"** (estado pasa a `Validación Pendiente`).
5. **Control Fiscal:** Al cambiar al rol de **Fiscal**, el checklist pasa a modo solo lectura y se habilita el botón de acción formal **"Aprobar Ruta y Avanzar Caso"** (estado final `Aprobado / Elevado`).
6. **Auditoría:** Cada actuación se registra de forma inmutable en `CaseAuditLog`.
