import 'dotenv/config';
import { Client } from 'pg';

function getDbPort(): number {
  const parsed = Number.parseInt(process.env.DB_PORT ?? '5432', 10);
  return Number.isNaN(parsed) ? 5432 : parsed;
}

function sanitizeDbIdentifier(name: string): string {
  const isValid = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);

  if (!isValid) {
    throw new Error(
      `Invalid DB_NAME "${name}". Use letters, numbers, and underscore.`,
    );
  }

  return `"${name}"`;
}

async function ensureDatabase(): Promise<void> {
  const dbName = process.env.DB_NAME ?? 'template_app';
  const client = new Client({
    host: process.env.DB_HOST ?? 'localhost',
    port: getDbPort(),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: 'postgres',
  });

  await client.connect();

  try {
    const result = await client.query<{ exists: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1) AS "exists"',
      [dbName],
    );

    if (result.rows[0]?.exists) {
      console.log(`Database ${dbName} already exists`);
      return;
    }

    const quotedDbName = sanitizeDbIdentifier(dbName);
    await client.query(`CREATE DATABASE ${quotedDbName}`);
    console.log(`Database ${dbName} created`);
  } finally {
    await client.end();
  }
}

void ensureDatabase();
