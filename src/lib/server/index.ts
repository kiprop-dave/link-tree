import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private'

const dbClient = postgres(DATABASE_URL);
export const db = drizzle(dbClient);
