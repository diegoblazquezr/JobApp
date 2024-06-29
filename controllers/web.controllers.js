const { createJob } = require('../services/jobs.services');
const scraper = require('../utils/scraper');
const apiController = require('./api.controllers');

const getHome = async (req, res) => {
    try {
        // ---Descomenta las 2 siguientes líneas para hacer scraping---
        let jobs = await scraper.scrap("https://www.toptal.com/freelance-jobs/developers/jobs/");
        // jobs.forEach(job => {
        //     createJob(job);
        // })
        res.status(200).render("home.pug", { jobs });
    } catch (error) {
        res.status(404).json({})
    }

}

const getSignup = async (req, res) => {
    res.render("signup.pug");
}

const getLogin = async (req, res) => {
    res.render("login.pug");
}

const getFavorites = async (req, res) => {
    res.render("favorites.pug");
}

const getProfile = async (req, res) => {
    res.render("profile.pug");
}

const getUsers = async (req, res) => {
    res.render("users.pug");
}

const getDashboard = async (req, res) => {
    res.render("dashboard.pug");
}

module.exports = {
    getHome,
    getSignup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getDashboard
}