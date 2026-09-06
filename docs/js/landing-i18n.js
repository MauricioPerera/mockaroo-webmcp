// Internationalization and Interactive Logic for Mockaroo Static WebMCP Landing Page

const TRANSLATIONS = {
  es: {
    nav: {
      whatIs: "¿Qué es?",
      tools: "Herramientas",
      advantages: "Ventajas",
      howTo: "Guía",
      useCases: "Casos de Uso",
      faq: "FAQ",
      openGenerator: "Abrir Generador",
    },
    hero: {
      pill: "Generador de Datos Sintéticos • 100% In-Browser",
      title: "Datos realistas para tus pruebas, prototipos y agentes de IA. <br class=\"desktop-only\" /><span class=\"gradient-text\">Sin servidores ni límites de pago.</span>",
      subtitle: "Impulsado por Faker.js y FastWebMCP. Genera hasta 10.000 registros en CSV, JSON, SQL y Excel directamente en tu navegador. Sin enviar información sensible a la nube y con 6 herramientas nativas WebMCP para que los Agentes de IA creen fixtures al instante.",
      ctaGenTitle: "Abrir Mockaroo WebMCP",
      ctaGenDesc: "Diseñador de esquemas, fórmulas JS y exportación multiformato",
      ctaSqliteTitle: "WebMCP SQLite Studio",
      ctaSqliteDesc: "Base de datos relacional WASM en memoria",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "IDE web completo con VFS y terminal Unix",
      capZeroInstall: "<strong>0 Instalación:</strong> Abre el navegador y genera datos en 1 segundo",
      capPrivate: "<strong>100% Privado:</strong> Tus esquemas y registros nunca salen de tu máquina",
      capZeroCost: "<strong>$0 Costo:</strong> Sin límites de 200 filas gratis ni planes de suscripción",
      capSpeed: "<strong>Ultra Rápido:</strong> 10.000 filas generadas en memoria en <100 ms",
    },
    showcase: {
      windowTitle: "mockaroo-static-engine -- In-Memory Faker Runtime",
      wasmBadge: "⚡ Faker.js Client • 0.28 ms • 4 registros",
      tmplUsers: "👤 Usuarios",
      tmplOrders: "📦 Órdenes",
      tmplTx: "💳 Transacciones",
      btnRegen: "🔄 Regenerar Muestra",
      metaExecution: "Generación en cliente sin peticiones de red • Latencia: 0.28 ms",
    },
    paradigm: {
      tag: "EL CAMBIO DE PARADIGMA",
      title: "¿Por qué generar datos sintéticos en el navegador cambia las reglas?",
      subtitle: "Los generadores de datos tradicionales en la nube limitan severamente las cuentas gratuitas, requieren crear cuentas y exponen tus esquemas a servidores remotos.",
      oldBadge: "El Enfoque Tradicional en la Nube",
      oldTitle: "Antes: Límites Estrictos, Costos y Riesgo de Datos",
      oldItem1: "❌ <strong>Límites mezquinos:</strong> La versión gratuita de Mockaroo.com corta las descargas a solo 200 o 1.000 registros por día.",
      oldItem2: "❌ <strong>Suscripciones costosas:</strong> Planes mensuales de $50 a más de $500/año para proyectos de pruebas continuas.",
      oldItem3: "❌ <strong>Pérdida de privacidad:</strong> Nombres de columnas, estructuras de esquemas y lógica de negocio se envían a servidores de terceros.",
      oldItem4: "❌ <strong>Aislamiento de la IA:</strong> Los modelos de lenguaje no pueden interactuar directamente con la interfaz para generar datos.",
      newBadge: "La Revolución WebMCP (Local-First)",
      newTitle: "Ahora: Generación Ilimitada, 100% Local y con IA",
      newItem1: "✅ <strong>10.000 registros por clic:</strong> Genera volúmenes masivos de datos sintéticos sin topes artificiales ni bloqueos diarios.",
      newItem2: "✅ <strong>100% Gratuito y Open Source ($0):</strong> Corre enteramente sobre el hardware de tu dispositivo; sin costos de infraestructura.",
      newItem3: "✅ <strong>Soberanía total:</strong> Tus datos se calculan en la memoria RAM del navegador y nunca salen de tu computadora.",
      newItem4: "✅ <strong>6 Herramientas WebMCP para Agentes:</strong> Claude, ChatGPT y agentes autónomos manipulan esquemas y generan datasets en vivo.",
    },
    toolsSection: {
      tag: "ESTÁNDAR W3C WEBMCP",
      title: "6 Herramientas Nativas para Agentes de Inteligencia Artificial",
      subtitle: "A través de window.modelContext y FastWebMCP, los modelos de lenguaje pueden diseñar esquemas y producir fixtures de prueba de forma completamente autónoma.",
      tool1Name: "get_data_types",
      tool1Desc: "Catálogo completo de 69 tipos de generadores (Personas, Ubicación, Finanzas, Internet, Fechas, Números y Lógica).",
      tool2Name: "list_schemas",
      tool2Desc: "Inspecciona los presets predefinidos (users, ecommerce, transactions, employees, telemetry) y esquemas guardados.",
      tool3Name: "generate_data",
      tool3Desc: "Herramienta principal de producción: devuelve datasets sintéticos estructurados en JSON o CSV en memoria.",
      tool4Name: "load_schema_in_ui",
      tool4Desc: "Carga y visualiza una plantilla directamente en la tabla interactiva de la interfaz para revisión humana.",
      tool5Name: "add_field_to_ui",
      tool5Desc: "Añade dinámicamente columnas, configuraciones de nulos (% blanks) y fórmulas JavaScript a la UI activa.",
      tool6Name: "preview_mock_data",
      tool6Desc: "Dispara la ventana modal de previsualización con 10 registros de muestra para verificación visual.",
    },
    comparison: {
      tag: "TABLA COMPARATIVA",
      title: "Mockaroo WebMCP frente a las Alternativas",
      subtitle: "Compara objetivamente las capacidades de generación local frente a servicios en la nube, scripts manuales y hojas de cálculo.",
      colFeature: "Característica",
      colWebmcp: "Mockaroo WebMCP",
      colCloud: "Mockaroo Cloud",
      colFaker: "Faker.js / Scripts",
      colExcel: "Excel / Hojas de Cálculo",
      rowRows: "Límite de Registros",
      rowRowsWebmcp: "Hasta 10.000 por clic (Sin límite)",
      rowRowsCloud: "200 filas/día (Gratis)",
      rowRowsFaker: "Limitado por tu script",
      rowRowsExcel: "Manual y propenso a fatiga",
      rowCost: "Costo Mensual",
      rowCostWebmcp: "$0 (Open Source)",
      rowCostCloud: "$50 a $500/año",
      rowCostFaker: "$0 (pero alto tiempo dev)",
      rowCostExcel: "Licencia Office / Workspace",
      rowPrivacy: "Privacidad de Datos",
      rowPrivacyWebmcp: "100% In-Browser (RAM Local)",
      rowPrivacyCloud: "Se envía a servidores remotos",
      rowPrivacyFaker: "Local",
      rowPrivacyExcel: "Local o Nube cerrada",
      rowAgent: "Integración Agentes IA",
      rowAgentWebmcp: "Nativa WebMCP (6 Tools)",
      rowAgentCloud: "Ninguna",
      rowAgentFaker: "Requiere crear wrappers",
      rowAgentExcel: "Ninguna",
      rowFormats: "Formatos de Exportación",
      rowFormatsWebmcp: "CSV, JSON, SQL, Excel (.xlsx)",
      rowFormatsCloud: "CSV, JSON, SQL, Excel",
      rowFormatsFaker: "Requiere dependencias extra",
      rowFormatsExcel: "Solo XLS / CSV",
      rowFormula: "Fórmulas Dinámicas",
      rowFormulaWebmcp: "JavaScript puro en cliente",
      rowFormulaCloud: "Sandbox Ruby en servidor",
      rowFormulaFaker: "Programación en código",
      rowFormulaExcel: "Fórmulas Excel estándar",
    },
    roles: {
      tag: "ADAPTADO A TU TRABAJO",
      title: "¿Quién se beneficia de la Generación Sintética Local?",
      subtitle: "Desde control de calidad y ciencia de datos hasta desarrollo ágil y formación técnica.",
      tabQa: "🧪 QA & Testers",
      tabData: "📊 Data Science & ML",
      tabDev: "💻 Desarrolladores",
      tabEdu: "🎓 Docentes y Estudiantes",
      qaTitle: "Ingenieros de Calidad y Especialistas en Testing",
      qaQuote: "«Puedo generar 5.000 registros con un 15% de valores nulos y formatos extremos para probar la resiliencia de formularios en segundos.»",
      qaP1: "Configuración granular de porcentajes de campos vacíos (blanks %) para validar validadores de frontend.",
      qaP2: "Exportación directa en formato Excel (.xlsx) y CSV con codificación UTF-8 para cargar en suites de testing.",
      qaP3: "Simulación de nombres exóticos, correos alfanuméricos y números de tarjeta para pruebas de penetración y carga.",
      qaBenefitLabel: "Ahorro de Tiempo",
      qaBenefitValue: "De 2 horas creando datos manuales a 3 clics en el navegador",
      dataTitle: "Científicos de Datos y Analistas de Negocio",
      dataQuote: "«Creo datasets realistas con la estructura exacta de clientes sin infringir normativas de privacidad como GDPR o HIPAA.»",
      dataP1: "Generación de datos sin riesgo alguno de exposición de PII (Personally Identifiable Information).",
      dataP2: "Integración directa con WebMCP SQLite Studio para probar modelos relacionales y queries complejas al instante.",
      dataP3: "Creación de series temporales con rangos de fechas personalizables y transacciones con importes realistas.",
      dataBenefitLabel: "Cumplimiento y Privacidad",
      dataBenefitValue: "Cero riesgo regulatorio: 100% de datos sintéticos artificiales",
      devTitle: "Desarrolladores Web, Mobile y de Agentes IA",
      devQuote: "«Tengo un generador que mi agente de IA puede invocar mediante WebMCP para llenar mi base de datos de desarrollo sin backend.»",
      devP1: "6 herramientas W3C WebMCP para que Claude, ChatGPT o Cursor creen esquemas y fixtures automáticamente.",
      devP2: "Exportación en dialectos SQL reales (PostgreSQL, MySQL, SQLite) con sentencias INSERT en lotes.",
      devP3: "Fórmulas JavaScript personalizadas para concatenar nombres, generar slugs o calcular importes condicionales.",
      devBenefitLabel: "Velocidad de Iteración",
      devBenefitValue: "Semillas de base de datos listas en segundos para cualquier stack",
      eduTitle: "Profesores, Academias y Estudiantes",
      eduQuote: "«Toda la clase practica análisis de datos, SQL y programación sin pedir cuentas ni tarjetas de crédito.»",
      eduP1: "Funciona en cualquier computadora o Chromebook sin instalar librerías de Node.js ni Python.",
      eduP2: "Plantillas predefinidas (Users, E-Commerce, Transactions) para arrancar lecciones inmediatamente.",
      eduP3: "Permite a los alumnos entender la diferencia entre tipos de datos relacionales y esquemas no estructurados.",
      eduBenefitLabel: "Barrera de Entrada",
      eduBenefitValue: "0 fricción: abre la URL y comienza la clase",
    },
    faq: {
      tag: "RESOLVEMOS TUS DUDAS",
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre la tecnología, privacidad y capacidades de Mockaroo Static WebMCP.",
      q1: "¿En qué se diferencia de la versión original de Mockaroo.com?",
      a1: "Mockaroo.com original corre sobre servidores remotos y limita severamente las cuentas gratuitas a 200 registros por día, requiriendo planes de pago de hasta $500/año para más volumen. <strong>Mockaroo Static corre 100% en tu navegador</strong> vía Faker.js: es ilimitado, 100% gratuito ($0), no requiere registro y ofrece integración nativa con Agentes de IA vía WebMCP.",
      q2: "¿Mis datos o esquemas se envían a algún servidor externo?",
      a2: "<strong>Absolutamente no.</strong> Toda la generación ocurre en la memoria RAM de tu computadora utilizando el motor JavaScript del navegador. Ninguna fila, columna o esquema generado viaja por internet.",
      q3: "¿Qué formatos de descarga están disponibles?",
      a3: "Puedes exportar en <strong>CSV</strong> (con delimitadores configurables), <strong>JSON</strong> (indentado o compacto), <strong>SQL</strong> (con sentencias INSERT INTO parametrizadas por tabla) y <strong>Excel (.xlsx)</strong> nativo generado directamente con SheetJS.",
      q4: "¿Cómo interactúa un Agente de IA con esta herramienta?",
      a4: "Mockaroo Static registra 6 herramientas en <code>window.modelContext</code> / <code>document.modelContext</code> conforme al estándar W3C WebMCP. Los agentes de IA pueden consultar tipos de datos disponibles, cargar esquemas, añadir campos y generar arrays de datos sin necesidad de intervención humana.",
      q5: "¿Cómo se complementa con SQLite Studio y Code Studio?",
      a5: "Forman una <strong>Trilogía WebMCP integral</strong>: puedes diseñar y generar datos sintéticos en Mockaroo, importarlos a <strong>WebMCP SQLite Studio</strong> con un clic para analizarlos con SQL relacional en memoria, y construir aplicaciones interactivas en <strong>WebMCP Code Studio</strong> con su VFS y terminal Unix.",
    },
    bottomCta: {
      title: "¿Listo para generar datos de prueba sin límites?",
      subtitle: "Crea esquemas completos, añade fórmulas personalizadas y descarga miles de registros en segundos. 100% gratis y privado.",
      btnGen: "Abrir Mockaroo WebMCP Ahora",
      btnSqlite: "Explorar SQLite Studio",
      btnCodeStudio: "Explorar Code Studio",
    },
    footer: {
      text: "Mockaroo Static WebMCP es un generador de datos sintéticos 100% local-first desarrollado bajo la metodología Knowledge-Driven Development (KDD) y el estándar W3C WebMCP.",
      copy: "© 2026 WebMCP Suite • Código Abierto bajo Licencia MIT • Privacidad y Soberanía Total de Datos.",
      trilogyTitle: "La Trilogía WebMCP",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      trilogySqlite: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      resourcesTitle: "Recursos y Especificaciones",
      resFaker: "Faker.js Core",
      resW3c: "W3C WebMCP Draft",
      resLlms: "Especificación llms.txt",
      resGithub: "Repositorio en GitHub",
    }
  },
  en: {
    nav: {
      whatIs: "Overview",
      tools: "Tools",
      advantages: "Advantages",
      howTo: "Guide",
      useCases: "Use Cases",
      faq: "FAQ",
      openGenerator: "Open Generator",
    },
    hero: {
      pill: "Synthetic Data Generator • 100% In-Browser",
      title: "Realistic data for your tests, prototypes, and AI agents. <br class=\"desktop-only\" /><span class=\"gradient-text\">No servers, no paywalls.</span>",
      subtitle: "Powered by Faker.js and FastWebMCP. Generate up to 10,000 records in CSV, JSON, SQL, and Excel directly in your browser. Zero cloud uploads, zero privacy leaks, and 6 native WebMCP tools for instant AI Agent fixtures.",
      ctaGenTitle: "Open Mockaroo WebMCP",
      ctaGenDesc: "Visual schema designer, JS formulas, and multi-format exports",
      ctaSqliteTitle: "WebMCP SQLite Studio",
      ctaSqliteDesc: "In-memory WASM relational database",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "Complete web IDE with VFS and Unix terminal",
      capZeroInstall: "<strong>0 Install:</strong> Open your browser and generate data in 1 second",
      capPrivate: "<strong>100% Private:</strong> Your schemas and records never leave your machine",
      capZeroCost: "<strong>$0 Cost:</strong> No 200-row free caps, no monthly recurring subscriptions",
      capSpeed: "<strong>Ultra Fast:</strong> 10,000 records generated in-memory in <100 ms",
    },
    showcase: {
      windowTitle: "mockaroo-static-engine -- In-Memory Faker Runtime",
      wasmBadge: "⚡ Faker.js Client • 0.28 ms • 4 records",
      tmplUsers: "👤 Users",
      tmplOrders: "📦 Orders",
      tmplTx: "💳 Transactions",
      btnRegen: "🔄 Regenerate Sample",
      metaExecution: "Client-side generation with zero network latency • Execution: 0.28 ms",
    },
    paradigm: {
      tag: "THE PARADIGM SHIFT",
      title: "Why In-Browser Synthetic Data Generation Changes Everything",
      subtitle: "Traditional cloud generators enforce punitive limits on free tiers, require account logins, and transmit sensitive schemas across the internet.",
      oldBadge: "The Traditional Cloud Approach",
      oldTitle: "Before: Throttles, Paywalls, and Data Leaks",
      oldItem1: "❌ <strong>Strict quotas:</strong> The free tier of Mockaroo.com limits downloads to 200–1,000 rows per day.",
      oldItem2: "❌ <strong>Costly subscriptions:</strong> Monthly recurring fees from $50 to over $500/year for continuous testing.",
      oldItem3: "❌ <strong>Privacy hazards:</strong> Column names, table structures, and proprietary business logic get stored on remote servers.",
      oldItem4: "❌ <strong>AI Disconnection:</strong> Large language models cannot manipulate the interactive UI or produce fixtures on the fly.",
      newBadge: "The WebMCP Revolution (Local-First)",
      newTitle: "Now: Unlimited, 100% Private, AI-Ready",
      newItem1: "✅ <strong>10,000 records per click:</strong> Generate massive volumes of synthetic fixtures without arbitrary caps.",
      newItem2: "✅ <strong>100% Free and Open Source ($0):</strong> Runs entirely on client hardware with zero server overhead.",
      newItem3: "✅ <strong>Complete data sovereignty:</strong> Records compute in browser RAM and never exit your local device.",
      newItem4: "✅ <strong>6 Native WebMCP Tools:</strong> Claude, ChatGPT, and autonomous agents design schemas and generate records live.",
    },
    toolsSection: {
      tag: "W3C WEBMCP STANDARD",
      title: "6 Native Tools for AI Autonomous Agents",
      subtitle: "Through window.modelContext and FastWebMCP, language models can inspect generators, adapt schemas, and yield test fixtures programmatically.",
      tool1Name: "get_data_types",
      tool1Desc: "Comprehensive catalog of 69 generator types across Person, Location, Finance, Internet, Dates, Numbers, and Logic.",
      tool2Name: "list_schemas",
      tool2Desc: "Inspect built-in presets (users, ecommerce, transactions, employees, telemetry) and custom saved schemas.",
      tool3Name: "generate_data",
      tool3Desc: "Primary data production tool: returns structured mock datasets in JSON or CSV directly in memory.",
      tool4Name: "load_schema_in_ui",
      tool4Desc: "Loads and synchronizes a template directly into the interactive UI table for human inspection.",
      tool5Name: "add_field_to_ui",
      tool5Desc: "Dynamically appends columns, null ratios (% blanks), and JavaScript calculation formulas to the active schema.",
      tool6Name: "preview_mock_data",
      tool6Desc: "Triggers the visual 10-record preview modal dialog for immediate human verification.",
    },
    comparison: {
      tag: "FEATURE MATRIX",
      title: "Mockaroo WebMCP vs Traditional Alternatives",
      subtitle: "An objective comparison of client-side generation against cloud portals, custom code scripts, and spreadsheets.",
      colFeature: "Feature",
      colWebmcp: "Mockaroo WebMCP",
      colCloud: "Mockaroo Cloud",
      colFaker: "Faker.js / Scripts",
      colExcel: "Excel / Spreadsheets",
      rowRows: "Record Limits",
      rowRowsWebmcp: "Up to 10,000 per click (Unlimited)",
      rowRowsCloud: "200 rows/day (Free)",
      rowRowsFaker: "Limited by custom script",
      rowRowsExcel: "Manual, tedious copy-paste",
      rowCost: "Monthly Cost",
      rowCostWebmcp: "$0 (Open Source)",
      rowCostCloud: "$50 to $500/year",
      rowCostFaker: "$0 (high dev time)",
      rowCostExcel: "Office / Workspace license",
      rowPrivacy: "Data Privacy",
      rowPrivacyWebmcp: "100% In-Browser (Local RAM)",
      rowPrivacyCloud: "Uploaded to third-party cloud",
      rowPrivacyFaker: "Local",
      rowPrivacyExcel: "Local or proprietary cloud",
      rowAgent: "AI Agent Integration",
      rowAgentWebmcp: "Native WebMCP (6 Tools)",
      rowAgentCloud: "None",
      rowAgentFaker: "Requires custom wrappers",
      rowAgentExcel: "None",
      rowFormats: "Native Export Formats",
      rowFormatsWebmcp: "CSV, JSON, SQL, Excel (.xlsx)",
      rowFormatsCloud: "CSV, JSON, SQL, Excel",
      rowFormatsFaker: "Requires extra dependencies",
      rowFormatsExcel: "Only XLS / CSV",
      rowFormula: "Dynamic Formulas",
      rowFormulaWebmcp: "Pure JavaScript in browser",
      rowFormulaCloud: "Ruby sandbox on server",
      rowFormulaFaker: "Handwritten code",
      rowFormulaExcel: "Standard Excel formulas",
    },
    roles: {
      tag: "TAILORED FOR YOUR WORKFLOW",
      title: "Who Benefits from In-Browser Synthetic Data?",
      subtitle: "From QA automation and data science to rapid frontend prototyping and classroom teaching.",
      tabQa: "🧪 QA & Testers",
      tabData: "📊 Data Science & ML",
      tabDev: "💻 Developers",
      tabEdu: "🎓 Educators & Students",
      qaTitle: "Quality Assurance & Automation Engineers",
      qaQuote: "“I can generate 5,000 rows with 15% null values and extreme edge-case formats to stress-test form validators in seconds.”",
      qaP1: "Granular configuration of missing values (% blanks) to rigorously validate frontend edge cases.",
      qaP2: "Direct exports in native Excel (.xlsx) and UTF-8 CSV ready for automated ingestion pipelines.",
      qaP3: "Realistic international names, alphanumeric emails, and credit card numbers for penetration and load testing.",
      qaBenefitLabel: "Time Saved",
      qaBenefitValue: "From 2 hours of manual test fixtures to 3 clicks in the browser",
      dataTitle: "Data Scientists & Business Analysts",
      dataQuote: "“I build realistic mock datasets matching our production customer schemas without violating GDPR or HIPAA regulations.”",
      dataP1: "Zero risk of exposing Personally Identifiable Information (PII) during development and prototyping.",
      dataP2: "Direct synergy with WebMCP SQLite Studio to test relational schemas and analytical queries on client hardware.",
      dataP3: "Customizable date ranges and realistic monetary distributions for forecasting model benchmarks.",
      dataBenefitLabel: "Compliance & Safety",
      dataBenefitValue: "100% synthetic data: zero regulatory exposure",
      devTitle: "Frontend, Backend & AI Agent Creators",
      devQuote: "“My AI agent can autonomously invoke WebMCP to seed our development environment without setting up a backend server.”",
      devP1: "6 W3C WebMCP tools allowing Claude, ChatGPT, or Cursor to design schemas and seed databases automatically.",
      devP2: "Batched SQL INSERT dumps tailored for PostgreSQL, MySQL, and SQLite dialects.",
      devP3: "Custom JavaScript formulas to concatenate full names, slugify identifiers, or evaluate conditional values.",
      devBenefitLabel: "Iteration Speed",
      devBenefitValue: "Production-ready seeders created in seconds for any tech stack",
      eduTitle: "Professors, Bootcamps & Students",
      eduQuote: "“The whole classroom practices data analysis and SQL immediately without asking students for credit cards or accounts.”",
      eduP1: "Works seamlessly on any Chromebook, Mac, or PC without installing Node.js or Python packages.",
      eduP2: "Preconfigured presets (Users, E-Commerce, Transactions) to launch hands-on exercises right away.",
      eduP3: "Helps students understand structured relational schemas vs unstructured JSON datasets.",
      eduBenefitLabel: "Adoption Barrier",
      eduBenefitValue: "Zero friction: open the URL and begin teaching",
    },
    faq: {
      tag: "GOT QUESTIONS?",
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about the architecture, security, and AI capabilities of Mockaroo Static WebMCP.",
      q1: "How does this differ from the original Mockaroo.com?",
      a1: "The original Mockaroo.com runs on remote servers and caps free tier usage to 200 records per day, requiring paid plans up to $500/year for larger batches. <strong>Mockaroo Static runs 100% inside your browser</strong> via Faker.js: it is completely unlimited, $0 free and open-source, requires no account sign-up, and natively integrates with AI Agents via the W3C WebMCP standard.",
      q2: "Are my schemas or generated records uploaded to external servers?",
      a2: "<strong>Never.</strong> All computation occurs in client memory (RAM) using the browser's JavaScript engine. Not a single row or schema definition is transmitted over the internet.",
      q3: "Which export formats are supported?",
      a3: "You can export datasets in <strong>CSV</strong> (with custom delimiters and BOM support), <strong>JSON</strong> (pretty or compact), <strong>SQL</strong> (batched INSERT statements with customizable table names), and <strong>Excel (.xlsx)</strong> generated locally via SheetJS.",
      q4: "How do AI Agents interact with this tool?",
      a4: "Mockaroo Static registers 6 tools on <code>window.modelContext</code> / <code>document.modelContext</code> adhering to the W3C WebMCP standard. Agents can query available generator keys, load presets, append custom columns, and generate in-memory data structures without human clicking.",
      q5: "How does it synergize with SQLite Studio and Code Studio?",
      a5: "They form a complete <strong>Browser-Native WebMCP Trilogy</strong>: generate synthetic fixtures in Mockaroo, import them with 1-click into <strong>WebMCP SQLite Studio</strong> for relational SQL queries, and build full-stack web applications in <strong>WebMCP Code Studio</strong> with its in-browser Unix terminal.",
    },
    bottomCta: {
      title: "Ready to generate test data without limits?",
      subtitle: "Build schemas, apply custom JavaScript formulas, and download thousands of realistic records in seconds. 100% free and private.",
      btnGen: "Launch Mockaroo WebMCP Now",
      btnSqlite: "Explore SQLite Studio",
      btnCodeStudio: "Explore Code Studio",
    },
    footer: {
      text: "Mockaroo Static WebMCP is a 100% local-first synthetic test data workstation developed under Knowledge-Driven Development (KDD) and the W3C WebMCP standard.",
      copy: "© 2026 WebMCP Suite • Open Source under MIT License • Complete Data Privacy & Sovereignty.",
      trilogyTitle: "The WebMCP Trilogy",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      trilogySqlite: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      resourcesTitle: "Resources & Specifications",
      resFaker: "Faker.js Core",
      resW3c: "W3C WebMCP Draft",
      resLlms: "llms.txt Specification",
      resGithub: "GitHub Repository",
    }
  },
  pt: {
    nav: {
      whatIs: "O que é?",
      tools: "Ferramentas",
      advantages: "Vantagens",
      howTo: "Guia",
      useCases: "Casos de Uso",
      faq: "FAQ",
      openGenerator: "Abrir Gerador",
    },
    hero: {
      pill: "Gerador de Dados Sintéticos • 100% In-Browser",
      title: "Dados realistas para seus testes, protótipos e agentes de IA. <br class=\"desktop-only\" /><span class=\"gradient-text\">Sem servidores e sem limites pagos.</span>",
      subtitle: "Alimentado por Faker.js e FastWebMCP. Gere até 10.000 registros em CSV, JSON, SQL e Excel diretamente no seu navegador. Sem enviar dados para a nuvem e com 6 ferramentas nativas WebMCP para agentes de IA.",
      ctaGenTitle: "Abrir Mockaroo WebMCP",
      ctaGenDesc: "Designer de esquemas, fórmulas JS e exportação multiformato",
      ctaSqliteTitle: "WebMCP SQLite Studio",
      ctaSqliteDesc: "Banco de dados relacional WASM em memória",
      ctaCodeTitle: "WebMCP Code Studio",
      ctaCodeDesc: "IDE web completo com VFS e terminal Unix",
      capZeroInstall: "<strong>0 Instalação:</strong> Abra o navegador e gere dados em 1 segundo",
      capPrivate: "<strong>100% Privado:</strong> Seus esquemas e registros nunca saem da sua máquina",
      capZeroCost: "<strong>$0 Custo:</strong> Sem limites de 200 linhas grátis nem assinaturas mensais",
      capSpeed: "<strong>Ultra Rápido:</strong> 10.000 linhas geradas em memória em <100 ms",
    },
    showcase: {
      windowTitle: "mockaroo-static-engine -- In-Memory Faker Runtime",
      wasmBadge: "⚡ Faker.js Client • 0.28 ms • 4 registros",
      tmplUsers: "👤 Usuários",
      tmplOrders: "📦 Pedidos",
      tmplTx: "💳 Transações",
      btnRegen: "🔄 Regenerar Amostra",
      metaExecution: "Geração no cliente sem latência de rede • Tempo: 0.28 ms",
    },
    paradigm: {
      tag: "A MUDANÇA DE PARADIGMA",
      title: "Por que gerar dados sintéticos no navegador muda o jogo?",
      subtitle: "Os geradores tradicionais na nuvem impõem limites severos a contas gratuitas, exigem cadastros e expõem seus esquemas a servidores remotos.",
      oldBadge: "A Abordagem Tradicional na Nuvem",
      oldTitle: "Antes: Limitações, Cobranças e Riscos",
      oldItem1: "❌ <strong>Limites baixos:</strong> O plano gratuito do Mockaroo.com bloqueia downloads a apenas 200 ou 1.000 linhas por dia.",
      oldItem2: "❌ <strong>Assinaturas caras:</strong> Planos mensais de $50 a mais de $500/ano para testes contínuos.",
      oldItem3: "❌ <strong>Perda de privacidade:</strong> Nomes de colunas, tabelas e regras de negócio são enviados para servidores de terceiros.",
      oldItem4: "❌ <strong>Sem conexão com IA:</strong> Agentes de IA não conseguem interagir com a interface para produzir dados.",
      newBadge: "A Revolução WebMCP (Local-First)",
      newTitle: "Agora: Ilimitado, 100% Local e Pronto para IA",
      newItem1: "✅ <strong>10.000 registros por clique:</strong> Gere grandes volumes de dados sintéticos sem bloqueios diários.",
      newItem2: "✅ <strong>100% Gratuito e Código Aberto ($0):</strong> Executa totalmente no hardware do seu dispositivo; zero custo de servidor.",
      newItem3: "✅ <strong>Soberania total de dados:</strong> Seus registros são calculados na memória RAM do navegador e nunca saem do seu computador.",
      newItem4: "✅ <strong>6 Ferramentas WebMCP para Agentes:</strong> Claude, ChatGPT e agentes criam esquemas e datasets em tempo real.",
    },
    toolsSection: {
      tag: "PADRÃO W3C WEBMCP",
      title: "6 Ferramentas Nativas para Agentes de Inteligência Artificial",
      subtitle: "Através de window.modelContext e FastWebMCP, modelos de linguagem podem criar esquemas e fixtures de teste com total autonomia.",
      tool1Name: "get_data_types",
      tool1Desc: "Catálogo completo de 69 tipos de geradores (Pessoas, Localização, Finanças, Internet, Datas, Números e Lógica).",
      tool2Name: "list_schemas",
      tool2Desc: "Inspeciona presets pré-definidos (users, ecommerce, transactions, employees, telemetry) e esquemas salvos.",
      tool3Name: "generate_data",
      tool3Desc: "Ferramenta principal: retorna datasets sintéticos estruturados em JSON ou CSV diretamente na memória.",
      tool4Name: "load_schema_in_ui",
      tool4Desc: "Carrega e sincroniza um modelo diretamente na tabela interativa da interface para inspeção humana.",
      tool5Name: "add_field_to_ui",
      tool5Desc: "Adiciona dinamicamente colunas, percentuais de nulos (% blanks) e fórmulas JavaScript à interface ativa.",
      tool6Name: "preview_mock_data",
      tool6Desc: "Abre o modal de pré-visualização com 10 registros de amostra para confirmação visual do usuário.",
    },
    comparison: {
      tag: "TABELA COMPARATIVA",
      title: "Mockaroo WebMCP vs Alternativas Tradicionais",
      subtitle: "Uma comparação objetiva entre a geração local no navegador, plataformas em nuvem e planilhas.",
      colFeature: "Recurso",
      colWebmcp: "Mockaroo WebMCP",
      colCloud: "Mockaroo Cloud",
      colFaker: "Faker.js / Scripts",
      colExcel: "Excel / Planilhas",
      rowRows: "Limite de Registros",
      rowRowsWebmcp: "Até 10.000 por clique (Ilimitado)",
      rowRowsCloud: "200 linhas/dia (Grátis)",
      rowRowsFaker: "Limitado pelo script",
      rowRowsExcel: "Manual e cansativo",
      rowCost: "Custo Mensal",
      rowCostWebmcp: "$0 (Código Aberto)",
      rowCostCloud: "$50 a $500/ano",
      rowCostFaker: "$0 (alto tempo dev)",
      rowCostExcel: "Licença Office / Workspace",
      rowPrivacy: "Privacidade de Dados",
      rowPrivacyWebmcp: "100% no Navegador (RAM Local)",
      rowPrivacyCloud: "Enviado a servidores externos",
      rowPrivacyFaker: "Local",
      rowPrivacyExcel: "Local ou nuvem fechada",
      rowAgent: "Integração Agentes IA",
      rowAgentWebmcp: "Nativa WebMCP (6 Tools)",
      rowAgentCloud: "Nenhuma",
      rowAgentFaker: "Exige criar wrappers",
      rowAgentExcel: "Nenhuma",
      rowFormats: "Formatos de Exportação",
      rowFormatsWebmcp: "CSV, JSON, SQL, Excel (.xlsx)",
      rowFormatsCloud: "CSV, JSON, SQL, Excel",
      rowFormatsFaker: "Exige bibliotecas extras",
      rowFormatsExcel: "Apenas XLS / CSV",
      rowFormula: "Fórmulas Dinâmicas",
      rowFormulaWebmcp: "JavaScript puro no cliente",
      rowFormulaCloud: "Sandbox Ruby no servidor",
      rowFormulaFaker: "Código manual",
      rowFormulaExcel: "Fórmulas padrão do Excel",
    },
    roles: {
      tag: "ADAPTADO AO SEU FLUXO",
      title: "Quem se Beneficia da Geração Sintética Local?",
      subtitle: "Desde testes de software e ciência de dados até desenvolvimento ágil e salas de aula.",
      tabQa: "🧪 QA & Testers",
      tabData: "📊 Data Science & ML",
      tabDev: "💻 Desenvolvedores",
      tabEdu: "🎓 Educadores e Alunos",
      qaTitle: "Engenheiros de Qualidade e Especialistas em Testes",
      qaQuote: "“Posso gerar 5.000 registros com 15% de campos nulos e formatos extremos para estressar validadores em segundos.”",
      qaP1: "Configuração precisa de porcentagens de valores nulos (% blanks) para testar validações de interface.",
      qaP2: "Exportação em Excel (.xlsx) e CSV com UTF-8 prontos para ferramentas de automação e carga.",
      qaP3: "Simulação de nomes internacionais, emails e números de cartão para testes de segurança e resiliência.",
      qaBenefitLabel: "Economia de Tempo",
      qaBenefitValue: "De 2 horas criando dados manuais para 3 cliques no navegador",
      dataTitle: "Cientistas de Dados e Analistas de Negócio",
      dataQuote: "“Crio conjuntos de dados realistas com a mesma estrutura de clientes sem violar LGPD ou GDPR.”",
      dataP1: "Zero risco de vazamento de dados confidenciais ou informações pessoalmente identificáveis (PII).",
      dataP2: "Integração direta com o WebMCP SQLite Studio para testar queries e modelos relacionais instantaneamente.",
      dataP3: "Criação de séries temporais com datas personalizadas e transações com valores realistas.",
      dataBenefitLabel: "Conformidade e Segurança",
      dataBenefitValue: "100% de dados sintéticos: zero exposição jurídica",
      devTitle: "Desenvolvedores Web, Mobile e Criadores de IA",
      devQuote: "“Meu agente de IA pode invocar o WebMCP para popular o banco de desenvolvimento sem precisar de servidor remoto.”",
      devP1: "6 ferramentas W3C WebMCP para Claude, ChatGPT ou Cursor criarem esquemas e seeders automaticamente.",
      devP2: "Exportação em SQL compatível com PostgreSQL, MySQL e SQLite com INSERTs em lote.",
      devP3: "Fórmulas JavaScript personalizadas para concatenar campos, criar slugs ou valores condicionais.",
      devBenefitLabel: "Velocidade de Iteração",
      devBenefitValue: "Seeders de banco de dados prontos em segundos para qualquer linguagem",
      eduTitle: "Professores, Cursos e Estudantes",
      eduQuote: "“A turma toda pratica análise de dados e SQL sem pedir cadastros nem cartões de crédito aos alunos.”",
      eduP1: "Funciona em qualquer computador ou Chromebook sem instalar Node.js ou Python.",
      eduP2: "Modelos pré-configurados (Users, E-Commerce, Transactions) para começar as aulas na hora.",
      eduP3: "Ajuda os alunos a entenderem a diferença entre esquemas relacionais e dados JSON.",
      eduBenefitLabel: "Facilidade de Uso",
      eduBenefitValue: "Zero atrito: basta abrir a URL e começar a aula",
    },
    faq: {
      tag: "PERGUNTAS FREQUENTES",
      title: "Perguntas Frequentes",
      subtitle: "Tudo o que você precisa saber sobre a tecnologia, privacidade e recursos do Mockaroo Static WebMCP.",
      q1: "Em que difere da versão original do Mockaroo.com?",
      a1: "O Mockaroo.com original roda em servidores remotos e limita as contas gratuitas a apenas 200 registros por dia, exigindo planos de até $500/ano para mais volume. <strong>O Mockaroo Static roda 100% no seu navegador</strong> via Faker.js: é ilimitado, 100% gratuito ($0), não requer cadastro e traz suporte nativo a Agentes de IA via W3C WebMCP.",
      q2: "Meus dados ou esquemas são enviados para algum servidor externo?",
      a2: "<strong>Nunca.</strong> Toda a geração acontece na memória RAM do seu próprio computador através do motor JavaScript do navegador. Nenhuma linha ou coluna sai do seu dispositivo.",
      q3: "Quais formatos de exportação estão disponíveis?",
      a3: "Você pode baixar em <strong>CSV</strong> (com separadores customizáveis), <strong>JSON</strong> (formatado ou compacto), <strong>SQL</strong> (com comandos INSERT INTO em lotes) e <strong>Excel (.xlsx)</strong> gerado localmente com SheetJS.",
      q4: "Como um Agente de IA interage com esta ferramenta?",
      a4: "O Mockaroo Static registra 6 ferramentas em <code>window.modelContext</code> / <code>document.modelContext</code> conforme o padrão W3C WebMCP. Os agentes de IA podem consultar geradores disponíveis, carregar templates e produzir dados sintéticos diretamente em memória.",
      q5: "Como ele se integra com o SQLite Studio e o Code Studio?",
      a5: "Eles formam a <strong>Trilogia WebMCP Completa</strong>: gere fixtures no Mockaroo, importe-os no <strong>WebMCP SQLite Studio</strong> com 1 clique para consultas SQL em memória, e desenvolva aplicações web no <strong>WebMCP Code Studio</strong> com seu VFS e terminal Unix.",
    },
    bottomCta: {
      title: "Pronto para gerar dados de teste sem limites?",
      subtitle: "Crie esquemas, aplique fórmulas em JavaScript e baixe milhares de registros em segundos. 100% grátis e privado.",
      btnGen: "Abrir Mockaroo WebMCP Agora",
      btnSqlite: "Explorar SQLite Studio",
      btnCodeStudio: "Explorar Code Studio",
    },
    footer: {
      text: "O Mockaroo Static WebMCP é uma estação de geração de dados sintéticos 100% local-first desenvolvida sob a metodologia Knowledge-Driven Development (KDD) e o padrão W3C WebMCP.",
      copy: "© 2026 WebMCP Suite • Código Aberto sob Licença MIT • Privacidade e Soberania Total de Dados.",
      trilogyTitle: "A Trilogia WebMCP",
      trilogyMockaroo: "📊 Mockaroo WebMCP",
      trilogySqlite: "🗄️ WebMCP SQLite Studio",
      trilogyCode: "💻 WebMCP Code Studio",
      resourcesTitle: "Recursos e Especificações",
      resFaker: "Faker.js Core",
      resW3c: "W3C WebMCP Draft",
      resLlms: "Especificação llms.txt",
      resGithub: "Repositório no GitHub",
    }
  }
};

// Interactive Datasets for Live Showcase
const SHOWCASE_DATASETS = {
  users: [
    { id: "1001", col1: "Elena Vance", col2: "elena.vance@techcorp.io", col3: "Principal AI Engineer", col4: "Spain", col5: "$142,500" },
    { id: "1002", col1: "Lucas Silva", col2: "lucas.silva@datacore.br", col3: "Data Architect", col4: "Brazil", col5: "$118,000" },
    { id: "1003", col1: "Marcus Chen", col2: "mchen@synthetics.dev", col3: "Senior QA Automation", col4: "United States", col5: "$125,400" },
    { id: "1004", col1: "Amina Al-Mansoor", col2: "amina.m@finquant.ae", col3: "Risk Analyst", col4: "UAE", col5: "$136,200" }
  ],
  orders: [
    { id: "ORD-8821", col1: "Elena Vance", col2: "MacBook Pro M3 Max", col3: "Hardware", col4: "Delivered", col5: "$3,499.00" },
    { id: "ORD-8822", col1: "Lucas Silva", col2: "Dell UltraSharp 32 4K", col3: "Monitors", col4: "Shipped", col5: "$899.50" },
    { id: "ORD-8823", col1: "Marcus Chen", col2: "Keychron Q1 Pro Wireless", col3: "Accessories", col4: "Processing", col5: "$199.00" },
    { id: "ORD-8824", col1: "Amina Al-Mansoor", col2: "Herman Miller Embody", col3: "Office", col4: "Delivered", col5: "$1,695.00" }
  ],
  transactions: [
    { id: "TXN-90412", col1: "Elena Vance", col2: "0x71C...4e8B", col3: "USDC Deposit", col4: "Confirmed", col5: "+$24,500.00" },
    { id: "TXN-90413", col1: "Lucas Silva", col2: "0x3Fa...9a12", col3: "Payroll Transfer", col4: "Confirmed", col5: "-$4,200.00" },
    { id: "TXN-90414", col1: "Marcus Chen", col2: "0x88c...11ef", col3: "Smart Contract Mint", col4: "Pending", col5: "-$320.50" },
    { id: "TXN-90415", col1: "Amina Al-Mansoor", col2: "0x91d...77cc", col3: "Staking Dividend", col4: "Confirmed", col5: "+$1,850.75" }
  ]
};

const SHOWCASE_HEADERS = {
  users: {
    es: ["ID", "Nombre Completo", "Correo Electrónico", "Cargo / Rol", "País", "Compensación"],
    en: ["ID", "Full Name", "Email Address", "Job Title", "Country", "Compensation"],
    pt: ["ID", "Nome Completo", "E-mail", "Cargo / Função", "País", "Remuneração"]
  },
  orders: {
    es: ["ID Orden", "Cliente", "Artículo", "Categoría", "Estado", "Total"],
    en: ["Order ID", "Customer", "Item", "Category", "Status", "Total"],
    pt: ["ID Pedido", "Cliente", "Item", "Categoria", "Status", "Total"]
  },
  transactions: {
    es: ["ID Txn", "Emisor", "Billetera / Hash", "Concepto", "Estado", "Monto"],
    en: ["Txn ID", "Sender", "Wallet / Hash", "Concept", "Status", "Amount"],
    pt: ["ID Txn", "Emissor", "Carteira / Hash", "Conceito", "Status", "Valor"]
  }
};

let currentLang = 'es';
let currentRole = 'qa';
let currentTemplate = 'users';

function getInitialLanguage() {
  const saved = localStorage.getItem('mockaroo_lang');
  if (saved && (saved === 'es' || saved === 'en' || saved === 'pt')) {
    return saved;
  }
  const browserLang = (navigator.language || 'es').toLowerCase();
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('pt')) return 'pt';
  return 'es';
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('mockaroo_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  applyTranslations(TRANSLATIONS[lang]);
  renderShowcaseTable();
  renderActiveRole();
}

function applyTranslations(t) {
  // 1. Navigation
  const navLinks = document.querySelectorAll('.nav-links a');
  if (navLinks.length >= 6) {
    navLinks[0].textContent = t.nav.whatIs;
    navLinks[1].textContent = t.nav.tools;
    navLinks[2].textContent = t.nav.advantages;
    navLinks[3].textContent = t.nav.howTo;
    navLinks[4].textContent = t.nav.useCases;
    navLinks[5].textContent = t.nav.faq;
  }
  const navBtnTxt = document.getElementById('txt-nav-open');
  if (navBtnTxt) navBtnTxt.textContent = t.nav.openGenerator;

  // 2. Hero Section
  const heroPill = document.querySelector('.hero-pill span:last-child');
  if (heroPill) heroPill.textContent = t.hero.pill;

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = t.hero.title;

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.innerHTML = t.hero.subtitle;

  // Hero CTAs
  const ctaGen = document.querySelector('.btn-hero-primary .cta-text');
  if (ctaGen) {
    ctaGen.innerHTML = `<strong>${t.hero.ctaGenTitle}</strong><span>${t.hero.ctaGenDesc}</span>`;
  }
  const secondaryCtas = document.querySelectorAll('.btn-hero-secondary .cta-text');
  if (secondaryCtas.length >= 2) {
    secondaryCtas[0].innerHTML = `<strong>${t.hero.ctaSqliteTitle}</strong><span>${t.hero.ctaSqliteDesc}</span>`;
    secondaryCtas[1].innerHTML = `<strong>${t.hero.ctaCodeTitle}</strong><span>${t.hero.ctaCodeDesc}</span>`;
  }

  // Capabilities Bar
  const capItems = document.querySelectorAll('.capabilities-bar .cap-item');
  if (capItems.length >= 4) {
    capItems[0].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capZeroInstall}`;
    capItems[1].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capPrivate}`;
    capItems[2].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capZeroCost}`;
    capItems[3].innerHTML = `<span class="cap-dot green"></span> ${t.hero.capSpeed}`;
  }

  // 3. Showcase Window
  const winTitle = document.querySelector('.window-title');
  if (winTitle) winTitle.textContent = t.showcase.windowTitle;

  const wasmBadge = document.querySelector('.wasm-live-badge');
  if (wasmBadge) wasmBadge.textContent = t.showcase.wasmBadge;

  const chips = document.querySelectorAll('.template-chip');
  if (chips.length >= 3) {
    chips[0].textContent = t.showcase.tmplUsers;
    chips[1].textContent = t.showcase.tmplOrders;
    chips[2].textContent = t.showcase.tmplTx;
  }

  const btnRegen = document.getElementById('btn-showcase-regen');
  if (btnRegen) btnRegen.innerHTML = `<span>🔄</span> ${t.showcase.btnRegen}`;

  const metaExec = document.getElementById('txt-showcase-meta');
  if (metaExec) metaExec.textContent = t.showcase.metaExecution;

  // 4. Paradigm Shift
  const paradigmTag = document.querySelector('#que-es .section-tag');
  if (paradigmTag) paradigmTag.textContent = t.paradigm.tag;

  const paradigmTitle = document.querySelector('#que-es .section-title');
  if (paradigmTitle) paradigmTitle.textContent = t.paradigm.title;

  const paradigmSubtitle = document.querySelector('#que-es .section-subtitle');
  if (paradigmSubtitle) paradigmSubtitle.textContent = t.paradigm.subtitle;

  const cardOld = document.querySelector('.paradigm-card.old');
  if (cardOld) {
    cardOld.querySelector('.card-status-badge')!.textContent = t.paradigm.oldBadge;
    cardOld.querySelector('h3')!.textContent = t.paradigm.oldTitle;
    const items = cardOld.querySelectorAll('li');
    if (items.length >= 4) {
      items[0].innerHTML = t.paradigm.oldItem1;
      items[1].innerHTML = t.paradigm.oldItem2;
      items[2].innerHTML = t.paradigm.oldItem3;
      items[3].innerHTML = t.paradigm.oldItem4;
    }
  }

  const cardNew = document.querySelector('.paradigm-card.new');
  if (cardNew) {
    cardNew.querySelector('.card-status-badge')!.textContent = t.paradigm.newBadge;
    cardNew.querySelector('h3')!.textContent = t.paradigm.newTitle;
    const items = cardNew.querySelectorAll('li');
    if (items.length >= 4) {
      items[0].innerHTML = t.paradigm.newItem1;
      items[1].innerHTML = t.paradigm.newItem2;
      items[2].innerHTML = t.paradigm.newItem3;
      items[3].innerHTML = t.paradigm.newItem4;
    }
  }

  // 5. 6 WebMCP Tools
  const toolsTag = document.querySelector('#herramientas .section-tag');
  if (toolsTag) toolsTag.textContent = t.toolsSection.tag;

  const toolsTitle = document.querySelector('#herramientas .section-title');
  if (toolsTitle) toolsTitle.textContent = t.toolsSection.title;

  const toolsSubtitle = document.querySelector('#herramientas .section-subtitle');
  if (toolsSubtitle) toolsSubtitle.textContent = t.toolsSection.subtitle;

  const toolCards = document.querySelectorAll('.tools-grid .tool-card');
  if (toolCards.length >= 6) {
    toolCards[0].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool1Name;
    toolCards[0].querySelector('p')!.textContent = t.toolsSection.tool1Desc;

    toolCards[1].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool2Name;
    toolCards[1].querySelector('p')!.textContent = t.toolsSection.tool2Desc;

    toolCards[2].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool3Name;
    toolCards[2].querySelector('p')!.textContent = t.toolsSection.tool3Desc;

    toolCards[3].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool4Name;
    toolCards[3].querySelector('p')!.textContent = t.toolsSection.tool4Desc;

    toolCards[4].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool5Name;
    toolCards[4].querySelector('p')!.textContent = t.toolsSection.tool5Desc;

    toolCards[5].querySelector('.tool-card-title')!.textContent = t.toolsSection.tool6Name;
    toolCards[5].querySelector('p')!.textContent = t.toolsSection.tool6Desc;
  }

  // 6. Comparison Table
  const compTag = document.querySelector('#ventajas .section-tag');
  if (compTag) compTag.textContent = t.comparison.tag;

  const compTitle = document.querySelector('#ventajas .section-title');
  if (compTitle) compTitle.textContent = t.comparison.title;

  const compSubtitle = document.querySelector('#ventajas .section-subtitle');
  if (compSubtitle) compSubtitle.textContent = t.comparison.subtitle;

  const tableHeaders = document.querySelectorAll('.comparison-table th');
  if (tableHeaders.length >= 5) {
    tableHeaders[0].textContent = t.comparison.colFeature;
    tableHeaders[1].textContent = t.comparison.colWebmcp;
    tableHeaders[2].textContent = t.comparison.colCloud;
    tableHeaders[3].textContent = t.comparison.colFaker;
    tableHeaders[4].textContent = t.comparison.colExcel;
  }

  const tableRows = document.querySelectorAll('.comparison-table tbody tr');
  if (tableRows.length >= 6) {
    // Row 1: Record Limits
    tableRows[0].children[0].textContent = t.comparison.rowRows;
    tableRows[0].children[1].textContent = t.comparison.rowRowsWebmcp;
    tableRows[0].children[2].textContent = t.comparison.rowRowsCloud;
    tableRows[0].children[3].textContent = t.comparison.rowRowsFaker;
    tableRows[0].children[4].textContent = t.comparison.rowRowsExcel;

    // Row 2: Monthly Cost
    tableRows[1].children[0].textContent = t.comparison.rowCost;
    tableRows[1].children[1].textContent = t.comparison.rowCostWebmcp;
    tableRows[1].children[2].textContent = t.comparison.rowCostCloud;
    tableRows[1].children[3].textContent = t.comparison.rowCostFaker;
    tableRows[1].children[4].textContent = t.comparison.rowCostExcel;

    // Row 3: Privacy
    tableRows[2].children[0].textContent = t.comparison.rowPrivacy;
    tableRows[2].children[1].textContent = t.comparison.rowPrivacyWebmcp;
    tableRows[2].children[2].textContent = t.comparison.rowPrivacyCloud;
    tableRows[2].children[3].textContent = t.comparison.rowPrivacyFaker;
    tableRows[2].children[4].textContent = t.comparison.rowPrivacyExcel;

    // Row 4: AI Agent Integration
    tableRows[3].children[0].textContent = t.comparison.rowAgent;
    tableRows[3].children[1].textContent = t.comparison.rowAgentWebmcp;
    tableRows[3].children[2].textContent = t.comparison.rowAgentCloud;
    tableRows[3].children[3].textContent = t.comparison.rowAgentFaker;
    tableRows[3].children[4].textContent = t.comparison.rowAgentExcel;

    // Row 5: Native Export Formats
    tableRows[4].children[0].textContent = t.comparison.rowFormats;
    tableRows[4].children[1].textContent = t.comparison.rowFormatsWebmcp;
    tableRows[4].children[2].textContent = t.comparison.rowFormatsCloud;
    tableRows[4].children[3].textContent = t.comparison.rowFormatsFaker;
    tableRows[4].children[4].textContent = t.comparison.rowFormatsExcel;

    // Row 6: Dynamic Formulas
    tableRows[5].children[0].textContent = t.comparison.rowFormula;
    tableRows[5].children[1].textContent = t.comparison.rowFormulaWebmcp;
    tableRows[5].children[2].textContent = t.comparison.rowFormulaCloud;
    tableRows[5].children[3].textContent = t.comparison.rowFormulaFaker;
    tableRows[5].children[4].textContent = t.comparison.rowFormulaExcel;
  }

  // 7. Roles / Use Cases
  const rolesTag = document.querySelector('#perfiles .section-tag');
  if (rolesTag) rolesTag.textContent = t.roles.tag;

  const rolesTitle = document.querySelector('#perfiles .section-title');
  if (rolesTitle) rolesTitle.textContent = t.roles.title;

  const rolesSubtitle = document.querySelector('#perfiles .section-subtitle');
  if (rolesSubtitle) rolesSubtitle.textContent = t.roles.subtitle;

  const roleTabs = document.querySelectorAll('.role-tab');
  if (roleTabs.length >= 4) {
    roleTabs[0].textContent = t.roles.tabQa;
    roleTabs[1].textContent = t.roles.tabData;
    roleTabs[2].textContent = t.roles.tabDev;
    roleTabs[3].textContent = t.roles.tabEdu;
  }

  // 8. FAQ Accordion
  const faqTag = document.querySelector('#faq .section-tag');
  if (faqTag) faqTag.textContent = t.faq.tag;

  const faqTitle = document.querySelector('#faq .section-title');
  if (faqTitle) faqTitle.textContent = t.faq.title;

  const faqSubtitle = document.querySelector('#faq .section-subtitle');
  if (faqSubtitle) faqSubtitle.textContent = t.faq.subtitle;

  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length >= 5) {
    faqItems[0].querySelector('.faq-question span:first-child')!.textContent = t.faq.q1;
    faqItems[0].querySelector('.faq-answer p')!.innerHTML = t.faq.a1;

    faqItems[1].querySelector('.faq-question span:first-child')!.textContent = t.faq.q2;
    faqItems[1].querySelector('.faq-answer p')!.innerHTML = t.faq.a2;

    faqItems[2].querySelector('.faq-question span:first-child')!.textContent = t.faq.q3;
    faqItems[2].querySelector('.faq-answer p')!.innerHTML = t.faq.a3;

    faqItems[3].querySelector('.faq-question span:first-child')!.textContent = t.faq.q4;
    faqItems[3].querySelector('.faq-answer p')!.innerHTML = t.faq.a4;

    faqItems[4].querySelector('.faq-question span:first-child')!.textContent = t.faq.q5;
    faqItems[4].querySelector('.faq-answer p')!.innerHTML = t.faq.a5;
  }

  // 9. Bottom CTA Banner
  const botTitle = document.querySelector('.cta-banner-title');
  if (botTitle) botTitle.textContent = t.bottomCta.title;

  const botSubtitle = document.querySelector('.cta-banner-subtitle');
  if (botSubtitle) botSubtitle.textContent = t.bottomCta.subtitle;

  const botButtons = document.querySelectorAll('.cta-banner-buttons .btn');
  if (botButtons.length >= 3) {
    botButtons[0].innerHTML = `<span>📊</span> ${t.bottomCta.btnGen}`;
    botButtons[1].innerHTML = `<span>🗄️</span> ${t.bottomCta.btnSqlite}`;
    botButtons[2].innerHTML = `<span>💻</span> ${t.bottomCta.btnCodeStudio}`;
  }

  // 10. Footer
  const footerText = document.querySelector('.footer-text');
  if (footerText) footerText.textContent = t.footer.text;

  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer.copy;

  const footerHeaders = document.querySelectorAll('.footer-links-group h4');
  if (footerHeaders.length >= 2) {
    footerHeaders[0].textContent = t.footer.trilogyTitle;
    footerHeaders[1].textContent = t.footer.resourcesTitle;
  }

  const trilogyLinks = document.querySelectorAll('.footer-links-group:first-of-type a');
  if (trilogyLinks.length >= 3) {
    trilogyLinks[0].textContent = t.footer.trilogyMockaroo;
    trilogyLinks[1].textContent = t.footer.trilogySqlite;
    trilogyLinks[2].textContent = t.footer.trilogyCode;
  }

  const resLinks = document.querySelectorAll('.footer-links-group:last-of-type a');
  if (resLinks.length >= 4) {
    resLinks[0].textContent = t.footer.resFaker;
    resLinks[1].textContent = t.footer.resW3c;
    resLinks[2].textContent = t.footer.resLlms;
    resLinks[3].textContent = t.footer.resGithub;
  }
}

function renderShowcaseTable() {
  const table = document.getElementById('showcase-preview-table');
  if (!table) return;

  const headers = SHOWCASE_HEADERS[currentTemplate][currentLang] || SHOWCASE_HEADERS[currentTemplate]['en'];
  const dataset = SHOWCASE_DATASETS[currentTemplate] || SHOWCASE_DATASETS['users'];

  let theadHtml = '<thead><tr>';
  headers.forEach(h => {
    theadHtml += `<th>${h}</th>`;
  });
  theadHtml += '</tr></thead>';

  let tbodyHtml = '<tbody>';
  dataset.forEach((row, i) => {
    const badgeClass = i % 2 === 0 ? 'badge-active' : 'badge-pending';
    tbodyHtml += `<tr>
      <td><strong>${row.id}</strong></td>
      <td>${row.col1}</td>
      <td>${row.col2}</td>
      <td>${row.col3}</td>
      <td><span class="table-badge ${badgeClass}">${row.col4}</span></td>
      <td><strong>${row.col5}</strong></td>
    </tr>`;
  });
  tbodyHtml += '</tbody>';

  table.innerHTML = theadHtml + tbodyHtml;
}

function renderActiveRole() {
  const t = TRANSLATIONS[currentLang];
  const roleCard = document.querySelector('.role-detail-card');
  if (!roleCard) return;

  const titleEl = roleCard.querySelector('h3');
  const quoteEl = roleCard.querySelector('.role-quote');
  const pointsList = roleCard.querySelector('.role-points');
  const benefitLabel = roleCard.querySelector('.role-highlight-box strong');
  const benefitValue = roleCard.querySelector('.role-highlight-box span');

  let title = '';
  let quote = '';
  let points = [];
  let bLabel = '';
  let bValue = '';

  if (currentRole === 'qa') {
    title = t.roles.qaTitle;
    quote = t.roles.qaQuote;
    points = [t.roles.qaP1, t.roles.qaP2, t.roles.qaP3];
    bLabel = t.roles.qaBenefitLabel;
    bValue = t.roles.qaBenefitValue;
  } else if (currentRole === 'data') {
    title = t.roles.dataTitle;
    quote = t.roles.dataQuote;
    points = [t.roles.dataP1, t.roles.dataP2, t.roles.dataP3];
    bLabel = t.roles.dataBenefitLabel;
    bValue = t.roles.dataBenefitValue;
  } else if (currentRole === 'dev') {
    title = t.roles.devTitle;
    quote = t.roles.devQuote;
    points = [t.roles.devP1, t.roles.devP2, t.roles.devP3];
    bLabel = t.roles.devBenefitLabel;
    bValue = t.roles.devBenefitValue;
  } else {
    title = t.roles.eduTitle;
    quote = t.roles.eduQuote;
    points = [t.roles.eduP1, t.roles.eduP2, t.roles.eduP3];
    bLabel = t.roles.eduBenefitLabel;
    bValue = t.roles.eduBenefitValue;
  }

  if (titleEl) titleEl.textContent = title;
  if (quoteEl) quoteEl.textContent = quote;
  if (pointsList) {
    pointsList.innerHTML = points.map((p) => `<li>${p}</li>`).join('');
  }
  if (benefitLabel) benefitLabel.textContent = `${bLabel}:`;
  if (benefitValue) benefitValue.textContent = bValue;
}

document.addEventListener('DOMContentLoaded', () => {
  // Init language
  const initLang = getInitialLanguage();
  setLanguage(initLang);

  // Language buttons listener
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) setLanguage(lang);
    });
  });

  // Template chips listener
  document.querySelectorAll('.template-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.template-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTemplate = chip.getAttribute('data-template') || 'users';
      renderShowcaseTable();
    });
  });

  // Regenerate button simulation
  const btnRegen = document.getElementById('btn-showcase-regen');
  if (btnRegen) {
    btnRegen.addEventListener('click', () => {
      // Shuffle row order or add random variation
      const dataset = SHOWCASE_DATASETS[currentTemplate];
      dataset.reverse();
      renderShowcaseTable();
    });
  }

  // Role tab selector listener
  document.querySelectorAll('.role-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.role-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentRole = tab.getAttribute('data-role') || 'qa';
      renderActiveRole();
    });
  });

  // FAQ accordion listener
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (item) {
        item.classList.toggle('open');
      }
    });
  });
});
