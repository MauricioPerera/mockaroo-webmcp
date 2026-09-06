# Mockaroo Local 🚀 (Con soporte WebMCP para Agentes de IA)

Un clon 100% local, autónomo y sin límites de [Mockaroo](https://www.mockaroo.com/) para generar datos sintéticos de prueba, simular APIs REST e interactuar sin fricciones con **Agentes de IA mediante WebMCP**.

Construido con **Node.js, Express, HTMX, Tailwind CSS y FastWebMCP (Zod)**.

---

## 🌟 Características Principales

- **Idéntica Experiencia de Usuario:** Interfaz tipo tabla con nombres de columnas, selector categorizado de tipos, porcentaje de nulos (`blanks %`) y reordenamiento mediante Drag & Drop (SortableJS).
- **Soporte Nativo de WebMCP (Web Model Context Protocol):**
  - Implementado con [FastWebMCP](https://github.com/MauricioPerera/fastwebmcp) y conforme al estándar [WebMCP](https://webmcp.com/).
  - Los agentes de IA (extensiones de navegador, agentes autónomos o LLMs) descubren y ejecutan herramientas directamente sobre la página mediante `document.modelContext`.
  - Herramientas expuestas: `get_data_types`, `list_schemas`, `generate_data`, `load_schema_in_ui`, `add_field_to_ui`, `preview_mock_data`.
  - Atributos declarativos WebMCP sobre el formulario (`toolname="generate_mock_dataset"`, `tooldescription`, `toolparamdescription`).
  - Endpoints HTTP para agentes remotos / CLI: `GET /api/webmcp/tools` y `POST /api/webmcp/invoke`.
- **+65 Tipos de Datos Realistas:** Organizados en 10 categorías (Personas, Ubicación, Internet/Tecnología, Finanzas, Comercio, Números, Fechas, Identificadores, Lógica y Texto).
- **Formatos de Exportación:**
  - **CSV:** Delimitadores configurables (coma, punto y coma, tabulación, pipe), cabeceras y soporte BOM UTF-8.
  - **JSON:** Formateado / indentado o minificado.
  - **SQL:** Sentencias `INSERT INTO` optimizadas en lotes con soporte para dialectos PostgreSQL, MySQL y SQLite.
  - **Excel:** Descarga directa de archivos `.xlsx` nativos con auto-ajuste de ancho de columnas.
- **Motor de Fórmulas JavaScript:** Permite computar columnas dinámicamente basadas en otros campos (ej. `record.first_name.toLowerCase() + '.' + record.last_name.toLowerCase() + '@empresa.com'`).
- **Mock REST API Integrada:** Servidor HTTP local con endpoints listos para pruebas frontend o pipelines CI/CD:
  - `GET /api/mock/:schemaId?count=10&delay=200`
  - `POST /api/mock/:schemaId` (simulación de creación de recursos).
- **Plantillas Preconfiguradas (Presets):** Cuentas de Usuario (`users`), Órdenes E-Commerce (`ecommerce`), Transacciones Financieras (`transactions`), Directorio de Empleados y RRHH (`employees`), Telemetría de Sensores IoT (`telemetry`).

---

## 🤖 ¿Cómo interactúa un Agente de IA con WebMCP?

### 1. En el Navegador (JavaScript / Extensiones de IA)
Cualquier agente con acceso al DOM puede descubrir y ejecutar herramientas registradas en `document.modelContext`:

```javascript
// Obtener herramientas registradas por Mockaroo Local
const tools = document.modelContext.getTools();

// Generar 5 transacciones sintéticas
const data = await document.modelContext.executeTool('generate_data', {
  preset: 'transactions',
  count: 5,
  format: 'json'
});
console.log(data);

// Añadir una columna directamente a la interfaz visual del usuario
await document.modelContext.executeTool('add_field_to_ui', {
  name: 'tax_amount',
  type: 'decimal',
  blank: 0
});
```

### 2. Vía HTTP (Agentes Remotos, CLI, cURL)
```bash
# Inspeccionar herramientas disponibles
curl "http://localhost:4002/api/webmcp/tools"

# Invocar generación de datos sintéticos
curl -X POST "http://localhost:4002/api/webmcp/invoke" \
  -H "Content-Type: application/json" \
  -d '{"tool":"generate_data","args":{"preset":"users","count":3}}'
```

---

## 🚀 Despliegue en GitHub Pages (100% Estático)

El proyecto incluye una versión cliente compilada en la carpeta `docs/` que funciona **100% en el navegador**, sin necesidad de ningún servidor o backend Node.js, manteniendo todo el motor de Faker, exportación CSV/JSON/SQL/XLSX y el protocolo **WebMCP** para agentes de IA:

### Cómo desplegar en GitHub Pages:
1. Sube este repositorio a GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: mockaroo clone with webmcp and github pages support"
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
2. En GitHub, ve a **Settings** > **Pages**.
3. En **Build and deployment** > **Source**, selecciona:
   - **Branch:** `main`
   - **Folder:** `/docs`
4. Guarda los cambios. En 1 minuto tu aplicación estará activa en:
   `https://TU-USUARIO.github.io/TU-REPO/`

### Recompilar el bundle estático si haces cambios:
```bash
npm run build:pages
```

---

## 💻 Inicio Rápido Local (Con Backend Node.js opcional)

Si deseas utilizar también la Mock REST API para pruebas con `curl` o backend local:
```bash
npm start
```
Abre tu navegador en:
```
http://localhost:4003 (o el puerto asignado)
```
- Versión estática (idéntica a GitHub Pages): `http://localhost:4003/docs/`
- Versión con servidor Express y Mock REST API: `http://localhost:4003/`
