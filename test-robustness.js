const { generateRecord, generateDataset } = require('./lib/generator');
const { toCSV, toSQL, toJSON, sanitizeSchemaFields } = require('./lib/formatters');

console.log('=== TC-06, TC-07, TC-08: Row bounds ===');
console.log('Count 0 ->', generateDataset([{name: 'id', type: 'row_number'}], 0).length === 1);
console.log('Count -5 ->', generateDataset([{name: 'id', type: 'row_number'}], -5).length === 1);
console.log('Count abc ->', generateDataset([{name: 'id', type: 'row_number'}], 'abc').length === 10);
console.log('Count 999999 ->', generateDataset([{name: 'id', type: 'row_number'}], 999999).length === 10000);

console.log('\n=== TC-09: 0 fields in schema ===');
console.log('Empty schema dataset ->', JSON.stringify(generateDataset([], 5)));
console.log('Empty schema CSV ->', toCSV([], []));

console.log('\n=== TC-10 & TC-11: Empty and Duplicate field names ===');
const fields = [{name: ''}, {name: 'email'}, {name: 'email'}, {name: '   '}];
const sanitized = sanitizeSchemaFields(fields);
console.log('Sanitized field names ->', sanitized.map(f => f.name));

console.log('\n=== TC-13: SQL & CSV Injections ===');
const sqlExport = toSQL(
  [{ col_1: "O'Connor", col_2: "normal" }],
  [{ name: "col_1" }, { name: "col_2" }],
  { tableName: "users'); DROP TABLE users;--" }
);
console.log('SQL Table name sanitized ->', sqlExport.includes('INSERT INTO "users___DROP_TABLE_users___"'));
console.log('SQL quote escaped ->', sqlExport.includes("('O''Connor', 'normal')"));

const csvExport = toCSV(
  [{ f: "=cmd|' /C calc'!A0", g: "@SUM(1+1)" }],
  [{ name: "f" }, { name: "g" }]
);
console.log('CSV Formula injection mitigated ->', csvExport.includes("'=cmd|") && csvExport.includes("'@SUM"));

console.log('\n=== TC-14 & TC-15: Formulas syntax & runtime error isolation ===');
const formulaSchema = [
  { name: 'a', type: 'first_name' },
  { name: 'syntax_err', type: 'formula', formula: 'record.a(' },
  { name: 'runtime_err', type: 'formula', formula: 'record.non_existent.toUpperCase()' },
  { name: 'valid_formula', type: 'formula', formula: 'record.a.toUpperCase()' }
];
const res = generateDataset(formulaSchema, 2);
console.log('Formula result row 1 ->', res[0]);

console.log('\n=== TC-17: Unknown datatype fallback ===');
const unknownSchema = [{ name: 'test', type: 'invalid_datatype_xyz' }];
const unknownRes = generateDataset(unknownSchema, 1);
console.log('Unknown datatype result ->', unknownRes[0]);
