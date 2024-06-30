const { Pool } = require('pg');
require('dotenv').config()

// Datos de conexión

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    database: 'jobsappsql',
    password: '123456'
});

// const pool = new Pool({
//     host: HOST,
//     user: USER,
//     password: PASSWORD,
//     database: DATABASE,
//     port: PORT,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// const pool = new Pool({
//     host: 'dpg-cpoqo6iju9rs738ufcc0-a.frankfurt-postgres.render.com',
//     user: 'userrenderpostgresql',
//     password: 'YbK3LLwigCfRy70zIwddDSSmm29TKgY8',
//     database: 'BBDD-Authors-Entries',
//     port: '5432',
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// pool.connect()
//     .then(() => console.log('Conexión exitosa'))
//     .catch(err => console.log('Error de conexión', err.stack))

module.exports = pool;