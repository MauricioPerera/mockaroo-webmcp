import { DATA_TYPES } from './dataTypes';
import { faker } from '@faker-js/faker';

/**
 * Generate a single record based on schema
 */
export function generateRecord(schema, rowIndex) {
  const record = {};
  const deferredFormulas = [];

  // Pass 1: generate all non-formula fields
  for (const field of schema) {
    if (!field.name) continue;

    const blankPct = parseFloat(field.blank || 0);
    const isBlank = blankPct > 0 && Math.random() * 100 < blankPct;

    if (isBlank) {
      record[field.name] = null;
      continue;
    }

    const typeDef = DATA_TYPES[field.type] || DATA_TYPES.row_number;

    if (field.type === 'formula' || (field.formula && field.formula.trim())) {
      deferredFormulas.push(field);
    } else {
      try {
        record[field.name] = typeDef.generate(field.options || {}, { rowIndex, record });
      } catch (err) {
        record[field.name] = null;
      }
    }
  }

  // Pass 2: evaluate formulas with full record context
  for (const field of deferredFormulas) {
    const expr = (field.formula || (field.options && field.options.formula) || '').trim();
    if (!expr) {
      record[field.name] = null;
      continue;
    }

    try {
      // Evaluate in safe functional sandbox
      const fn = new Function('record', 'faker', 'rowIndex', `
        const self = record;
        try {
          return (${expr});
        } catch(e) {
          return "ERR: " + e.message;
        }
      `);
      record[field.name] = fn(record, faker, rowIndex);
    } catch (err) {
      record[field.name] = `ERR: ${err.message}`;
    }
  }

  return record;
}

/**
 * Generate N records synchronously in memory
 */
export function generateDataset(schema, count = 10) {
  const numRows = Math.min(Math.max(parseInt(count, 10) || 10, 1), 50000);
  const data = [];
  for (let i = 1; i <= numRows; i++) {
    data.push(generateRecord(schema, i));
  }
  return data;
}
