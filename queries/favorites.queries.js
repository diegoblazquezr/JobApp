const queries = {
    createFavorite: `INSERT INTO favorites(user_id, job_id)
    VALUES($1, $2);`,
    readFavorites: `SELECT * FROM favorites;`,
    deleteFavorite: `DELETE FROM favorites
    WHERE user_id = $1 AND job_id = $2;`
}
module.exports = queries;