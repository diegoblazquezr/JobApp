const getHome = async (req, res) => {
    res.render("home.pug");
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