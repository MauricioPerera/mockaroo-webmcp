import { DEFAULT_PRESETS } from './presets';

const STORAGE_KEY = 'mockaroo_schemas';

export function getStoredSchemas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRESETS));
      return { ...DEFAULT_PRESETS };
    }
    return JSON.parse(raw);
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

export function importSchemasJSON(jsonString) {
  const imported = JSON.parse(jsonString);
  const current = getStoredSchemas();
  const merged = { ...current, ...imported };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  return merged;
}
