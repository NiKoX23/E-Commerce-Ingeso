import pg from 'pg';

export const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'nico123',
    database: 'ECommerce',
    port: 5432,
});

pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión:", err));