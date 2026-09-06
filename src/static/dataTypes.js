import { faker } from '@faker-js/faker';

export const DATA_TYPES = {
  // --- Personal / Person ---
  first_name: {
    name: 'First Name',
    category: 'Person',
    description: "A person's given first name",
    defaultOptions: {},
    generate: () => faker.person.firstName()
  },
  last_name: {
    name: 'Last Name',
    category: 'Person',
    description: "A person's family/last name",
    defaultOptions: {},
    generate: () => faker.person.lastName()
  },
  full_name: {
    name: 'Full Name',
    category: 'Person',
    description: 'First and last name combined',
    defaultOptions: {},
    generate: () => faker.person.fullName()
  },
  gender: {
    name: 'Gender',
    category: 'Person',
    description: 'Gender (Male, Female, Non-binary)',
    defaultOptions: {},
    generate: () => faker.person.gender()
  },
  prefix: {
    name: 'Prefix / Title',
    category: 'Person',
    description: 'Name prefix (Mr., Ms., Dr.)',
    defaultOptions: {},
    generate: () => faker.person.prefix()
  },
  suffix: {
    name: 'Suffix',
    category: 'Person',
    description: 'Name suffix (Jr., Sr., III, PhD)',
    defaultOptions: {},
    generate: () => faker.person.suffix()
  },
  job_title: {
    name: 'Job Title',
    category: 'Person',
    description: 'Professional position title',
    defaultOptions: {},
    generate: () => faker.person.jobTitle()
  },
  job_department: {
    name: 'Department',
    category: 'Person',
    description: 'Corporate department (Engineering, Sales...)',
    defaultOptions: {},
    generate: () => faker.commerce.department()
  },
  phone: {
    name: 'Phone Number',
    category: 'Person',
    description: 'Formatted phone number',
    defaultOptions: {},
    generate: () => faker.phone.number({ style: 'national' })
  },
  avatar: {
    name: 'Avatar URL',
    category: 'Person',
    description: 'URL to random profile photo',
    defaultOptions: {},
    generate: () => faker.image.avatar()
  },
  bio: {
    name: 'Bio',
    category: 'Person',
    description: 'Short profile biography',
    defaultOptions: {},
    generate: () => faker.person.bio()
  },
  ssn: {
    name: 'SSN (US)',
    category: 'Person',
    description: 'US Social Security Number format (XXX-XX-XXXX)',
    defaultOptions: {},
    generate: () => faker.string.numeric('###-##-####')
  },

  // --- Location / Address ---
  street_address: {
    name: 'Street Address',
    category: 'Location',
    description: 'Street number and name',
    defaultOptions: {},
    generate: () => faker.location.streetAddress()
  },
  secondary_address: {
    name: 'Secondary Address',
    category: 'Location',
    description: 'Apartment, Suite, Unit number',
    defaultOptions: {},
    generate: () => faker.location.secondaryAddress()
  },
  city: {
    name: 'City',
    category: 'Location',
    description: 'City name',
    defaultOptions: {},
    generate: () => faker.location.city()
  },
  state: {
    name: 'State / Province',
    category: 'Location',
    description: 'US state or region name',
    defaultOptions: {},
    generate: () => faker.location.state()
  },
  state_abbr: {
    name: 'State Abbreviation',
    category: 'Location',
    description: 'Two-letter state code',
    defaultOptions: {},
    generate: () => faker.location.state({ abbreviated: true })
  },
  postal_code: {
    name: 'Postal Code / ZIP',
    category: 'Location',
    description: 'Standard postal code format',
    defaultOptions: {},
    generate: () => faker.location.zipCode()
  },
  country: {
    name: 'Country',
    category: 'Location',
    description: 'Full country name',
    defaultOptions: {},
    generate: () => faker.location.country()
  },
  country_code: {
    name: 'Country Code (ISO 2)',
    category: 'Location',
    description: '2-letter ISO country code',
    defaultOptions: {},
    generate: () => faker.location.countryCode('alpha-2')
  },
  latitude: {
    name: 'Latitude',
    category: 'Location',
    description: 'Geographic latitude coordinate (-90 to 90)',
    defaultOptions: {},
    generate: () => faker.location.latitude({ max: 90, min: -90, precision: 6 })
  },
  longitude: {
    name: 'Longitude',
    category: 'Location',
    description: 'Geographic longitude coordinate (-180 to 180)',
    defaultOptions: {},
    generate: () => faker.location.longitude({ max: 180, min: -180, precision: 6 })
  },
  time_zone: {
    name: 'Timezone',
    category: 'Location',
    description: 'IANA time zone string',
    defaultOptions: {},
    generate: () => faker.location.timeZone()
  },

  // --- Internet / Tech ---
  email: {
    name: 'Email Address',
    category: 'Internet',
    description: 'Valid formatted email address',
    defaultOptions: {},
    generate: () => faker.internet.email()
  },
  username: {
    name: 'Username',
    category: 'Internet',
    description: 'Online screen name / handle',
    defaultOptions: {},
    generate: () => faker.internet.username()
  },
  domain_name: {
    name: 'Domain Name',
    category: 'Internet',
    description: 'Web domain name (example.com)',
    defaultOptions: {},
    generate: () => faker.internet.domainName()
  },
  url: {
    name: 'URL / Website',
    category: 'Internet',
    description: 'Full HTTP/HTTPS URL',
    defaultOptions: {},
    generate: () => faker.internet.url()
  },
  ip_v4: {
    name: 'IPv4 Address',
    category: 'Internet',
    description: 'Standard IPv4 address format',
    defaultOptions: {},
    generate: () => faker.internet.ipv4()
  },
  ip_v6: {
    name: 'IPv6 Address',
    category: 'Internet',
    description: 'Standard 128-bit IPv6 address',
    defaultOptions: {},
    generate: () => faker.internet.ipv6()
  },
  mac_address: {
    name: 'MAC Address',
    category: 'Internet',
    description: 'Hardware MAC address format',
    defaultOptions: {},
    generate: () => faker.internet.mac()
  },
  user_agent: {
    name: 'User Agent',
    category: 'Internet',
    description: 'Browser User-Agent header string',
    defaultOptions: {},
    generate: () => faker.internet.userAgent()
  },
  password: {
    name: 'Password',
    category: 'Internet',
    description: 'Random secure password',
    defaultOptions: { length: 12 },
    generate: (opts) => faker.internet.password({ length: opts?.length || 12, memorable: false })
  },

  // --- Commerce & Business ---
  company_name: {
    name: 'Company Name',
    category: 'Commerce',
    description: 'Corporate business name',
    defaultOptions: {},
    generate: () => faker.company.name()
  },
  company_suffix: {
    name: 'Company Suffix',
    category: 'Commerce',
    description: 'Legal suffix (Inc., LLC, Group)',
    defaultOptions: {},
    generate: () => faker.company.companySuffix()
  },
  catch_phrase: {
    name: 'Company Catch Phrase',
    category: 'Commerce',
    description: 'Marketing slogan or tagline',
    defaultOptions: {},
    generate: () => faker.company.catchPhrase()
  },
  product_name: {
    name: 'Product Name',
    category: 'Commerce',
    description: 'Commercial product name',
    defaultOptions: {},
    generate: () => faker.commerce.productName()
  },
  product_material: {
    name: 'Product Material',
    category: 'Commerce',
    description: 'Manufacturing material (Steel, Cotton)',
    defaultOptions: {},
    generate: () => faker.commerce.productMaterial()
  },
  price: {
    name: 'Price / Money Amount',
    category: 'Commerce',
    description: 'Currency amount (10.00 to 1000.00)',
    defaultOptions: { min: 10, max: 1000, decimals: 2 },
    generate: (opts) => parseFloat(faker.commerce.price({ min: opts?.min ?? 10, max: opts?.max ?? 1000, dec: opts?.decimals ?? 2 }))
  },
  isbn: {
    name: 'ISBN (Book Code)',
    category: 'Commerce',
    description: 'Standard 13-digit book identifier',
    defaultOptions: {},
    generate: () => faker.commerce.isbn()
  },

  // --- Finance ---
  credit_card_number: {
    name: 'Credit Card Number',
    category: 'Finance',
    description: 'Formatted masked credit card number',
    defaultOptions: {},
    generate: () => faker.finance.creditCardNumber()
  },
  credit_card_cvv: {
    name: 'Credit Card CVV',
    category: 'Finance',
    description: '3 or 4-digit security code',
    defaultOptions: {},
    generate: () => faker.finance.creditCardCVV()
  },
  credit_card_type: {
    name: 'Credit Card Issuer',
    category: 'Finance',
    description: 'Visa, MasterCard, Amex, etc.',
    defaultOptions: {},
    generate: () => faker.finance.creditCardIssuer()
  },
  currency_code: {
    name: 'Currency Code (ISO)',
    category: 'Finance',
    description: '3-letter currency code (USD, EUR)',
    defaultOptions: {},
    generate: () => faker.finance.currencyCode()
  },
  currency_name: {
    name: 'Currency Name',
    category: 'Finance',
    description: 'Full currency name (US Dollar)',
    defaultOptions: {},
    generate: () => faker.finance.currencyName()
  },
  currency_symbol: {
    name: 'Currency Symbol',
    category: 'Finance',
    description: 'Symbol ($, €, ¥)',
    defaultOptions: {},
    generate: () => faker.finance.currencySymbol()
  },
  iban: {
    name: 'IBAN',
    category: 'Finance',
    description: 'International Bank Account Number',
    defaultOptions: {},
    generate: () => faker.finance.iban()
  },
  bic: {
    name: 'BIC / SWIFT Code',
    category: 'Finance',
    description: 'Bank Identifier Code',
    defaultOptions: {},
    generate: () => faker.finance.bic()
  },
  bitcoin_address: {
    name: 'Bitcoin Address',
    category: 'Finance',
    description: 'Valid-format BTC public address',
    defaultOptions: {},
    generate: () => faker.finance.bitcoinAddress()
  },
  ethereum_address: {
    name: 'Ethereum Address',
    category: 'Finance',
    description: '0x... hex EVM public address',
    defaultOptions: {},
    generate: () => faker.finance.ethereumAddress()
  },

  // --- Numbers & Mathematics ---
  row_number: {
    name: 'Row Number',
    category: 'Numbers',
    description: 'Sequential row number (1, 2, 3...)',
    defaultOptions: {},
    generate: (opts, ctx) => ctx ? ctx.rowIndex : 1
  },
  integer: {
    name: 'Number (Integer)',
    category: 'Numbers',
    description: 'Whole number within range (default 1-100)',
    defaultOptions: { min: 1, max: 100 },
    generate: (opts) => faker.number.int({ min: opts?.min ?? 1, max: opts?.max ?? 100 })
  },
  decimal: {
    name: 'Number (Decimal)',
    category: 'Numbers',
    description: 'Floating point number with precision',
    defaultOptions: { min: 0, max: 100, precision: 2 },
    generate: (opts) => {
      const min = opts?.min ?? 0;
      const max = opts?.max ?? 100;
      const precision = opts?.precision ?? 2;
      const val = faker.number.float({ min, max, fractionDigits: precision });
      return parseFloat(val.toFixed(precision));
    }
  },
  percentage: {
    name: 'Percentage',
    category: 'Numbers',
    description: 'Percentage value (0% to 100%)',
    defaultOptions: { decimals: 0 },
    generate: (opts) => {
      const dec = opts?.decimals ?? 0;
      return parseFloat(faker.number.float({ min: 0, max: 100, fractionDigits: dec }).toFixed(dec));
    }
  },
  boolean: {
    name: 'Boolean',
    category: 'Numbers',
    description: 'True or False',
    defaultOptions: {},
    generate: () => faker.datatype.boolean()
  },

  // --- Dates & Times ---
  date_past: {
    name: 'Date (Past)',
    category: 'Date & Time',
    description: 'Past date within N years (YYYY-MM-DD)',
    defaultOptions: { years: 2 },
    generate: (opts) => faker.date.past({ years: opts?.years || 2 }).toISOString().split('T')[0]
  },
  date_future: {
    name: 'Date (Future)',
    category: 'Date & Time',
    description: 'Future date within N years (YYYY-MM-DD)',
    defaultOptions: { years: 2 },
    generate: (opts) => faker.date.future({ years: opts?.years || 2 }).toISOString().split('T')[0]
  },
  date_recent: {
    name: 'Date (Recent)',
    category: 'Date & Time',
    description: 'Recent date within N days',
    defaultOptions: { days: 30 },
    generate: (opts) => faker.date.recent({ days: opts?.days || 30 }).toISOString().split('T')[0]
  },
  iso_datetime: {
    name: 'Datetime (ISO 8601)',
    category: 'Date & Time',
    description: 'Full timestamp (2025-01-01T12:00:00.000Z)',
    defaultOptions: {},
    generate: () => faker.date.recent({ days: 120 }).toISOString()
  },
  time: {
    name: 'Time',
    category: 'Date & Time',
    description: 'Time of day (HH:MM:SS)',
    defaultOptions: {},
    generate: () => {
      const d = faker.date.recent({ days: 1 });
      return d.toTimeString().split(' ')[0];
    }
  },
  unix_timestamp: {
    name: 'Unix Timestamp',
    category: 'Date & Time',
    description: 'Epoch seconds timestamp',
    defaultOptions: {},
    generate: () => Math.floor(faker.date.recent({ days: 90 }).getTime() / 1000)
  },

  // --- Identifiers & Codes ---
  uuid_v4: {
    name: 'UUID (v4)',
    category: 'Identifiers',
    description: 'RFC4122 compliant UUID v4',
    defaultOptions: {},
    generate: () => faker.string.uuid()
  },
  nanoid: {
    name: 'Nano ID',
    category: 'Identifiers',
    description: 'Compact URL-safe unique identifier',
    defaultOptions: { length: 12 },
    generate: (opts) => faker.string.nanoid(opts?.length || 12)
  },
  alphanumeric: {
    name: 'Alphanumeric Code',
    category: 'Identifiers',
    description: 'Random characters string (e.g. ABC123XYZ)',
    defaultOptions: { length: 8 },
    generate: (opts) => faker.string.alphanumeric({ length: opts?.length || 8, casing: 'upper' })
  },
  hex_color: {
    name: 'Hex Color Code',
    category: 'Identifiers',
    description: 'Hex color (#RRGGBB)',
    defaultOptions: {},
    generate: () => faker.color.rgb()
  },

  // --- Custom & Logic ---
  custom_list: {
    name: 'Custom List',
    category: 'Custom & Logic',
    description: 'Random item from comma-separated list',
    defaultOptions: { list: 'Active, Inactive, Pending' },
    generate: (opts) => {
      const raw = opts?.list || 'Active, Inactive, Pending';
      const items = raw.split(',').map(s => s.trim()).filter(Boolean);
      return items.length ? faker.helpers.arrayElement(items) : 'Item';
    }
  },
  regex_pattern: {
    name: 'Regular Expression / Pattern',
    category: 'Custom & Logic',
    description: 'Generates string matching a regex pattern',
    defaultOptions: { pattern: '[A-Z]{3}-[0-9]{4}' },
    generate: (opts) => {
      const pattern = opts?.pattern || '[A-Z]{3}-[0-9]{4}';
      try {
        return faker.helpers.fromRegExp(new RegExp(pattern));
      } catch (err) {
        return `INV_REGEX_${pattern}`;
      }
    }
  },
  formula: {
    name: 'Formula (JS)',
    category: 'Custom & Logic',
    description: 'Custom JavaScript expression computed per row',
    defaultOptions: { formula: 'record.first_name + "@" + record.domain_name' },
    generate: () => null // evaluated dynamically in 2nd pass
  },

  // --- Text & Content ---
  words: {
    name: 'Words',
    category: 'Text',
    description: 'Random words',
    defaultOptions: { count: 3 },
    generate: (opts) => faker.lorem.words(opts?.count || 3)
  },
  sentence: {
    name: 'Sentence',
    category: 'Text',
    description: 'Full sentence of lorem ipsum',
    defaultOptions: {},
    generate: () => faker.lorem.sentence()
  },
  paragraph: {
    name: 'Paragraph',
    category: 'Text',
    description: 'Full paragraph of placeholder text',
    defaultOptions: {},
    generate: () => faker.lorem.paragraph()
  }
};
