import { Hono } from 'hono';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const app = new Hono();

const pool = new Pool({   
  user: 'aya',
  host: 'localhost',              
  database: 'test', 
  password: 'aya123',  
  port: 5432                  
});

const db = drizzle(pool);

const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(`Database connected successfully on port ${pool.options.port}`);
    client.release(); 
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export { pool, checkDbConnection };
export { db };
