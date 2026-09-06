// WebMCP Integration for Mockaroo Local
(function() {
  // 1. Polyfill/shim document.modelContext if not natively present
  if (typeof document !== 'undefined') {
    if (!document.modelContext) {
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
  }

  // Ensure window.webmcp helper is globally accessible
  window.webmcp = {
    getTools() {
      return document.modelContext.getTools();
    },
    async invoke(name, args = {}) {
      return document.modelContext.executeTool(name, args);
    }
  };

  // Wait for FastWebMcp and Zod to load
  function initWebMcpTools() {
    if (!window.FastWebMcp || !window.z) {
      setTimeout(initWebMcpTools, 100);
      return;
    }

    const { registerTool, defineDeclarativeTool } = window.FastWebMcp;
    const { z } = window;

    // --- TOOL 1: get_data_types ---
    registerTool({
      name: 'get_data_types',
      description: 'Returns all available realistic data generator types (+65 types) with categories and descriptions.',
      inputSchema: z.object({
        category: z.string().optional()
      }),
      execute: async ({ category }) => {
        const cards = document.querySelectorAll('.type-card');
        const types = [];
        cards.forEach(c => {
          const name = c.getAttribute('data-name');
          const cat = c.getAttribute('data-category');
          const desc = c.getAttribute('data-desc');
          const key = c.querySelector('span.font-mono')?.innerText;
          if (!category || cat.toLowerCase() === category.toLowerCase()) {
            types.push({ key, name, category: cat, description: desc });
          }
        });
        return { count: types.length, types };
      }
    });

    // --- TOOL 2: list_schemas ---
    registerTool({
      name: 'list_schemas',
      description: 'Lists all available schema templates (users, ecommerce, transactions, employees, telemetry) and custom saved schemas.',
      inputSchema: z.object({}),
      execute: async () => {
        const res = await fetch('/schemas');
        const data = await res.json();
        return data;
      }
    });

    // --- TOOL 3: generate_data ---
    registerTool({
      name: 'generate_data',
      description: 'Generates synthetic mock data using a preset name (users, ecommerce, transactions, employees, telemetry) or custom field parameters.',
      inputSchema: z.object({
        preset: z.string().default('users'),
        count: z.number().min(1).max(5000).default(10),
        format: z.enum(['json', 'csv']).default('json')
      }),
      execute: async ({ preset, count, format }) => {
        const res = await fetch(`/api/mock/${encodeURIComponent(preset)}?count=${count}&format=${format}`);
        if (!res.ok) {
          throw new Error(`Failed to generate data for preset "${preset}": ${res.statusText}`);
        }
        if (format === 'json') {
          return await res.json();
        }
        return await res.text();
      }
    });

    // --- TOOL 4: load_schema_in_ui ---
    registerTool({
      name: 'load_schema_in_ui',
      description: 'Loads a schema preset into the active browser page so the user sees the fields on screen.',
      inputSchema: z.object({
        schemaId: z.string()
      }),
      execute: async ({ schemaId }) => {
        window.location.href = `/preset/${encodeURIComponent(schemaId)}`;
        return { status: 'loading', schemaId };
      }
    });

    // --- TOOL 5: add_field_to_ui ---
    registerTool({
      name: 'add_field_to_ui',
      description: 'Adds a new column field to the active schema table in the browser UI.',
      inputSchema: z.object({
        name: z.string(),
        type: z.string().default('row_number'),
        blank: z.number().min(0).max(100).default(0),
        formula: z.string().optional()
      }),
      execute: async ({ name, type, blank, formula }) => {
        // Trigger HTMX add
        const addBtn = document.getElementById('btn-add-field-top');
        if (addBtn) {
          addBtn.click();
          // Wait for DOM swap
          await new Promise(r => setTimeout(r, 200));
          const rows = document.querySelectorAll('.field-row');
          const lastRow = rows[rows.length - 1];
          if (lastRow) {
            const nameInput = lastRow.querySelector('.field-name-input');
            const typeInput = lastRow.querySelector('.field-type-input');
            const typeBtn = lastRow.querySelector('.field-type-btn');
            const blankInput = lastRow.querySelector('input[name="field_blank[]"]');
            const formulaInput = lastRow.querySelector('.field-formula-input');

            if (nameInput) nameInput.value = name;
            if (typeInput) typeInput.value = type;
            if (typeBtn) typeBtn.querySelector('span').innerText = type;
            if (blankInput) blankInput.value = blank || 0;
            if (formulaInput && formula) formulaInput.value = formula;
          }
          return { success: true, addedField: { name, type, blank, formula } };
        }
        return { success: false, error: 'Could not find Add Field button' };
      }
    });

    // --- TOOL 6: preview_mock_data ---
    registerTool({
      name: 'preview_mock_data',
      description: 'Opens the live data preview table in the UI and returns sample generated rows.',
      inputSchema: z.object({}),
      execute: async () => {
        const previewBtn = document.getElementById('btn-preview');
        if (previewBtn) {
          previewBtn.click();
          return { status: 'preview_opened' };
        }
        return { status: 'error', message: 'Preview button not found' };
      }
    });

    // --- Declarative WebMCP Tool on the main Form ---
    const form = document.getElementById('schema-form');
    if (form && defineDeclarativeTool) {
      try {
        defineDeclarativeTool(form, {
          name: 'generate_mock_dataset',
          description: 'Generates synthetic mock data according to the configured fields and options.',
          autoSubmit: false,
          fields: [
            { name: 'num_rows', description: 'Number of rows to generate (1 to 200,000)' },
            { name: 'file_format', description: 'File format to export: csv, json, sql, excel' },
            { name: 'csv_delimiter', description: 'Delimiter character for CSV export (comma, semicolon, tab, pipe)' }
          ]
        });
        console.log('[WebMCP] Declarative tool configured on #schema-form');
      } catch (e) {
        console.warn('[WebMCP] Declarative setup warning:', e.message);
      }
    }

    // Update WebMCP Status badge in header if present
    const badge = document.getElementById('webmcp-badge');
    if (badge) {
      badge.classList.remove('opacity-50');
      badge.classList.add('bg-emerald-800', 'text-green-300');
    }

    console.log(`[WebMCP] Ready! Registered ${document.modelContext.getTools().length} tools for AI Agents.`);
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMcpTools);
  } else {
    initWebMcpTools();
  }
})();
