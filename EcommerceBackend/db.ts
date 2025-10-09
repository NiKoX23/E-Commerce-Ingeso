import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'nico123',
    database: process.env.DB_NAME || 'Ecommerce',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión a PostgreSQL:", err));

// Manejar errores de conexión
pool.on('error', (err) => {
  console.error('Error inesperado en la conexión PostgreSQL:', err);
  process.exit(-1);
});