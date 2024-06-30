const queries = {
    createUser: `INSERT INTO users(name, email, password, role)
    VALUES ($1, $2, $3, $4);`,
    readUsers: `SELECT * FROM users;`,
    updateUser: `UPDATE users
    SET name = $1,
    email = $2,
    password = $3,
    role = $4
    WHERE email = $5;`,
    deleteUser: `DELETE FROM users
    WHERE email = $1`
}
module.exports = queries;