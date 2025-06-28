const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || '123456',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
  database: process.env.PGDATABASE || 'todolist_db',
});

const createTableQuery = `
DO $$ BEGIN
    CREATE TYPE priority_enum AS ENUM ('low', 'medium', 'high');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority priority_enum DEFAULT 'medium',
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function setup() {
  try {
    await client.connect();
    await client.query(createTableQuery);
    console.log('Tablo ve enum başarıyla oluşturuldu!');
  } catch (err) {
    console.error('Hata:', err);
  } finally {
    await client.end();
  }
}

setup(); 