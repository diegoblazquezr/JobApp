const queries = require('../queries/users.queries')
const pool = require('../config/db_pgsql');

// CREATE
const createUser = async (user) => {
    const { name, email, password, role } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createUser, [name, email, password, role]);
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
// let newUser = {
//     name: "Prueba",
//     email: "prueba@gmail.com",
//     password: "123456",
//     role: "user"
// }
// createUser(newUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// READ
const readUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.readUsers);
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
// readUsers()
//     .then(data=>console.log(data))
//     .catch(error => console.log(error))


//UPDATE
const updateUser = async (user) => {
    const { name, email, password, role, old_email } = user;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateUser, [name, email, password, role, old_email])
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
// const updatedUser = {
//     name: "Prueba2",
//     email: "prueba2@gmail.com",
//     password: "123456123456",
//     role: "user",
//     old_email: "prueba@gmail.com"

// }
// updateUser(updatedUser)
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// DELETE
const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteUser, [email])
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
// deleteUser('prueba2@gmail.com')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

const users = {
    createUser,
    readUsers,
    updateUser,
    deleteUser
}

module.exports = users;