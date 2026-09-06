import * as FastWebMcp from 'fastwebmcp';
import { z } from 'zod';
import { DATA_TYPES } from './dataTypes';
import { generateRecord, generateDataset } from './generator';
import { toCSV, toJSON, toSQL, toExcel, sanitizeSchemaFields } from './formatters';
import { DEFAULT_PRESETS } from './presets';
import { getStoredSchemas, saveSchema, deleteSchema, exportSchemasJSON, importSchemasJSON } from './storage';

// Polyfill document.modelContext if not present
if (typeof document !== 'undefined' && !document.modelContext) {
  const _tools = new Map();
  document.modelContext = {
    _tools,
    registerTool(tool, options) {
      _tools.set(tool.name, { ...tool, options });
      console.log(`[WebMCP] Registered tool: ${tool.name}`);
    },
    unregisterTool(name) {
      _tools.delete(name);
    },
    getTools() {
      return Array.from(_tools.values());
    },
    async executeTool(name, args) {
      const tool = _tools.get(name);
      if (!tool) throw new Error(`[WebMCP] Tool "${name}" not found`);
      return tool.execute(args);
    }
  };
}

// Global window helpers
if (typeof window !== 'undefined') {
  window.FastWebMcp = FastWebMcp;
  window.z = z;
  window.DATA_TYPES = DATA_TYPES;
  window.generateDataset = generateDataset;
  window.DEFAULT_PRESETS = DEFAULT_PRESETS;
  window.webmcp = {
    getTools() {
      return document.modelContext.getTools();
    },
    async invoke(name, args = {}) {
      return document.modelContext.executeTool(name, args);
    }
  };
}

// Current active state
let activeFieldRowForModal = null;
let activeRowFormulaField = null;

/**
 * Robust HTML Escaping (TC-12)
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strict Row Count Sanitization (TC-06, TC-07, TC-08)
 * Clamps input strictly between 1 and 10,000.
 */
export function sanitizeRowCount(val) {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed) || parsed < 1) return 10;
  if (parsed > 10000) return 10000;
  return parsed;
}

/**
 * Displays or removes empty state message when rows are 0 (TC-09)
 */
export function updateEmptyState() {
  const container = document.getElementById('fields-container');
  if (!container) return;
  const existingEmpty = document.getElementById('empty-schema-state-row');
  const rows = container.querySelectorAll('.field-row');

  if (rows.length === 0) {
    if (!existingEmpty) {
      const emptyTr = document.createElement('tr');
      emptyTr.id = 'empty-schema-state-row';
      emptyTr.innerHTML = `
        <td colspan="6" class="py-10 text-center text-gray-400 bg-[#2b2b2b] border-2 border-dashed border-[#4a4a4a] rounded my-2">
          <div class="flex flex-col items-center justify-center gap-2">
            <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p class="text-sm font-semibold text-gray-200">No hay columnas en el esquema</p>
            <p class="text-xs text-gray-400">Haz clic en <strong>+ Add another field</strong> o carga una plantilla desde <strong>Templates</strong>.</p>
          </div>
        </td>
      `;
      container.appendChild(emptyTr);
    }
  } else {
    if (existingEmpty) {
      existingEmpty.remove();
    }
  }
}

/**
 * Reads and sanitizes the current schema from the DOM table (TC-09, TC-10, TC-11)
 */
export function getCurrentSchemaFromDOM() {
  const container = document.getElementById('fields-container');
  if (!container) return [];
  const rows = container.querySelectorAll('.field-row');
  if (rows.length === 0) return [];

  const rawSchema = [];
  rows.forEach((row, idx) => {
    const id = row.getAttribute('data-id');
    const nameInput = row.querySelector('.field-name-input');
    const typeInput = row.querySelector('.field-type-input');
    const blankInput = row.querySelector('.field-blank-input');
    const formulaInput = row.querySelector('.field-formula-input');

    let name = (nameInput ? nameInput.value : '').trim();
    // TC-10: Auto-fill fallback name if empty
    if (!name) {
      name = `field_${idx + 1}`;
      if (nameInput) nameInput.value = name;
    }

    const type = typeInput ? typeInput.value : 'first_name';
    const blank = blankInput ? parseFloat(blankInput.value) || 0 : 0;
    const formula = formulaInput ? formulaInput.value : '';

    rawSchema.push({ id, name, type, blank, formula });
  });

  // TC-11: De-duplicate column names
  return sanitizeSchemaFields(rawSchema);
}

/**
 * Creates HTML for a field row in the table
 */
export function createFieldRowElement(field = {}) {
  const id = field.id || 'f_' + Math.random().toString(36).substring(2, 9);
  let name = (field.name || '').trim();
  if (!name) {
    const container = document.getElementById('fields-container');
    const existing = container ? container.querySelectorAll('.field-row').length : 0;
    name = `field_${existing + 1}`;
  }
  const typeKey = field.type || 'first_name';
  const blank = Math.min(Math.max(parseFloat(field.blank) || 0, 0), 100);
  const formula = field.formula || '';

  const typeDef = DATA_TYPES[typeKey] || DATA_TYPES.first_name || { name: typeKey, category: 'General' };

  const tr = document.createElement('tr');
  tr.className = 'field-row border-b border-[#383838] hover:bg-[#333333] transition-colors group';
  tr.setAttribute('data-id', id);

  tr.innerHTML = `
    <!-- Drag Handle -->
    <td class="py-2.5 px-3 text-center cursor-grab active:cursor-grabbing text-gray-500 hover:text-gray-300 drag-handle select-none">
      <svg class="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
      </svg>
    </td>

    <!-- Field Name (TC-10) -->
    <td class="py-2 px-3">
      <input 
        type="text" 
        value="${escapeHtml(name)}" 
        placeholder="Field Name" 
        class="field-name-input w-full bg-[#242424] border border-[#4a4a4a] focus:border-primary-green focus:ring-1 focus:ring-primary-green rounded px-2.5 py-1.5 text-sm text-gray-100 placeholder-gray-500 font-mono transition"
        required
      />
    </td>

    <!-- Field Type -->
    <td class="py-2 px-3">
      <input type="hidden" class="field-type-input" value="${escapeHtml(typeKey)}" />
      <button 
        type="button" 
        class="btn-select-type w-full text-left bg-[#242424] border border-[#4a4a4a] hover:border-gray-400 focus:border-primary-green rounded px-2.5 py-1.5 text-sm text-gray-200 flex items-center justify-between transition group/btn"
      >
        <span class="type-name-display truncate">${escapeHtml(typeDef.name)}</span>
        <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#383838] text-gray-400 group-hover/btn:bg-primary-green group-hover/btn:text-white transition ml-2 flex-shrink-0">
          ${escapeHtml(typeDef.category)}
        </span>
      </button>
    </td>

    <!-- Options / Formula -->
    <td class="py-2 px-3 text-center">
      <input type="hidden" class="field-formula-input" value="${escapeHtml(formula)}" />
      <button 
        type="button" 
        class="btn-edit-formula px-2.5 py-1 rounded text-xs border transition flex items-center gap-1 mx-auto ${formula ? 'bg-primary-green/20 border-primary-green text-green-300' : 'bg-[#242424] border-[#4a4a4a] text-gray-400 hover:text-gray-200'}"
        title="${formula ? 'Formula: ' + escapeHtml(formula) : 'Add formula calculation'}"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
        <span>${formula ? 'Formula (fx)' : 'fx'}</span>
      </button>
    </td>

    <!-- Blank % -->
    <td class="py-2 px-3 text-center">
      <div class="inline-flex items-center gap-1">
        <input 
          type="number" 
          min="0" 
          max="100" 
          step="5" 
          value="${blank}" 
          class="field-blank-input w-14 bg-[#242424] border border-[#4a4a4a] focus:border-primary-green rounded px-1.5 py-1 text-xs text-center text-gray-200 font-mono"
        />
        <span class="text-xs text-gray-400">%</span>
      </div>
    </td>

    <!-- Actions (Delete) -->
    <td class="py-2 px-3 text-center">
      <button 
        type="button" 
        class="btn-delete-row text-gray-500 hover:text-red-400 p-1 rounded hover:bg-[#242424] transition"
        title="Remove field"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
      </button>
    </td>
  `;

  // Bind blur auto-fill on field name (TC-10)
  const nameInput = tr.querySelector('.field-name-input');
  nameInput.addEventListener('blur', (e) => {
    if (!e.target.value.trim()) {
      const idx = Array.from(document.querySelectorAll('.field-row')).indexOf(tr) + 1;
      e.target.value = `field_${idx > 0 ? idx : 1}`;
    }
  });

  // Bind row events
  const btnSelectType = tr.querySelector('.btn-select-type');
  btnSelectType.addEventListener('click', () => {
    activeFieldRowForModal = tr;
    openModal('type-modal');
    const searchInput = document.getElementById('type-search');
    if (searchInput) {
      searchInput.value = '';
      filterTypeCatalog('');
      setTimeout(() => searchInput.focus(), 50);
    }
  });

  const btnEditFormula = tr.querySelector('.btn-edit-formula');
  btnEditFormula.addEventListener('click', () => {
    activeRowFormulaField = tr;
    const nameVal = nameInput ? nameInput.value.trim() : 'Field';
    const formulaInput = tr.querySelector('.field-formula-input');
    const currentFormula = formulaInput ? formulaInput.value : '';

    const modalTitle = document.getElementById('formula-field-name');
    const textarea = document.getElementById('formula-editor-textarea');
    if (modalTitle) modalTitle.textContent = nameVal;
    if (textarea) textarea.value = currentFormula;

    populateFormulaChips();
    openModal('formula-modal');
    if (textarea) setTimeout(() => textarea.focus(), 50);
  });

  const btnDelete = tr.querySelector('.btn-delete-row');
  btnDelete.addEventListener('click', () => {
    tr.remove();
    updateEmptyState();
  });

  return tr;
}

/**
 * Loads a schema into the DOM table
 */
export function loadSchemaIntoDOM(fields) {
  const container = document.getElementById('fields-container');
  if (!container) return;
  container.innerHTML = '';

  if (Array.isArray(fields) && fields.length > 0) {
    fields.forEach(field => {
      const rowEl = createFieldRowElement(field);
      container.appendChild(rowEl);
    });
  }
  updateEmptyState();
}

/**
 * Populates chips in formula modal based on other fields
 */
function populateFormulaChips() {
  const chipsContainer = document.getElementById('formula-columns-chips');
  if (!chipsContainer) return;
  chipsContainer.innerHTML = '';

  const schema = getCurrentSchemaFromDOM();
  schema.forEach(f => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'px-2 py-1 bg-[#2b2b2b] hover:bg-[#444] border border-[#4a4a4a] text-green-400 font-mono text-xs rounded transition';
    chip.textContent = `record.${f.name}`;
    chip.addEventListener('click', () => {
      const textarea = document.getElementById('formula-editor-textarea');
      if (textarea) {
        textarea.value += (textarea.value.length ? ' + ' : '') + `record.${f.name}`;
        textarea.focus();
      }
    });
    chipsContainer.appendChild(chip);
  });
}

/**
 * Filter type catalog in Type Picker modal
 */
function filterTypeCatalog(query) {
  const cards = document.querySelectorAll('.type-card');
  const q = (query || '').toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const cat = (card.getAttribute('data-category') || '').toLowerCase();
    const desc = (card.getAttribute('data-desc') || '').toLowerCase();
    const key = (card.getAttribute('data-key') || '').toLowerCase();

    if (!q || name.includes(q) || cat.includes(q) || desc.includes(q) || key.includes(q)) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('type-results-count');
  if (countEl) countEl.textContent = `${visibleCount} types available`;
}

/**
 * Populates the Type Picker modal catalog
 */
function buildTypePickerModal() {
  const container = document.getElementById('type-catalog-container');
  if (!container) return;
  container.innerHTML = '';

  const categories = {};
  for (const [key, def] of Object.entries(DATA_TYPES)) {
    const cat = def.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ key, ...def });
  }

  for (const [catName, types] of Object.entries(categories)) {
    const catHeader = document.createElement('div');
    catHeader.className = 'col-span-full font-bold text-xs uppercase tracking-wider text-gray-400 border-b border-[#4a4a4a] pb-1 mt-3 mb-1 flex items-center justify-between';
    catHeader.innerHTML = `<span>${catName}</span> <span class="text-[10px] text-gray-500 font-normal">(${types.length} types)</span>`;
    container.appendChild(catHeader);

    types.forEach(t => {
      const card = document.createElement('div');
      card.className = 'type-card bg-[#2b2b2b] border border-[#4a4a4a] hover:border-primary-green hover:bg-[#333] p-2.5 rounded cursor-pointer transition flex flex-col justify-between group';
      card.setAttribute('data-key', t.key);
      card.setAttribute('data-name', t.name);
      card.setAttribute('data-category', catName);
      card.setAttribute('data-desc', t.description || '');

      card.innerHTML = `
        <div class="flex items-start justify-between gap-1 mb-1">
          <span class="font-semibold text-xs text-gray-100 group-hover:text-primary-green transition">${escapeHtml(t.name)}</span>
          <span class="text-[10px] font-mono text-gray-400 bg-[#222] px-1 rounded">${escapeHtml(t.key)}</span>
        </div>
        <p class="text-[11px] text-gray-400 line-clamp-2 leading-tight">${escapeHtml(t.description || '')}</p>
      `;

      card.addEventListener('click', () => {
        if (activeFieldRowForModal) {
          const typeInput = activeFieldRowForModal.querySelector('.field-type-input');
          const typeDisplay = activeFieldRowForModal.querySelector('.type-name-display');
          if (typeInput) typeInput.value = t.key;
          if (typeDisplay) typeDisplay.textContent = t.name;

          const catBadge = activeFieldRowForModal.querySelector('.btn-select-type span:last-child');
          if (catBadge) catBadge.textContent = catName;
        }
        closeModal('type-modal');
      });

      container.appendChild(card);
    });
  }
}

/**
 * Builds the Presets Modal list
 */
function buildPresetsModal() {
  const container = document.getElementById('presets-list-container');
  if (!container) return;
  container.innerHTML = '';

  const schemas = getStoredSchemas();

  for (const [id, preset] of Object.entries(schemas)) {
    const card = document.createElement('div');
    card.className = 'bg-[#2b2b2b] border border-[#4a4a4a] hover:border-primary-green p-3 rounded transition flex items-center justify-between group';
    card.innerHTML = `
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-sm text-gray-100 group-hover:text-primary-green transition">${escapeHtml(preset.name)}</span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#222] text-gray-400">${escapeHtml(id)}</span>
          ${DEFAULT_PRESETS[id] ? '<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-green-300">Preset</span>' : '<span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-300">Custom</span>'}
        </div>
        <p class="text-xs text-gray-400 mt-0.5">${escapeHtml(preset.description || '')}</p>
        <span class="text-[11px] text-gray-500 mt-1 inline-block">${preset.fields ? preset.fields.length : 0} fields configured</span>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="btn-load-preset px-3 py-1.5 bg-primary-green hover:bg-primary-green-hover text-white rounded text-xs font-semibold transition">
          Load Schema
        </button>
        ${!DEFAULT_PRESETS[id] ? `
          <button type="button" class="btn-delete-preset p-1.5 text-gray-500 hover:text-red-400 rounded transition" title="Delete custom schema">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        ` : ''}
      </div>
    `;

    card.querySelector('.btn-load-preset').addEventListener('click', () => {
      loadSchemaIntoDOM(preset.fields);
      const titleSpan = document.getElementById('active-preset-name');
      if (titleSpan) titleSpan.textContent = preset.name;
      closeModal('presets-modal');
    });

    const btnDelete = card.querySelector('.btn-delete-preset');
    if (btnDelete) {
      btnDelete.addEventListener('click', () => {
        if (confirm(`Delete schema "${preset.name}"?`)) {
          deleteSchema(id);
          buildPresetsModal();
        }
      });
    }

    container.appendChild(card);
  }
}

/**
 * Builds the WebMCP Inspector tools list
 */
function buildWebMcpInspector() {
  const container = document.getElementById('webmcp-tools-list');
  if (!container) return;
  container.innerHTML = '';

  const tools = document.modelContext ? document.modelContext.getTools() : [];

  tools.forEach(tool => {
    const div = document.createElement('div');
    div.className = 'bg-[#2b2b2b] border border-[#4a4a4a] p-3 rounded transition';
    div.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="font-mono font-bold text-sm text-purple-400">${escapeHtml(tool.name)}</span>
          <span class="text-[10px] bg-purple-950 text-purple-300 font-mono px-1.5 py-0.5 rounded border border-purple-800">tool</span>
        </div>
        <button type="button" class="btn-try-tool px-2 py-1 bg-[#383838] hover:bg-[#444] text-xs font-mono text-gray-200 rounded transition border border-[#555]">
          Try in Runner &rarr;
        </button>
      </div>
      <p class="text-xs text-gray-300 mt-1">${escapeHtml(tool.description || '')}</p>
    `;

    div.querySelector('.btn-try-tool').addEventListener('click', () => {
      const select = document.getElementById('runner-tool-select');
      const paramsInput = document.getElementById('runner-tool-params');
      if (select) {
        select.value = tool.name;
        let defaultParams = '{}';
        if (tool.name === 'generate_data') {
          defaultParams = JSON.stringify({ count: 3, format: 'json', fields: [{ name: 'id', type: 'uuid_v4' }, { name: 'name', type: 'full_name' }] }, null, 2);
        } else if (tool.name === 'add_field_to_ui') {
          defaultParams = JSON.stringify({ name: 'salary', type: 'integer' }, null, 2);
        } else if (tool.name === 'load_schema_in_ui') {
          defaultParams = JSON.stringify({ schema_name: 'ecommerce' }, null, 2);
        }
        if (paramsInput) paramsInput.value = defaultParams;
      }
    });

    container.appendChild(div);
  });

  const runnerSelect = document.getElementById('runner-tool-select');
  if (runnerSelect) {
    runnerSelect.innerHTML = tools.map(t => `<option value="${t.name}">${t.name}</option>`).join('');
  }
}

/**
 * Registers WebMCP tools for AI agents with defensive error handling (TC-16, TC-17, TC-18)
 */
function registerWebMcpTools() {
  const { registerTool } = FastWebMcp;

  // Tool 1: get_data_types
  registerTool({
    name: 'get_data_types',
    description: 'Returns all 69 realistic data generator types categorized with descriptions and examples.',
    inputSchema: z.object({
      category: z.string().optional()
    }),
    execute: async ({ category }) => {
      const results = [];
      for (const [key, def] of Object.entries(DATA_TYPES)) {
        if (!category || def.category.toLowerCase() === category.toLowerCase()) {
          results.push({ key, name: def.name, category: def.category, description: def.description });
        }
      }
      return { total: results.length, types: results };
    }
  });

  // Tool 2: list_schemas
  registerTool({
    name: 'list_schemas',
    description: 'Lists all available schema presets (users, ecommerce, transactions, employees, telemetry) and custom saved schemas in localStorage.',
    inputSchema: z.object({}),
    execute: async () => {
      return getStoredSchemas();
    }
  });

  // Tool 3: generate_data (Defensive TC-17)
  registerTool({
    name: 'generate_data',
    description: 'Generates synthetic records directly in browser memory. Supports count (1-10000) and custom fields or presets.',
    inputSchema: z.object({
      count: z.number().min(1).max(10000).default(5),
      format: z.enum(['json', 'csv']).default('json'),
      preset: z.string().optional(),
      fields: z.array(z.object({
        name: z.string().optional().default(''),
        type: z.string().optional().default('first_name'),
        blank: z.number().optional(),
        formula: z.string().optional()
      })).optional()
    }),
    execute: async ({ count = 5, format = 'json', preset, fields }) => {
      try {
        const clampedCount = sanitizeRowCount(count);
        let schemaToUse = fields;

        if (!schemaToUse || !schemaToUse.length) {
          if (preset) {
            const schemas = getStoredSchemas();
            const p = schemas[preset] || DEFAULT_PRESETS[preset];
            if (!p) {
              return {
                success: false,
                error: `Preset "${preset}" not found. Available presets: ${Object.keys(DEFAULT_PRESETS).join(', ')}`
              };
            }
            if (p && p.fields) schemaToUse = p.fields;
          }
          if (!schemaToUse || !schemaToUse.length) {
            schemaToUse = getCurrentSchemaFromDOM();
          }
        }

        if (!schemaToUse || !schemaToUse.length) {
          return {
            success: false,
            error: "No fields defined in schema. Provide a fields array or load a preset."
          };
        }

        // TC-17: Track any unknown types to report clearly in warning
        const unknownTypes = [];
        schemaToUse.forEach(f => {
          if (f.type && !DATA_TYPES[f.type] && f.type !== 'formula') {
            unknownTypes.push(f.type);
          }
        });

        const sanitizedSchema = sanitizeSchemaFields(schemaToUse);
        const records = generateDataset(sanitizedSchema, clampedCount);

        if (format === 'csv') {
          return toCSV(records, sanitizedSchema);
        }

        return {
          success: true,
          count: records.length,
          warnings: unknownTypes.length ? `Unknown types fallback used: ${unknownTypes.join(', ')}` : undefined,
          data: records
        };
      } catch (err) {
        return {
          success: false,
          error: `Execution error in generate_data: ${err.message}`
        };
      }
    }
  });

  // Tool 4: load_schema_in_ui (Defensive TC-18)
  registerTool({
    name: 'load_schema_in_ui',
    description: 'Replaces the currently visible schema in the user interface with a specified preset or custom schema.',
    inputSchema: z.object({
      schema_name: z.string().describe('Name or ID of the preset: users, ecommerce, transactions, employees, telemetry')
    }),
    execute: async ({ schema_name }) => {
      try {
        if (!schema_name || typeof schema_name !== 'string') {
          return { success: false, error: "schema_name parameter is required." };
        }
        const schemas = getStoredSchemas();
        const s = schemas[schema_name] || DEFAULT_PRESETS[schema_name];
        if (!s || !s.fields || !s.fields.length) {
          return {
            success: false,
            error: `Schema or preset "${schema_name}" not found. Available schemas: ${Object.keys(schemas).join(', ')}`
          };
        }
        loadSchemaIntoDOM(s.fields);
        const titleSpan = document.getElementById('active-preset-name');
        if (titleSpan) titleSpan.textContent = s.name;
        return { success: true, loaded_schema: schema_name, fields_count: s.fields.length };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  });

  // Tool 5: add_field_to_ui (Defensive TC-10, TC-17)
  registerTool({
    name: 'add_field_to_ui',
    description: 'Dynamically adds a new column/field row to the table in the user interface.',
    inputSchema: z.object({
      name: z.string().optional().default('').describe('Column/field name (e.g. status, score, user_id)'),
      type: z.string().optional().default('first_name').describe('Data generator type key (e.g. email, uuid_v4, integer, price, date_past)'),
      blank: z.number().min(0).max(100).optional().default(0),
      formula: z.string().optional()
    }),
    execute: async ({ name = '', type = 'first_name', blank = 0, formula = '' }) => {
      try {
        const container = document.getElementById('fields-container');
        if (!container) {
          return { success: false, error: "Fields container not found in DOM." };
        }

        let trimmedName = (name || '').trim();
        if (!trimmedName) {
          const currentCount = container.querySelectorAll('.field-row').length;
          trimmedName = `field_${currentCount + 1}`;
        }

        const effectiveType = DATA_TYPES[type] ? type : 'first_name';
        const row = createFieldRowElement({ name: trimmedName, type: effectiveType, blank, formula });
        container.appendChild(row);
        updateEmptyState();

        return {
          success: true,
          added_field: { name: trimmedName, type: effectiveType, blank, formula },
          warning: !DATA_TYPES[type] ? `Type "${type}" unknown; defaulted to "first_name"` : undefined
        };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
  });

  // Tool 6: preview_mock_data (Defensive TC-09)
  registerTool({
    name: 'preview_mock_data',
    description: 'Generates 10 sample records and opens the Preview modal in the user interface.',
    inputSchema: z.object({}),
    execute: async () => {
      const schema = getCurrentSchemaFromDOM();
      if (!schema || schema.length === 0) {
        return {
          success: false,
          error: "Cannot preview mock data with 0 schema columns. Add columns first."
        };
      }
      const records = generateDataset(schema, 10);
      renderPreviewModal(records, schema);
      openModal('preview-modal');
      return { success: true, sample_records: records };
    }
  });

  console.log('[WebMCP] Static client tools successfully registered!');
}

/**
 * Renders Preview Modal content safely (TC-09, TC-12)
 */
function renderPreviewModal(records, schema) {
  const container = document.getElementById('preview-table-container');
  const countSpan = document.getElementById('preview-record-count');
  const jsonContainer = document.getElementById('preview-raw-json');
  if (!container) return;

  const safeRecords = Array.isArray(records) ? records : [];
  if (countSpan) countSpan.textContent = `${safeRecords.length} records generated`;
  if (jsonContainer) jsonContainer.textContent = JSON.stringify(safeRecords, null, 2);

  const fieldNames = (schema || []).map(f => f.name).filter(Boolean);

  if (safeRecords.length === 0 || fieldNames.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-gray-400 bg-[#242424]">
        <p class="font-semibold text-sm text-yellow-500">⚠️ No hay datos para previsualizar</p>
        <p class="text-xs text-gray-400 mt-1">El esquema no contiene campos válidos o no se generaron registros.</p>
      </div>
    `;
    return;
  }

  let html = `
    <table class="w-full text-left text-xs border-collapse">
      <thead class="bg-[#242424] text-gray-300 uppercase tracking-wider font-mono sticky top-0 border-b border-[#4a4a4a]">
        <tr>
          <th class="py-2.5 px-3 border-r border-[#383838] w-12 text-center text-gray-500">#</th>
          ${fieldNames.map(f => `<th class="py-2.5 px-3 border-r border-[#383838] whitespace-nowrap">${escapeHtml(f)}</th>`).join('')}
        </tr>
      </thead>
      <tbody class="divide-y divide-[#383838] font-mono text-gray-200">
  `;

  safeRecords.forEach((row, i) => {
    html += `<tr class="hover:bg-[#333] transition-colors">`;
    html += `<td class="py-2 px-3 text-center text-gray-500 border-r border-[#383838]">${i + 1}</td>`;
    fieldNames.forEach(col => {
      const val = row ? row[col] : null;
      let displayVal = val === null ? '<span class="text-gray-500 italic">null</span>' : escapeHtml(String(val));
      if (typeof val === 'string' && val.startsWith('[Error')) {
        displayVal = `<span class="text-red-400 font-bold">${escapeHtml(val)}</span>`;
      }
      html += `<td class="py-2 px-3 border-r border-[#383838] max-w-[200px] truncate" title="${escapeHtml(String(val ?? ''))}">${displayVal}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

/**
 * Triggers browser download of a generated blob with validation (TC-06, TC-07, TC-08, TC-09)
 */
export function downloadDataset() {
  const schema = getCurrentSchemaFromDOM();
  if (!schema || schema.length === 0) {
    alert('⚠️ Error de esquema: Agregue al menos una columna antes de generar y descargar datos.');
    return;
  }

  const countInput = document.getElementById('num_records');
  const count = sanitizeRowCount(countInput ? countInput.value : 100);
  if (countInput) countInput.value = count;

  const formatSelect = document.getElementById('format_type');
  const format = formatSelect ? formatSelect.value : 'csv';

  // Read format-specific options
  const delimiter = document.getElementById('csv_delimiter')?.value || ',';
  const includeHeader = document.getElementById('csv_header')?.checked ?? true;
  const includeBOM = document.getElementById('csv_bom')?.checked ?? false;
  const minifyJSON = document.getElementById('json_minify')?.checked ?? false;
  const sqlTable = document.getElementById('sql_table_name')?.value || 'mock_data';
  const sqlDialect = document.getElementById('sql_dialect')?.value || 'postgres';

  const btn = document.getElementById('btn-download');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...`;
  }

  setTimeout(() => {
    try {
      const records = generateDataset(schema, count);
      let blob;
      let filename = `mock_data_${Date.now()}`;

      if (format === 'csv') {
        const text = toCSV(records, schema, { delimiter, header: includeHeader, bom: includeBOM });
        blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
        filename += '.csv';
      } else if (format === 'json') {
        const text = toJSON(records, { minify: minifyJSON });
        blob = new Blob([text], { type: 'application/json;charset=utf-8;' });
        filename += '.json';
      } else if (format === 'sql') {
        const text = toSQL(records, schema, { tableName: sqlTable, dialect: sqlDialect });
        blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
        filename += '.sql';
      } else if (format === 'excel') {
        const buffer = toExcel(records, schema);
        blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        filename += '.xlsx';
      }

      // Trigger automatic browser download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Error generating dataset: ${err.message}`);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  }, 20);
}

// Global modal helpers
window.openModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('hidden');
};

window.closeModal = function(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('hidden');
};

// Main DOM initialization
document.addEventListener('DOMContentLoaded', () => {
  // 1. Build Type Picker catalog
  buildTypePickerModal();

  // 2. Setup Type Search filter
  const typeSearch = document.getElementById('type-search');
  if (typeSearch) {
    typeSearch.addEventListener('input', (e) => filterTypeCatalog(e.target.value));
  }

  // 3. Setup initial schema rows (load users preset)
  const initialSchema = DEFAULT_PRESETS.users.fields;
  loadSchemaIntoDOM(initialSchema);

  // 4. Setup SortableJS for drag-and-drop
  const fieldsContainer = document.getElementById('fields-container');
  if (fieldsContainer && window.Sortable) {
    new window.Sortable(fieldsContainer, {
      handle: '.drag-handle',
      animation: 150,
      ghostClass: 'bg-[#404040]',
      onEnd: () => updateEmptyState()
    });
  }

  // 5. Setup Add Field Button (TC-09)
  const btnAddField = document.getElementById('btn-add-field');
  if (btnAddField) {
    btnAddField.addEventListener('click', () => {
      const currentRowsCount = document.querySelectorAll('.field-row').length;
      const row = createFieldRowElement({
        name: 'field_' + (currentRowsCount + 1),
        type: 'first_name',
        blank: 0
      });
      fieldsContainer.appendChild(row);
      updateEmptyState();
    });
  }

  // 6. Setup Formula Save Button (TC-14, TC-15)
  const btnSaveFormula = document.getElementById('btn-save-formula');
  if (btnSaveFormula) {
    btnSaveFormula.addEventListener('click', () => {
      if (activeRowFormulaField) {
        const textarea = document.getElementById('formula-editor-textarea');
        const formulaVal = textarea ? textarea.value.trim() : '';
        const hiddenInput = activeRowFormulaField.querySelector('.field-formula-input');
        const formulaBtn = activeRowFormulaField.querySelector('.btn-edit-formula');

        if (hiddenInput) hiddenInput.value = formulaVal;
        if (formulaBtn) {
          if (formulaVal) {
            formulaBtn.className = 'btn-edit-formula px-2.5 py-1 rounded text-xs border transition flex items-center gap-1 mx-auto bg-primary-green/20 border-primary-green text-green-300';
            formulaBtn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg><span>Formula (fx)</span>`;
          } else {
            formulaBtn.className = 'btn-edit-formula px-2.5 py-1 rounded text-xs border transition flex items-center gap-1 mx-auto bg-[#242424] border-[#4a4a4a] text-gray-400 hover:text-gray-200';
            formulaBtn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg><span>fx</span>`;
          }
        }
      }
      closeModal('formula-modal');
    });
  }

  // 7. Setup Preview Button (TC-09)
  const btnPreview = document.getElementById('btn-preview');
  if (btnPreview) {
    btnPreview.addEventListener('click', () => {
      const schema = getCurrentSchemaFromDOM();
      if (!schema || schema.length === 0) {
        alert('⚠️ Error de esquema: Agregue al menos una columna antes de previsualizar datos.');
        return;
      }
      const records = generateDataset(schema, 10);
      renderPreviewModal(records, schema);
      openModal('preview-modal');
    });
  }

  // 8. Setup Row Count Constraints (TC-06, TC-07, TC-08)
  const countInput = document.getElementById('num_records');
  if (countInput) {
    countInput.addEventListener('blur', (e) => {
      e.target.value = sanitizeRowCount(e.target.value);
    });
    countInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val > 10000) {
        e.target.value = 10000;
      }
    });
  }

  // 9. Setup Format Toggle (Show CSV/SQL/JSON options)
  const formatSelect = document.getElementById('format_type');
  if (formatSelect) {
    formatSelect.addEventListener('change', (e) => {
      const fmt = e.target.value;
      const csvOpts = document.getElementById('csv-options');
      const jsonOpts = document.getElementById('json-options');
      const sqlOpts = document.getElementById('sql-options');

      if (csvOpts) csvOpts.style.display = fmt === 'csv' ? 'flex' : 'none';
      if (jsonOpts) jsonOpts.style.display = fmt === 'json' ? 'flex' : 'none';
      if (sqlOpts) sqlOpts.style.display = fmt === 'sql' ? 'flex' : 'none';
    });
  }

  // 10. Setup Download Dataset Button & Form Submit
  const btnDownload = document.getElementById('btn-download');
  if (btnDownload) {
    btnDownload.addEventListener('click', (e) => {
      e.preventDefault();
      downloadDataset();
    });
  }
  const form = document.getElementById('schema-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      downloadDataset();
    });
  }

  // 11. Setup Presets modal trigger
  const btnOpenPresets = document.getElementById('btn-open-presets');
  if (btnOpenPresets) {
    btnOpenPresets.addEventListener('click', () => {
      buildPresetsModal();
      openModal('presets-modal');
    });
  }

  // 12. Save Schema button in Presets modal
  const btnSaveSchema = document.getElementById('btn-save-current-schema');
  if (btnSaveSchema) {
    btnSaveSchema.addEventListener('click', () => {
      const schema = getCurrentSchemaFromDOM();
      if (!schema || schema.length === 0) {
        alert('⚠️ No hay columnas configuradas para guardar.');
        return;
      }
      const name = prompt('Enter a name for this custom schema:');
      if (!name || !name.trim()) return;
      const id = 'custom_' + Date.now();
      saveSchema(id, {
        id,
        name: name.trim(),
        description: 'User saved custom schema',
        fields: schema
      });
      buildPresetsModal();
      alert(`Schema "${name}" saved to localStorage!`);
    });
  }

  // 13. Export & Import JSON schemas
  const btnExport = document.getElementById('btn-export-schemas');
  if (btnExport) {
    btnExport.addEventListener('click', () => {
      const json = exportSchemasJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mockaroo_schemas_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(a);
    });
  }

  const btnImport = document.getElementById('btn-import-schemas');
  const fileImport = document.getElementById('file-import-schemas');
  if (btnImport && fileImport) {
    btnImport.addEventListener('click', () => fileImport.click());
    fileImport.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          importSchemasJSON(evt.target.result);
          buildPresetsModal();
          alert('Schemas imported successfully!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    });
  }

  // 14. Setup WebMCP Tools & Inspector
  registerWebMcpTools();

  const btnOpenWebMcp = document.getElementById('btn-open-webmcp');
  if (btnOpenWebMcp) {
    btnOpenWebMcp.addEventListener('click', () => {
      buildWebMcpInspector();
      openModal('webmcp-modal');
    });
  }

  // 15. Setup WebMCP Runner button inside inspector
  const btnExecuteTool = document.getElementById('btn-execute-runner-tool');
  if (btnExecuteTool) {
    btnExecuteTool.addEventListener('click', async () => {
      const select = document.getElementById('runner-tool-select');
      const paramsText = document.getElementById('runner-tool-params');
      const outputEl = document.getElementById('runner-tool-output');
      if (!select || !paramsText || !outputEl) return;

      const toolName = select.value;
      let params = {};
      try {
        if (paramsText.value.trim()) {
          params = JSON.parse(paramsText.value);
        }
      } catch (err) {
        outputEl.textContent = `JSON Parse Error: ${err.message}`;
        return;
      }

      outputEl.textContent = 'Executing tool...';
      try {
        const result = await document.modelContext.executeTool(toolName, params);
        outputEl.textContent = JSON.stringify(result, null, 2);
      } catch (err) {
        outputEl.textContent = `Execution Error: ${err.message}`;
      }
    });
  }

  console.log('[Mockaroo Static] Initialized 100% in-browser with WebMCP!');
});
