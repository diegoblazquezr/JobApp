//const { response } = require('express');
const jobService = require('../services/jobs.services');
const { validationResult } = require("express-validator");


const postUser = async (req, res) => {

}

const putUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

const postLogin = async (req, res) => {

}

const postLogout = async (req, res) => {

}

const listJobsController = async (req, res) => {
    let jobs;
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        jobs = await jobService.listJobs();
        res.status(200).json(jobs); // [] con los jobs encontrados
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createJobController = async (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, skills, client_location } = req.body;
    if (title && description && skills && client_location) {
        try {
            const response = await jobService.createJob(title, description, skills, client_location);
            res.status(201).json({
                "items_created": response,
                data: req.body
            });
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    } else {
        res.status(400).json({ error: "Missing fields" });
    }
};

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

const postFavorites = async (req, res) => {

}

const deleteFavorites = async (req, res) => {

}

const recoverPassword = async (req, res) => {

}

const restorePassword = async (req, res) => {

}

module.exports = {
    // postUser,
    // putUser,
    // deleteUser,
    // postLogin,
    // postLogout,
    listJobsController,
    createJobController,
    updateJobController,
    deleteJobController,
    // postFavorites,
    // deleteFavorites,
    // recoverPassword,
    // restorePassword
}