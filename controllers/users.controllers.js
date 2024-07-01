const user = require('../models/users.models');
const { validationResult } = require("express-validator");

const createUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = req.body;
    if (
        "name" in newUser &&
        "email" in newUser &&
        "password" in newUser &&
        "role" in newUser
    ) {
        try {
            const response = await user.createUser(newUser);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}
// Prueba Postman
// POST http://localhost:3000/api/user
// {
//     "name": "Prueba",
//     "email": "prueba@gmail.com",
//     "password": "123456",
//     "role": "user"
// }

const readUsersController = async (req, res) => {
    let users;
    try {
        users = await user.readUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET http://localhost:3000/api/user

const updateUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = req.body;
    if (
        "name" in modifiedUser &&
        "email" in modifiedUser &&
        "password" in modifiedUser &&
        "role" in modifiedUser &&
        "old_email" in modifiedUser
    ) {
        try {
            const response = await user.updateUser(modifiedUser);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            res.status(500).json({ error: "Error en la BBDD" });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
}
// Prueba Postman
// PUT http://localhost:3000/api/user
// {
//     "name": "Prueba2",
//     "email": "prueba2@gmail.com",
//     "password": "123456123456",
//     "role": "user",
//     "old_email": "prueba@gmail.com"
// }

const deleteUserController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let users;
    try {
        users = await user.deleteUser(req.query.email);
        res.status(200).json(users); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE http://localhost:3000/api/user?email=prueba2@gmail.com

const postLogin = async (req, res) => {

}

const postLogout = async (req, res) => {

}

const recoverPassword = async (req, res) => {

}

const restorePassword = async (req, res) => {

}

module.exports = {
    createUserController,
    readUsersController,
    updateUserController,
    deleteUserController,
    // postLogin,
    // postLogout,
    // recoverPassword,
    // restorePassword
}