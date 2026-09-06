const express = require('express');
const cors = require('cors');
const path = require('path');
const { DATA_TYPES, CATEGORIES } = require('./lib/dataTypes');
const { generateDataset } = require('./lib/generator');
const { toCSV, toJSON, toSQL, toExcel } = require('./lib/formatters');
const { getSchemas, getSchema, saveSchema } = require('./lib/storage');

const app = express();
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 4000;

// Setup Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Dummy handlers to suppress browser favicon and legacy PWA requests
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/manifest.webmanifest', (req, res) => {
  res.json({ name: 'Mockaroo Local', short_name: 'Mockaroo' });
});

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Helper to parse fields from form submission
 */
function parseFieldsFromBody(body) {
  const toArray = (val) => val === undefined ? [] : Array.isArray(val) ? val : [val];
  const ids = toArray(body['field_id[]'] || body.field_id);
  const names = toArray(body['field_name[]'] || body.field_name);
  const types = toArray(body['field_type[]'] || body.field_type);
  const blanks = toArray(body['field_blank[]'] || body.field_blank);
  const formulas = toArray(body['field_formula[]'] || body.field_formula);
  const optionsArr = toArray(body['field_options[]'] || body.field_options);

  const fields = [];
  for (let i = 0; i < names.length; i++) {
    const rawName = (names[i] || '').trim();
    if (!rawName) continue;

    let opts = {};
    try {
      opts = optionsArr[i] ? JSON.parse(optionsArr[i]) : {};
    } catch (e) {
      opts = {};
    }

    fields.push({
      id: ids[i] || `f_${Date.now()}_${i}`,
      name: rawName,
      type: types[i] || 'row_number',
      blank: parseFloat(blanks[i] || 0),
      formula: (formulas[i] || '').trim(),
      options: opts
    });
  }
  return fields;
}

// ----------------------------------------------------
// UI Routes
// ----------------------------------------------------

// Main Page
app.get('/', (req, res) => {
  const schemas = getSchemas();
  const defaultSchema = schemas.users || Object.values(schemas)[0];

  res.render('index', {
    fields: defaultSchema.fields,
    activePresetName: defaultSchema.name,
    dataTypes: DATA_TYPES,
    categories: CATEGORIES,
    presets: schemas
  });
});

// Load Preset or Saved Schema
app.get('/preset/:id', (req, res) => {
  const schemas = getSchemas();
  const schema = schemas[req.params.id];

  if (!schema) {
    return res.redirect('/');
  }

  res.render('index', {
    fields: schema.fields,
    activePresetName: schema.name,
    dataTypes: DATA_TYPES,
    categories: CATEGORIES,
    presets: schemas
  });
});

// HTMX: Add Field Row
app.post('/fields/add', (req, res) => {
  const newField = {
    id: `f_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    name: `field_${Date.now().toString().slice(-4)}`,
    type: 'row_number',
    blank: 0,
    formula: '',
    options: {}
  };

  res.render('partials/fieldRow', {
    field: newField,
    dataTypes: DATA_TYPES
  });
});

// HTMX: Instant Preview Table Modal
app.post('/preview', (req, res) => {
  const fields = parseFieldsFromBody(req.body);
  const sampleCount = 12;
  const records = generateDataset(fields, sampleCount);

  res.render('partials/previewModal', {
    fields,
    records
  });
});

// Download Generated Data
app.post('/generate', (req, res) => {
  const fields = parseFieldsFromBody(req.body);
  const numRows = Math.min(Math.max(parseInt(req.body.num_rows, 10) || 100, 1), 200000);
  const format = (req.body.file_format || 'csv').toLowerCase();

  if (!fields.length) {
    return res.status(400).send('Error: At least one field with a valid name is required.');
  }

  const records = generateDataset(fields, numRows);
  const baseName = (req.body.sql_table || 'mock_data').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');

  switch (format) {
    case 'json': {
      const jsonStr = toJSON(records, { minify: req.body.json_minify });
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.json"`);
      return res.send(jsonStr);
    }
    case 'sql': {
      const sqlStr = toSQL(records, fields, {
        tableName: req.body.sql_table || 'mock_data',
        dialect: req.body.sql_dialect || 'postgres'
      });
      res.setHeader('Content-Type', 'application/sql; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.sql"`);
      return res.send(sqlStr);
    }
    case 'excel': {
      const excelBuffer = toExcel(records, fields);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.xlsx"`);
      return res.send(excelBuffer);
    }
    case 'csv':
    default: {
      const csvStr = toCSV(records, fields, {
        delimiter: req.body.csv_delimiter || ',',
        header: req.body.csv_header,
        bom: req.body.csv_bom
      });
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${baseName}.csv"`);
      return res.send(csvStr);
    }
  }
});

// Save Schema
app.post('/schemas/save', (req, res) => {
  const name = (req.body.schema_name || '').trim();
  if (!name) return res.status(400).json({ ok: false, error: 'Schema name is required' });

  const fields = parseFieldsFromBody(req.body);
  const id = name.toLowerCase().replace(/[^a-z0-9_]/g, '_');

  saveSchema(id, {
    name,
    description: `Saved on ${new Date().toLocaleDateString()}`,
    fields
  });

  res.json({ ok: true, id, name });
});

// ----------------------------------------------------
// Mock REST API Endpoints
// ----------------------------------------------------

// GET /api/mock/:schemaId
app.get('/api/mock/:schemaId', async (req, res) => {
  const schema = getSchema(req.params.schemaId);
  if (!schema) {
    return res.status(404).json({
      error: 'Schema not found',
      message: `Schema '${req.params.schemaId}' does not exist. Available schemas: ${Object.keys(getSchemas()).join(', ')}`
    });
  }

  const count = Math.min(Math.max(parseInt(req.query.count, 10) || 10, 1), 1000);
  const delayMs = parseInt(req.query.delay, 10) || 0;
  const format = (req.query.format || 'json').toLowerCase();

  if (delayMs > 0) {
    await new Promise(resolve => setTimeout(resolve, Math.min(delayMs, 5000)));
  }

  const records = generateDataset(schema.fields, count);

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.send(toCSV(records, schema.fields));
  }

  return res.json(records);
});

// POST /api/mock/:schemaId
app.post('/api/mock/:schemaId', (req, res) => {
  const schema = getSchema(req.params.schemaId);
  if (!schema) {
    return res.status(404).json({ error: 'Schema not found' });
  }

  const createdRecord = {
    ...generateDataset(schema.fields, 1)[0],
    ...req.body,
    _id: `rec_${Date.now()}`,
    _createdAt: new Date().toISOString()
  };

  res.status(201).json({
    status: 'success',
    message: 'Record simulated successfully',
    data: createdRecord
  });
});

// ----------------------------------------------------
// WebMCP HTTP API Endpoints for AI Agents
// ----------------------------------------------------

// GET /api/webmcp/tools
app.get('/api/webmcp/tools', (req, res) => {
  res.json({
    protocol: 'WebMCP',
    version: '0.4.2',
    provider: 'fastwebmcp',
    tools: [
      {
        name: 'get_data_types',
        description: 'Returns all available realistic data generator types (+65 types) with categories and descriptions.',
        inputSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Optional category filter' }
          }
        }
      },
      {
        name: 'list_schemas',
        description: 'Lists all available schema templates (users, ecommerce, transactions, employees, telemetry) and custom saved schemas.',
        inputSchema: { type: 'object', properties: {} }
      },
      {
        name: 'generate_data',
        description: 'Generates synthetic mock data using a preset name (users, ecommerce, transactions, employees, telemetry) or custom field parameters.',
        inputSchema: {
          type: 'object',
          properties: {
            preset: { type: 'string', default: 'users' },
            count: { type: 'number', default: 10 },
            format: { type: 'string', enum: ['json', 'csv', 'sql'], default: 'json' }
          }
        }
      }
    ]
  });
});

// POST /api/webmcp/invoke
app.post('/api/webmcp/invoke', (req, res) => {
  const { tool, args = {} } = req.body;
  const schemas = getSchemas();

  switch (tool) {
    case 'get_data_types': {
      const types = Object.entries(DATA_TYPES).map(([key, d]) => ({
        key,
        name: d.name,
        category: d.category,
        description: d.description
      }));
      const filtered = args.category 
        ? types.filter(t => t.category.toLowerCase() === args.category.toLowerCase())
        : types;
      return res.json({ count: filtered.length, types: filtered });
    }
    case 'list_schemas': {
      return res.json(schemas);
    }
    case 'generate_data': {
      const presetId = args.preset || 'users';
      const schema = schemas[presetId] || schemas.users;
      const count = Math.min(Math.max(parseInt(args.count, 10) || 10, 1), 5000);
      const records = generateDataset(schema.fields, count);

      if (args.format === 'csv') {
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        return res.send(toCSV(records, schema.fields));
      }
      if (args.format === 'sql') {
        res.setHeader('Content-Type', 'application/sql; charset=utf-8');
        return res.send(toSQL(records, schema.fields, { tableName: presetId }));
      }
      return res.json(records);
    }
    default:
      return res.status(404).json({ error: `Tool "${tool}" not found` });
  }
});

// Start Server with auto port fallback
function startServer(port) {
  const srv = app.listen(port, () => {
    console.log(`====================================================`);
    console.log(`🚀 Mockaroo Local is running at: http://localhost:${port}`);
    console.log(`📡 Mock REST API available at:   http://localhost:${port}/api/mock/:schemaId`);
    console.log(`====================================================`);
  });

  srv.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
