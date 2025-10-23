import pg from 'pg';
import dotenv from 'dotenv';


export const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'nico123',
    database: 'Ecommerce',
    port: 5433,

});

pool.connect()
  .then(() => console.log("Conectado a PostgreSQL"))
  .catch(err => console.error("Error de conexión:", err));