const { DATA_TYPES } = require('./dataTypes');
const { faker } = require('@faker-js/faker');

/**
 * Generate a single record based on schema
 */
function generateRecord(schema, rowIndex) {
  const record = {};
  const deferredFormulas = [];

  // Pass 1: generate all non-formula fields
  for (let i = 0; i < schema.length; i++) {
    const field = schema[i];
    if (!field) continue;

    let fieldName = (field.name ? String(field.name) : '').trim();
    if (!fieldName) {
      fieldName = `field_${i + 1}`;
    }

    // TC-UI-03: Strictly clamp blank percentage between 0 and 100
    const blankPct = Math.min(Math.max(parseFloat(field.blank || 0) || 0, 0), 100);
    const isBlank = blankPct > 0 && Math.random() * 100 < blankPct;

    if (isBlank) {
      record[fieldName] = null;
      continue;
    }

    const typeDef = DATA_TYPES[field.type] || DATA_TYPES.row_number || {
      generate: () => `[Unknown type: ${field.type}]`
    };

    if (field.type === 'formula' || (field.formula && field.formula.trim())) {
      deferredFormulas.push({ ...field, name: fieldName });
    } else {
      try {
        record[fieldName] = typeDef.generate(field.options || {}, { rowIndex, record });
      } catch (err) {
        record[fieldName] = null;
      }
    }
  }

  // Pass 2: evaluate formulas with full record context (TC-14, TC-15, TC-UI-04)
  for (const field of deferredFormulas) {
    const expr = (field.formula || (field.options && field.options.formula) || '').trim();
    if (!expr) {
      record[field.name] = null;
      continue;
    }

    // Isolate compilation (SyntaxError) and execution (TypeError / ReferenceError) per cell
    try {
      let fn;
      try {
        let fnBody;
        if (expr.includes('return ') || expr.includes(';') || expr.includes('const ') || expr.includes('let ') || expr.includes('var ')) {
          fnBody = `
            "use strict";
            const self = record;
            try {
              ${expr}
            } catch (runtimeErr) {
              return "[Error fx: " + (runtimeErr ? runtimeErr.message : String(runtimeErr)) + "]";
            }
          `;
        } else {
          fnBody = `
            "use strict";
            const self = record;
            try {
              return (${expr});
            } catch (runtimeErr) {
              return "[Error fx: " + (runtimeErr ? runtimeErr.message : String(runtimeErr)) + "]";
            }
          `;
        }
        fn = new Function('record', 'faker', 'rowIndex', fnBody);
      } catch (syntaxErr) {
        record[field.name] = `[Error sintaxis fx: ${syntaxErr.message}]`;
        continue;
      }

      let result;
      try {
        result = fn.call(record, record, faker, rowIndex);
        if (typeof result === 'function') {
          result = result.call(record, record);
        }
      } catch (execErr) {
        result = `[Error fx: ${execErr ? execErr.message : String(execErr)}]`;
      }

      record[field.name] = result !== undefined ? result : null;
    } catch (outerErr) {
      record[field.name] = `[Error fx: ${outerErr ? outerErr.message : String(outerErr)}]`;
    }
  }

  return record;
}

const { sanitizeSchemaFields } = require('./formatters');

/**
 * Generate N records synchronously in memory (clamped 1-10000)
 */
function generateDataset(schema, count = 10) {
  if (!schema || !Array.isArray(schema) || schema.length === 0) {
    return [];
  }
  const sanitizedSchema = sanitizeSchemaFields(schema);
  const parsed = parseInt(count, 10);
  const numRows = Math.min(Math.max(isNaN(parsed) ? 10 : parsed, 1), 10000);
  const data = [];
  for (let i = 1; i <= numRows; i++) {
    data.push(generateRecord(sanitizedSchema, i));
  }
  return data;
}

/**
 * Generator function yielding records one by one
 */
function* recordStream(schema, count = 1000) {
  const parsed = parseInt(count, 10);
  const numRows = Math.min(Math.max(isNaN(parsed) ? 10 : parsed, 1), 50000);
  for (let i = 1; i <= numRows; i++) {
    yield generateRecord(schema, i);
  }
}

module.exports = {
  generateRecord,
  generateDataset,
  recordStream
};
