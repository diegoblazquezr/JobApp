const jobService = require('../services/jobs.services');
const user = require('../models/users.models');
const favorite = require('../models/favorites.models');
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

const createJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, skills, client_location, url, source, status } = req.body;
    if (title && description && skills && client_location && url && source && status !== undefined) {
        try {
            const response = await jobService.createJob(title, description, skills, client_location, url, source, status);
            res.status(201).json({
                "items_created": response
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
};
// Prueba Postman
// POST http://localhost:3000/api/jobs
// {
//     "title": "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     "description": "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     "skills": "Shopify, Web Design, Data Entry",
//     "client_location": "United States",
//     "url": "www.google.com",
//     "source": "scraping",
//     "status": true
// }

const readJobsController = async (req, res) => {
    let jobs;
    try {
        jobs = await jobService.readJobs();
        res.status(200).json(jobs); // [] con los jobs encontrados
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman
// GET http://localhost:3000/api/jobs

const updateJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    filter = req.query;
    update = req.body;
    try {
        const modifiedJob = await jobService.updateJob(filter, update);
        res.status(200).json(modifiedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Prueba Postman
// PUT http://localhost:3000/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages
// {
//     "title": "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     "description": "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     "skills": "Shopify, Web Design, Data Entry",
//     "client_location": "United States",
//     "url": "www.google.com",
//     "source": "scraping",
//     "status": false
// }

const deleteJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let jobs;
    try {
        jobs = await jobService.deleteJob(req.query.title);
        res.status(200).json(jobs); // [] con los jobs encontradas
    } catch (error) {
        res.status(500).json({ error: "Error from database" });
    }
};
// Prueba Postman
// DELETE http://localhost:3000/api/jobs?title=Experienced Virtual Assistant for Creating Shopify Landing/Product Pages


const createFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newFavorite = req.body;
    if (
        "user_id" in newFavorite &&
        "job_id" in newFavorite
    ) {
        try {
            const response = await favorite.createFavorite(newFavorite);
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
// POST http://localhost:3000/api/favorites
// {
//     "user_id": 4,
//     "job_id": "2"
// }

const readFavoritesController = async (req, res) => {
    let favorites;
    try {
        favorites = await favorite.readFavorites();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// Prueba Postman
// GET http://localhost:3000/api/favorites

const deleteFavoriteController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let favorites;
    try {
        favorites = await favorite.deleteFavorite(req.query.user_id, req.query.job_id);
        res.status(200).json(favorites); // [] con las users encontradas
    } catch (error) {
        res.status(500).json({ error: 'Error en la BBDD' });
    }
}
// Prueba Postman
// DELETE http://localhost:3000/api/favorites?user_id=4&job_id=2

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
    createJobController,
    readJobsController,
    updateJobController,
    deleteJobController,
    createFavoriteController,
    readFavoritesController,
    deleteFavoriteController,
    // recoverPassword,
    // restorePassword
}


