const scraper = require('../utils/scraper');
const urlToptal = 'https://www.toptal.com/freelance-jobs/developers/jobs/';
const urlFreelancer = 'https://www.freelancer.es/jobs/php_html_css_javascript_nodejs_java/?featured=true&languages=en';

const getHome = async (req, res) => {
    try {
        // ---Descomenta las 2 siguientes líneas para hacer scraping---
        let jobs = await scraper.scrap(urlToptal, urlFreelancer);
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