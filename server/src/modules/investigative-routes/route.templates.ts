export interface TaskTemplate {
  orderIndex: number;
  title: string;
  description: string;
  legalBasis: string;
}

export const ROUTE_TEMPLATES: Record<string, TaskTemplate[]> = {
  'Hurto Calificado': [
    {
      orderIndex: 1,
      title: '1. Inspección del lugar de los hechos y fijación fotográfica',
      description: 'Fijación de puntos de acceso, huellas de fractura, dactiloscopia y fijación fotográfica forense.',
      legalBasis: 'Art. 213 CPP (Ley 906) - Inspección del lugar de los hechos',
    },
    {
      orderIndex: 2,
      title: '2. Recolectar y asegurar cámaras de seguridad perimétricas',
      description: 'Recolección de videograbaciones y circuitos cerrados en radio perimétrico bajo cadena de custodia.',
      legalBasis: 'Art. 254 CPP (Ley 906) - Cadena de custodia y recolección de EMP',
    },
    {
      orderIndex: 3,
      title: '3. Solicitar antecedentes judiciales y anotaciones SPOA del implicado',
      description: 'Verificación de órdenes de captura vigentes y registro de anotaciones delictivas.',
      legalBasis: 'Art. 205 CPP (Ley 906) - Actividad de policía judicial',
    },
    {
      orderIndex: 4,
      title: '4. Toma de entrevistas a cajero principal, guardia y testigos presenciales',
      description: 'Entrevista técnica sobre modus operandi y rasgos fisonómicos de los asaltantes.',
      legalBasis: 'Art. 206 CPP (Ley 906) - Entrevista forense de testigos',
    },
    {
      orderIndex: 5,
      title: '5. Peritaje balístico y dactiloscópico de evidencias halladas',
      description: 'Remisión de muestras al Laboratorio de Criminalística (DIJIN / CTI / Medicina Legal).',
      legalBasis: 'Art. 257 CPP (Ley 906) - Examen pericial y análisis de elementos materiales probatorios',
    },
  ],
  'Homicidio': [
    {
      orderIndex: 1,
      title: '1. Inspección técnica a cadáver e inspección del lugar de los hechos',
      description: 'Preservación de la escena, fijación métrica de indicios biológicos y examen externo del cuerpo.',
      legalBasis: 'Art. 214 CPP (Ley 906) - Inspección técnica a cadáver',
    },
    {
      orderIndex: 2,
      title: '2. Determinación de causa de muerte y necropsia médico-legal',
      description: 'Remisión prioritaria al Instituto Nacional de Medicina Legal y Ciencias Forenses.',
      legalBasis: 'Art. 214 y 251 CPP (Ley 906) - Necropsia médico-legal',
    },
    {
      orderIndex: 3,
      title: '3. Análisis de comunicaciones y geolocalización de antenas BTS',
      description: 'Trazabilidad de llamadas del occiso y sospechosos en la hora del hecho bajo control de garantías.',
      legalBasis: 'Art. 235 CPP (Ley 906) - Interceptación y análisis de comunicaciones',
    },
    {
      orderIndex: 4,
      title: '4. Toma de entrevistas a testigos vecinales empadronados',
      description: 'Entrevistas de campo y labores de vecindario para identificar posibles rutas de escape y vehículos.',
      legalBasis: 'Art. 206 CPP (Ley 906) - Entrevistas en actos urgentes',
    },
  ],
  'Extorsión': [
    {
      orderIndex: 1,
      title: '1. Extracción forense de audios, chats y mensajes extorsivos',
      description: 'Cadena de custodia de dispositivos de la víctima y extracción pericial mediante software forense.',
      legalBasis: 'Art. 236 CPP (Ley 906) - Recuperación de información digital',
    },
    {
      orderIndex: 2,
      title: '2. Identificación de cuentas bancarias receptoras y trazabilidad financiera',
      description: 'Requerimiento prioritario ante entidades financieras y la UIAF para congelamiento de giros.',
      legalBasis: 'Art. 249 CPP (Ley 906) - Búsqueda selectiva en bases de datos',
    },
    {
      orderIndex: 3,
      title: '3. Vigilancia técnica, asesoramiento y entrega controlada GAULA',
      description: 'Coordinación táctica con unidades antiextorsión para procedimiento de captura en flagrancia.',
      legalBasis: 'Art. 243 CPP (Ley 906) - Entrega vigilada y operaciones antiextorsión',
    },
  ],
  'Tráfico, Fabricación o Porte de Estupefacientes': [
    {
      orderIndex: 1,
      title: '1. Prueba Preliminar Homologada (PIPH) y pesaje de la sustancia',
      description: 'Comprobación química de orientación preliminar (narcotest) y embalaje de seguridad.',
      legalBasis: 'Ley 30 de 1986 / Art. 376 Código Penal - Protocolo pericial PIPH',
    },
    {
      orderIndex: 2,
      title: '2. Remisión de muestra al laboratorio forense de estupefacientes',
      description: 'Determinación pericial concluyente de pureza, concentración y peso neto de la sustancia incautada.',
      legalBasis: 'Art. 257 CPP (Ley 906) - Dictamen pericial toxicológico',
    },
    {
      orderIndex: 3,
      title: '3. Incautación de elementos de dosificación, pesaje y dinero en efectivo',
      description: 'Acreditación del destino de distribución, venta al menudeo o transporte de la sustancia.',
      legalBasis: 'Art. 82 y 254 CPP (Ley 906) - Comiso y cadena de custodia',
    },
  ],
  'Fraude Digital': [
    {
      orderIndex: 1,
      title: '1. Preservación de logs de acceso IP, transacciones y cabeceras informáticas',
      description: 'Oficios a proveedores de servicios de internet (ISP), pasarelas de pago y servidores remotos.',
      legalBasis: 'Ley 1273 de 2009 - Protección de la información y los datos',
    },
    {
      orderIndex: 2,
      title: '2. Congelamiento cautelar de productos financieros y billeteras digitales',
      description: 'Solicitud ante juzgados de control de garantías para medidas cautelares sobre bienes y fondos.',
      legalBasis: 'Art. 92 CPP (Ley 906) - Medidas cautelares sobre recursos',
    },
    {
      orderIndex: 3,
      title: '3. Peritaje informático a plataformas de phishing y malware',
      description: 'Clonación forense de infraestructura maliciosa y determinación del vector de intrusión.',
      legalBasis: 'Art. 257 CPP (Ley 906) - Peritaje informático forense',
    },
  ],
};

export function getTemplateForCrime(crimeType: string): TaskTemplate[] {
  if (crimeType === 'Robo Calificado' || crimeType === 'Hurto Calificado') {
    return ROUTE_TEMPLATES['Hurto Calificado'];
  }
  if (crimeType === 'Tráfico Ilícito' || crimeType === 'Tráfico, Fabricación o Porte de Estupefacientes') {
    return ROUTE_TEMPLATES['Tráfico, Fabricación o Porte de Estupefacientes'];
  }
  return ROUTE_TEMPLATES[crimeType] || ROUTE_TEMPLATES['Hurto Calificado'];
}
