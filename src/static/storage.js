import { DEFAULT_PRESETS } from './presets';

const STORAGE_KEY = 'mockaroo_schemas';

export function getStoredSchemas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRESETS));
      return { ...DEFAULT_PRESETS };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_PRESETS };
    }
    // Filter to ensure all schemas have valid fields array (TC-TMP-04)
    const valid = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (v && typeof v === 'object' && Array.isArray(v.fields)) {
        valid[k] = v;
      }
    }
    return Object.keys(valid).length > 0 ? valid : { ...DEFAULT_PRESETS };
  } catch (e) {
    console.warn('[Storage] Error reading localStorage, returning defaults', e);
    return { ...DEFAULT_PRESETS };
  }
}

export function saveSchema(id, schemaObj) {
  const schemas = getStoredSchemas();
  schemas[id] = schemaObj;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schemas));
  } catch (e) {
    console.error('[Storage] Error saving to localStorage', e);
  }
  return schemas;
}

export function deleteSchema(id) {
  const schemas = getStoredSchemas();
  if (DEFAULT_PRESETS[id]) {
    // If it's a default preset, don't delete, just reset to original
    schemas[id] = { ...DEFAULT_PRESETS[id] };
  } else {
    delete schemas[id];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schemas));
  return schemas;
}

export function exportSchemasJSON() {
  const schemas = getStoredSchemas();
  return JSON.stringify(schemas, null, 2);
}

/**
 * Validates and imports schemas from JSON string (TC-TMP-03, TC-TMP-04)
 */
export function importSchemasJSON(jsonString) {
  let imported;
  try {
    imported = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
  } catch (parseErr) {
    throw new Error('El archivo JSON no tiene un formato válido.');
  }

  if (!imported || typeof imported !== 'object') {
    throw new Error('Estructura de esquema no válida: el archivo no contiene un objeto o arreglo.');
  }

  // Case 1: Direct array of fields [{ name: '...', type: '...' }]
  if (Array.isArray(imported)) {
    const validFields = imported.filter(f => f && typeof f === 'object' && (f.name || f.type));
    if (!validFields.length) {
      throw new Error('Estructura de esquema no válida: el arreglo no contiene campos reconocibles.');
    }
    const current = getStoredSchemas();
    const id = `custom_${Date.now()}`;
    current[id] = {
      name: `Imported Schema (${validFields.length} fields)`,
      description: 'Esquema importado desde archivo JSON',
      fields: validFields
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return { count: 1, schemas: current };
  }

  // Case 2: Single schema object { name: '...', fields: [...] }
  if (Array.isArray(imported.fields)) {
    const validFields = imported.fields.filter(f => f && typeof f === 'object' && (f.name || f.type));
    if (!validFields.length) {
      throw new Error('Estructura de esquema no válida: la propiedad "fields" no contiene campos válidos.');
    }
    const current = getStoredSchemas();
    const id = (imported.id || imported.name || `custom_${Date.now()}`).toLowerCase().replace(/[^a-z0-9_]/g, '_');
    current[id] = {
      name: imported.name || 'Imported Schema',
      description: imported.description || 'Esquema importado desde archivo JSON',
      fields: validFields
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return { count: 1, schemas: current };
  }

  // Case 3: Dictionary/Map of schemas { [schemaId]: { name: '...', fields: [...] } }
  const validSchemas = {};
  let validCount = 0;
  for (const [key, val] of Object.entries(imported)) {
    if (val && typeof val === 'object' && Array.isArray(val.fields)) {
      const validFields = val.fields.filter(f => f && typeof f === 'object');
      if (validFields.length > 0) {
        validSchemas[key] = {
          name: val.name || key,
          description: val.description || '',
          fields: validFields
        };
        validCount++;
      }
    }
  }

  if (validCount === 0) {
    throw new Error('Estructura de esquema no válida: el archivo no contiene una propiedad "fields" ni plantillas reconocibles.');
  }

  const current = getStoredSchemas();
  const merged = { ...current, ...validSchemas };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return { count: validCount, schemas: merged };
}

