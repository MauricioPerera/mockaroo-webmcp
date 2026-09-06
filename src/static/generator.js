import { DATA_TYPES } from './dataTypes';
import { faker } from '@faker-js/faker';
import { sanitizeSchemaFields } from './formatters';

/**
 * Generate a single record based on schema
 */
export function generateRecord(schema, rowIndex) {
  const record = {};
  const deferredFormulas = [];

  // Pass 1: generate all non-formula fields
  for (let i = 0; i < schema.length; i++) {
    const field = schema[i];
    if (!field) continue;

    // Defensively ensure field always has a name (SC-02)
    let fieldName = (field.name ? String(field.name) : '').trim();
    if (!fieldName) {
      fieldName = `field_${i + 1}`;
    }

    const blankPct = parseFloat(field.blank || 0);
    const isBlank = blankPct > 0 && Math.random() * 100 < blankPct;

    if (isBlank) {
      record[fieldName] = null;
      continue;
    }

    // Fallback defensively if type is unknown (TC-17)
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

  // Pass 2: evaluate formulas with full record context (TC-14, TC-15)
  for (const field of deferredFormulas) {
    const expr = (field.formula || (field.options && field.options.formula) || '').trim();
    if (!expr) {
      record[field.name] = null;
      continue;
    }

    // Isolate compilation (SyntaxError) and execution (TypeError / ReferenceError)
    try {
      let fn;
      try {
        fn = new Function('record', 'faker', 'rowIndex', `
          "use strict";
          const self = record;
          try {
            return (${expr});
          } catch (runtimeErr) {
            return "[Error fx: " + runtimeErr.message + "]";
          }
        `);
      } catch (syntaxErr) {
        record[field.name] = `[Error sintaxis fx: ${syntaxErr.message}]`;
        continue;
      }

      const result = fn(record, faker, rowIndex);
      record[field.name] = result !== undefined ? result : null;
    } catch (outerErr) {
      record[field.name] = `[Error fx: ${outerErr.message}]`;
    }
  }

  return record;
}

/**
 * Generate N records synchronously in memory (strictly clamped 1 to 10,000) (TC-06, TC-07, TC-08, TC-10, TC-11)
 */
export function generateDataset(schema, count = 10) {
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
