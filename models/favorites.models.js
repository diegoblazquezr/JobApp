const queries = require('../queries/favorites.queries')
const pool = require('../config/db_pgsql');

// CREATE
const createFavorite = async (favorite) => {
    const { user_id, job_id } = favorite;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite, [user_id, job_id]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// let newFavorite = {
//     user_id: 4,
//     job_id: "2"
// }
// createFavorite(newFavorite)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ
const readFavorites = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readFavorites);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// readFavorites()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteFavorite = async (user_id, job_id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteFavorite, [user_id, job_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
// Pruebas PostgreSQL
// deleteFavorite(4, '2')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const favorites = {
    createFavorite,
    readFavorites,
    deleteFavorite
}

module.exports = favorites;