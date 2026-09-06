export const DEFAULT_PRESETS = {
  users: {
    id: 'users',
    name: 'Users / Accounts',
    description: 'Standard user profiles with name, email, IP and avatar',
    fields: [
      { id: 'f1', name: 'id', type: 'row_number', blank: 0, options: {} },
      { id: 'f2', name: 'first_name', type: 'first_name', blank: 0, options: {} },
      { id: 'f3', name: 'last_name', type: 'last_name', blank: 0, options: {} },
      { id: 'f4', name: 'email', type: 'email', blank: 0, options: {} },
      { id: 'f5', name: 'gender', type: 'gender', blank: 0, options: {} },
      { id: 'f6', name: 'ip_address', type: 'ip_v4', blank: 0, options: {} },
      { id: 'f7', name: 'avatar', type: 'avatar', blank: 0, options: {} },
      { id: 'f8', name: 'created_at', type: 'date_past', blank: 0, options: { years: 3 } }
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-Commerce Orders',
    description: 'Store orders with customer, product, quantity and delivery status',
    fields: [
      { id: 'f1', name: 'order_id', type: 'uuid_v4', blank: 0, options: {} },
      { id: 'f2', name: 'customer_name', type: 'full_name', blank: 0, options: {} },
      { id: 'f3', name: 'product', type: 'product_name', blank: 0, options: {} },
      { id: 'f4', name: 'department', type: 'job_department', blank: 0, options: {} },
      { id: 'f5', name: 'unit_price', type: 'price', blank: 0, options: { min: 15, max: 350, decimals: 2 } },
      { id: 'f6', name: 'quantity', type: 'integer', blank: 0, options: { min: 1, max: 6 } },
      { id: 'f7', name: 'status', type: 'custom_list', blank: 0, options: { list: 'Pending, Processing, Shipped, Delivered, Cancelled' } },
      { id: 'f8', name: 'order_date', type: 'date_recent', blank: 0, options: { days: 45 } }
    ]
  },
  transactions: {
    id: 'transactions',
    name: 'Financial Transactions',
    description: 'Banking and payment transaction logs',
    fields: [
      { id: 'f1', name: 'tx_id', type: 'nanoid', blank: 0, options: { length: 14 } },
      { id: 'f2', name: 'iban', type: 'iban', blank: 0, options: {} },
      { id: 'f3', name: 'amount', type: 'price', blank: 0, options: { min: 5, max: 2500, decimals: 2 } },
      { id: 'f4', name: 'currency', type: 'currency_code', blank: 0, options: {} },
      { id: 'f5', name: 'card_provider', type: 'credit_card_type', blank: 0, options: {} },
      { id: 'f6', name: 'status', type: 'custom_list', blank: 0, options: { list: 'Approved, Declined, Pending, Fraud_Review' } },
      { id: 'f7', name: 'timestamp', type: 'iso_datetime', blank: 0, options: {} }
    ]
  },
  employees: {
    id: 'employees',
    name: 'Employees & HR',
    description: 'Staff directory with generated corporate emails and salaries',
    fields: [
      { id: 'f1', name: 'emp_id', type: 'row_number', blank: 0, options: {} },
      { id: 'f2', name: 'first_name', type: 'first_name', blank: 0, options: {} },
      { id: 'f3', name: 'last_name', type: 'last_name', blank: 0, options: {} },
      { id: 'f4', name: 'work_email', type: 'formula', blank: 0, options: { formula: 'record.first_name.toLowerCase() + "." + record.last_name.toLowerCase() + "@company.com"' } },
      { id: 'f5', name: 'department', type: 'job_department', blank: 0, options: {} },
      { id: 'f6', name: 'job_title', type: 'job_title', blank: 0, options: {} },
      { id: 'f7', name: 'salary', type: 'integer', blank: 0, options: { min: 45000, max: 150000 } },
      { id: 'f8', name: 'hire_date', type: 'date_past', blank: 0, options: { years: 8 } }
    ]
  },
  telemetry: {
    id: 'telemetry',
    name: 'IoT Sensor Telemetry',
    description: 'Device sensor readings with location and battery levels',
    fields: [
      { id: 'f1', name: 'device_id', type: 'regex_pattern', blank: 0, options: { pattern: 'DEV-[0-9]{4}' } },
      { id: 'f2', name: 'temperature_c', type: 'decimal', blank: 0, options: { min: 16.0, max: 37.5, precision: 1 } },
      { id: 'f3', name: 'humidity', type: 'percentage', blank: 0, options: { decimals: 0 } },
      { id: 'f4', name: 'latitude', type: 'latitude', blank: 0, options: {} },
      { id: 'f5', name: 'longitude', type: 'longitude', blank: 0, options: {} },
      { id: 'f6', name: 'recorded_at', type: 'unix_timestamp', blank: 0, options: {} }
    ]
  }
};
