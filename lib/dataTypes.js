const { faker } = require('@faker-js/faker');

const DATA_TYPES = {
  // --- Personal / Person ---
  first_name: {
    name: 'First Name',
    category: 'Person',
    description: 'A person\'s given first name',
    defaultOptions: {},
    generate: (opts) => faker.person.firstName()
  },
  last_name: {
    name: 'Last Name',
    category: 'Person',
    description: 'A person\'s family/last name',
    defaultOptions: {},
    generate: (opts) => faker.person.lastName()
  },
  full_name: {
    name: 'Full Name',
    category: 'Person',
    description: 'First and last name combined',
    defaultOptions: {},
    generate: (opts) => faker.person.fullName()
  },
  gender: {
    name: 'Gender',
    category: 'Person',
    description: 'Gender (Male, Female, Non-binary)',
    defaultOptions: {},
    generate: (opts) => faker.person.gender()
  },
  prefix: {
    name: 'Prefix / Title',
    category: 'Person',
    description: 'Name prefix (Mr., Ms., Dr.)',
    defaultOptions: {},
    generate: (opts) => faker.person.prefix()
  },
  suffix: {
    name: 'Suffix',
    category: 'Person',
    description: 'Name suffix (Jr., Sr., III, PhD)',
    defaultOptions: {},
    generate: (opts) => faker.person.suffix()
  },
  job_title: {
    name: 'Job Title',
    category: 'Person',
    description: 'Professional position title',
    defaultOptions: {},
    generate: (opts) => faker.person.jobTitle()
  },
  job_department: {
    name: 'Department',
    category: 'Person',
    description: 'Corporate department (Engineering, Sales...)',
    defaultOptions: {},
    generate: (opts) => faker.commerce.department()
  },
  phone: {
    name: 'Phone Number',
    category: 'Person',
    description: 'Formatted phone number',
    defaultOptions: {},
    generate: (opts) => faker.phone.number({ style: 'national' })
  },
  avatar: {
    name: 'Avatar URL',
    category: 'Person',
    description: 'URL to random profile photo',
    defaultOptions: {},
    generate: (opts) => faker.image.avatar()
  },
  bio: {
    name: 'Bio',
    category: 'Person',
    description: 'Short profile biography',
    defaultOptions: {},
    generate: (opts) => faker.person.bio()
  },
  ssn: {
    name: 'SSN (US)',
    category: 'Person',
    description: 'US Social Security Number format (XXX-XX-XXXX)',
    defaultOptions: {},
    generate: (opts) => faker.string.numeric('###-##-####')
  },

  // --- Location / Address ---
  street_address: {
    name: 'Street Address',
    category: 'Location',
    description: 'Street number and name',
    defaultOptions: {},
    generate: (opts) => faker.location.streetAddress()
  },
  secondary_address: {
    name: 'Secondary Address',
    category: 'Location',
    description: 'Apt, Suite, Unit',
    defaultOptions: {},
    generate: (opts) => faker.location.secondaryAddress()
  },
  city: {
    name: 'City',
    category: 'Location',
    description: 'City name',
    defaultOptions: {},
    generate: (opts) => faker.location.city()
  },
  state: {
    name: 'State / Province',
    category: 'Location',
    description: 'Full state name',
    defaultOptions: {},
    generate: (opts) => faker.location.state()
  },
  state_abbr: {
    name: 'State Code',
    category: 'Location',
    description: 'Two letter state code (e.g. CA, NY)',
    defaultOptions: {},
    generate: (opts) => faker.location.state({ abbreviated: true })
  },
  country: {
    name: 'Country',
    category: 'Location',
    description: 'Full country name',
    defaultOptions: {},
    generate: (opts) => faker.location.country()
  },
  country_code: {
    name: 'Country Code (ISO 2)',
    category: 'Location',
    description: '2-letter ISO country code (US, ES, MX)',
    defaultOptions: {},
    generate: (opts) => faker.location.countryCode('alpha-2')
  },
  postal_code: {
    name: 'Postal Code / ZIP',
    category: 'Location',
    description: 'Postal / zip code',
    defaultOptions: {},
    generate: (opts) => faker.location.zipCode()
  },
  latitude: {
    name: 'Latitude',
    category: 'Location',
    description: 'Geographic latitude (-90 to 90)',
    defaultOptions: {},
    generate: (opts) => faker.location.latitude()
  },
  longitude: {
    name: 'Longitude',
    category: 'Location',
    description: 'Geographic longitude (-180 to 180)',
    defaultOptions: {},
    generate: (opts) => faker.location.longitude()
  },
  time_zone: {
    name: 'Timezone',
    category: 'Location',
    description: 'IANA Time zone string',
    defaultOptions: {},
    generate: (opts) => faker.location.timeZone()
  },

  // --- Internet & Tech ---
  email: {
    name: 'Email Address',
    category: 'Internet',
    description: 'Standard internet email address',
    defaultOptions: {},
    generate: (opts) => faker.internet.email()
  },
  username: {
    name: 'Username',
    category: 'Internet',
    description: 'Alphanumeric username handle',
    defaultOptions: {},
    generate: (opts) => faker.internet.username()
  },
  domain_name: {
    name: 'Domain Name',
    category: 'Internet',
    description: 'Internet domain name',
    defaultOptions: {},
    generate: (opts) => faker.internet.domainName()
  },
  url: {
    name: 'URL / Website',
    category: 'Internet',
    description: 'Full web URL (https://...)',
    defaultOptions: {},
    generate: (opts) => faker.internet.url()
  },
  ip_v4: {
    name: 'IP Address v4',
    category: 'Internet',
    description: 'IPv4 address (192.168.1.1)',
    defaultOptions: {},
    generate: (opts) => faker.internet.ipv4()
  },
  ip_v6: {
    name: 'IP Address v6',
    category: 'Internet',
    description: 'IPv6 address',
    defaultOptions: {},
    generate: (opts) => faker.internet.ipv6()
  },
  mac_address: {
    name: 'MAC Address',
    category: 'Internet',
    description: 'Physical hardware MAC address',
    defaultOptions: {},
    generate: (opts) => faker.internet.mac()
  },
  user_agent: {
    name: 'User Agent',
    category: 'Internet',
    description: 'Browser User-Agent header string',
    defaultOptions: {},
    generate: (opts) => faker.internet.userAgent()
  },
  password: {
    name: 'Password',
    category: 'Internet',
    description: 'Random secure password',
    defaultOptions: { length: 12 },
    generate: (opts) => faker.internet.password({ length: parseInt(opts.length || 12, 10), memorable: false })
  },
  bcrypt_hash: {
    name: 'Bcrypt Hash',
    category: 'Internet',
    description: 'Simulated bcrypt hash string ($2a$12$...)',
    defaultOptions: {},
    generate: (opts) => '$2a$12$' + faker.string.alphanumeric({ length: 53 })
  },

  // --- Commerce & Finance ---
  company_name: {
    name: 'Company Name',
    category: 'Commerce',
    description: 'Business or enterprise name',
    defaultOptions: {},
    generate: (opts) => faker.company.name()
  },
  company_catchphrase: {
    name: 'Company Slogan',
    category: 'Commerce',
    description: 'Corporate slogan or catchphrase',
    defaultOptions: {},
    generate: (opts) => faker.company.catchPhrase()
  },
  credit_card: {
    name: 'Credit Card Number',
    category: 'Finance',
    description: 'Valid format test credit card number',
    defaultOptions: {},
    generate: (opts) => faker.finance.creditCardNumber()
  },
  credit_card_type: {
    name: 'Credit Card Type',
    category: 'Finance',
    description: 'Visa, MasterCard, Amex, etc.',
    defaultOptions: {},
    generate: (opts) => faker.finance.creditCardIssuer()
  },
  credit_card_cvv: {
    name: 'Credit Card CVV',
    category: 'Finance',
    description: '3-digit security code',
    defaultOptions: {},
    generate: (opts) => faker.finance.creditCardCVV()
  },
  iban: {
    name: 'IBAN',
    category: 'Finance',
    description: 'International Bank Account Number',
    defaultOptions: {},
    generate: (opts) => faker.finance.iban()
  },
  currency_code: {
    name: 'Currency Code',
    category: 'Finance',
    description: '3-letter currency code (USD, EUR, GBP)',
    defaultOptions: {},
    generate: (opts) => faker.finance.currencyCode()
  },
  currency_symbol: {
    name: 'Currency Symbol',
    category: 'Finance',
    description: 'Symbol ($, €, £, ¥)',
    defaultOptions: {},
    generate: (opts) => faker.finance.currencySymbol()
  },
  price: {
    name: 'Price / Money',
    category: 'Commerce',
    description: 'Monetary amount with min/max',
    defaultOptions: { min: 10, max: 1000, decimals: 2 },
    generate: (opts) => {
      const min = parseFloat(opts.min || 10);
      const max = parseFloat(opts.max || 1000);
      const dec = parseInt(opts.decimals ?? 2, 10);
      return parseFloat(faker.commerce.price({ min, max, dec }));
    }
  },
  product_name: {
    name: 'Product Name',
    category: 'Commerce',
    description: 'E-commerce merchandise item',
    defaultOptions: {},
    generate: (opts) => faker.commerce.productName()
  },
  product_description: {
    name: 'Product Description',
    category: 'Commerce',
    description: 'Short promotional description',
    defaultOptions: {},
    generate: (opts) => faker.commerce.productDescription()
  },

  // --- Numbers & Sequences ---
  row_number: {
    name: 'Row Number',
    category: 'Numbers',
    description: 'Auto-incrementing sequential counter (1, 2, 3...)',
    defaultOptions: {},
    generate: (opts, context) => context.rowIndex
  },
  integer: {
    name: 'Number (Integer)',
    category: 'Numbers',
    description: 'Random whole integer between min and max',
    defaultOptions: { min: 1, max: 100 },
    generate: (opts) => {
      const min = parseInt(opts.min ?? 1, 10);
      const max = parseInt(opts.max ?? 100, 10);
      return faker.number.int({ min, max });
    }
  },
  decimal: {
    name: 'Number (Decimal)',
    category: 'Numbers',
    description: 'Floating point number with precision',
    defaultOptions: { min: 0, max: 100, precision: 2 },
    generate: (opts) => {
      const min = parseFloat(opts.min ?? 0);
      const max = parseFloat(opts.max ?? 100);
      const fractionDigits = parseInt(opts.precision ?? 2, 10);
      return faker.number.float({ min, max, fractionDigits });
    }
  },
  percentage: {
    name: 'Percentage',
    category: 'Numbers',
    description: 'Number between 0 and 100 with % sign',
    defaultOptions: { decimals: 0 },
    generate: (opts) => {
      const dec = parseInt(opts.decimals ?? 0, 10);
      return faker.number.float({ min: 0, max: 100, fractionDigits: dec }) + '%';
    }
  },

  // --- Date & Time ---
  date_past: {
    name: 'Date (Past)',
    category: 'Date & Time',
    description: 'Random date in past years (YYYY-MM-DD)',
    defaultOptions: { years: 5, format: 'YYYY-MM-DD' },
    generate: (opts) => {
      const d = faker.date.past({ years: parseInt(opts.years || 5, 10) });
      return formatDate(d, opts.format);
    }
  },
  date_future: {
    name: 'Date (Future)',
    category: 'Date & Time',
    description: 'Random date in future years',
    defaultOptions: { years: 5, format: 'YYYY-MM-DD' },
    generate: (opts) => {
      const d = faker.date.future({ years: parseInt(opts.years || 5, 10) });
      return formatDate(d, opts.format);
    }
  },
  date_recent: {
    name: 'Date (Recent)',
    category: 'Date & Time',
    description: 'Random date in the last N days',
    defaultOptions: { days: 30, format: 'YYYY-MM-DD' },
    generate: (opts) => {
      const d = faker.date.recent({ days: parseInt(opts.days || 30, 10) });
      return formatDate(d, opts.format);
    }
  },
  date_birth: {
    name: 'Date of Birth',
    category: 'Date & Time',
    description: 'Adult birth date (18 to 65 years)',
    defaultOptions: { min: 18, max: 65, format: 'YYYY-MM-DD' },
    generate: (opts) => {
      const d = faker.date.birthdate({ min: parseInt(opts.min || 18, 10), max: parseInt(opts.max || 65, 10), mode: 'age' });
      return formatDate(d, opts.format);
    }
  },
  iso_datetime: {
    name: 'ISO 8601 Timestamp',
    category: 'Date & Time',
    description: 'Full ISO date string (2024-05-12T14:32:10.000Z)',
    defaultOptions: {},
    generate: (opts) => faker.date.recent().toISOString()
  },
  unix_timestamp: {
    name: 'Unix Timestamp',
    category: 'Date & Time',
    description: 'Epoch seconds or milliseconds',
    defaultOptions: { millis: false },
    generate: (opts) => {
      const ms = faker.date.recent().getTime();
      return opts.millis === 'true' || opts.millis === true ? ms : Math.floor(ms / 1000);
    }
  },
  time: {
    name: 'Time (HH:MM:SS)',
    category: 'Date & Time',
    description: 'Random 24-hour clock time',
    defaultOptions: {},
    generate: (opts) => {
      const h = String(faker.number.int({ min: 0, max: 23 })).padStart(2, '0');
      const m = String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0');
      const s = String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0');
      return `${h}:${m}:${s}`;
    }
  },

  // --- Identifiers & Codes ---
  uuid_v4: {
    name: 'UUID v4',
    category: 'Identifiers',
    description: 'Random 128-bit Universally Unique Identifier',
    defaultOptions: {},
    generate: (opts) => faker.string.uuid()
  },
  nanoid: {
    name: 'NanoID',
    category: 'Identifiers',
    description: 'Compact URL-friendly unique identifier',
    defaultOptions: { length: 16 },
    generate: (opts) => faker.string.alphanumeric({ length: parseInt(opts.length || 16, 10) })
  },
  mongodb_id: {
    name: 'MongoDB ObjectID',
    category: 'Identifiers',
    description: '24-character hexadecimal ObjectId',
    defaultOptions: {},
    generate: (opts) => faker.string.hexadecimal({ length: 24, casing: 'lower', prefix: '' })
  },
  ean: {
    name: 'EAN-13 Barcode',
    category: 'Identifiers',
    description: 'Standard 13-digit retail barcode',
    defaultOptions: {},
    generate: (opts) => faker.commerce.isbn({ variant: 13, separator: '' })
  },
  hex_color: {
    name: 'Hex Color',
    category: 'Identifiers',
    description: 'Hexadecimal color code (#rrggbb)',
    defaultOptions: {},
    generate: (opts) => faker.color.rgb()
  },
  color_name: {
    name: 'Color Name',
    category: 'Identifiers',
    description: 'Human color name (Red, Cyan, Lime...)',
    defaultOptions: {},
    generate: (opts) => faker.color.human()
  },
  file_name: {
    name: 'File Name',
    category: 'Identifiers',
    description: 'File name with common extension',
    defaultOptions: {},
    generate: (opts) => faker.system.fileName()
  },
  mime_type: {
    name: 'MIME Type',
    category: 'Identifiers',
    description: 'Media type (application/json, image/png...)',
    defaultOptions: {},
    generate: (opts) => faker.system.mimeType()
  },

  // --- Custom & Logic ---
  boolean: {
    name: 'Boolean (true/false)',
    category: 'Custom & Logic',
    description: 'Boolean or customized True/False label',
    defaultOptions: { trueLabel: 'true', falseLabel: 'false' },
    generate: (opts) => {
      const val = faker.datatype.boolean();
      if (opts.trueLabel && opts.trueLabel !== 'true') {
        return val ? opts.trueLabel : opts.falseLabel;
      }
      return val;
    }
  },
  custom_list: {
    name: 'Custom List',
    category: 'Custom & Logic',
    description: 'Randomly pick an item from comma-separated values',
    defaultOptions: { list: 'Pending, In Progress, Completed, Cancelled' },
    generate: (opts) => {
      const items = (opts.list || 'A, B, C')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      return items.length ? faker.helpers.arrayElement(items) : '';
    }
  },
  regex_pattern: {
    name: 'RegEx Pattern',
    category: 'Custom & Logic',
    description: 'Generates text matching a regular expression pattern',
    defaultOptions: { pattern: '[A-Z]{3}-[0-9]{4}' },
    generate: (opts) => {
      const pat = opts.pattern || '[A-Z]{3}-[0-9]{4}';
      try {
        return faker.helpers.fromRegExp(new RegExp(pat));
      } catch (e) {
        return faker.string.alphanumeric(8);
      }
    }
  },
  lorem_sentence: {
    name: 'Lorem Sentence',
    category: 'Text',
    description: 'A single sentence of placeholder text',
    defaultOptions: {},
    generate: (opts) => faker.lorem.sentence()
  },
  lorem_paragraph: {
    name: 'Lorem Paragraph',
    category: 'Text',
    description: 'A paragraph of placeholder text',
    defaultOptions: {},
    generate: (opts) => faker.lorem.paragraph()
  },
  formula: {
    name: 'Formula (JS)',
    category: 'Custom & Logic',
    description: 'Computed value using JavaScript expression (e.g. record.price * 1.21)',
    defaultOptions: { formula: 'record.first_name + "." + record.last_name + "@example.com"' },
    isFormula: true,
    generate: () => null // evaluated in generator engine
  }
};

function formatDate(date, format) {
  if (!date || !(date instanceof Date)) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (format === 'DD/MM/YYYY') return `${d}/${m}/${y}`;
  if (format === 'MM/DD/YYYY') return `${m}/${d}/${y}`;
  return `${y}-${m}-${d}`;
}

const CATEGORIES = [
  'Person',
  'Location',
  'Internet',
  'Commerce',
  'Finance',
  'Numbers',
  'Date & Time',
  'Identifiers',
  'Custom & Logic',
  'Text'
];

module.exports = {
  DATA_TYPES,
  CATEGORIES
};
