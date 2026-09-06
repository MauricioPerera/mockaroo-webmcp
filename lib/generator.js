const { DATA_TYPES } = require('./dataTypes');
const { faker } = require('@faker-js/faker');

/**
 * Generate a single record based on schema
 */
function generateRecord(schema, rowIndex) {
  const record = {};
  const deferredFormulas = [];

  // Pass 1: generate all non-formula fields
  for (const field of schema) {
    if (!field || !field.name) continue;

    const blankPct = parseFloat(field.blank || 0);
    const isBlank = blankPct > 0 && Math.random() * 100 < blankPct;

    if (isBlank) {
      record[field.name] = null;
      continue;
    }

    const typeDef = DATA_TYPES[field.type] || DATA_TYPES.row_number || {
      generate: () => `[Unknown type: ${field.type}]`
    };

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
