const jobService = require('../services/jobs.services');
const scraper = require('../utils/scraper');
const apiController = require('./api.controllers');

const urlToptal = 'https://www.toptal.com/freelance-jobs/developers/jobs/';
const urlFreelancer = 'https://www.freelancer.es/jobs/php_html_css_javascript_nodejs_java/?featured=true&languages=en';

const getHome = async (req, res) => {
    try {
        // Obtener todos los trabajos actualizados desde la base de datos
        let updatedJobs = await jobService.readJobs();
        console.log('comprobando updatedJobs')

        res.status(200).render("home.pug", { jobs: updatedJobs });
    } catch (error) {
        res.status(404).json({})
    }
}

const getScraping = async (req, res) => {
    try {
        // Primero obtenemos los jobs actuales en mongodb
        let currentJobs = await jobService.readJobs();

        // scraping para obtener los jobs nuevos
        console.log('Starting scraping...');
        let scrapedJobs = await scraper.scrap(urlToptal, urlFreelancer);
        let scrapedJobTitles = scrapedJobs.map(job => job.title);

        for (let job of scrapedJobs) {

            job.source = "scraping";
            job.status = true;

            // Crear una petición simulada
            let mockReq = {
                body: job,
            };
            let mockRes = {
                status: (statusCode) => ({
                    json: (response) => {
                        console.log("Mock response status:", statusCode);
                        console.log("Mock response data:", response);
                    }
                })
            };
            await apiController.createJobController(mockReq, mockRes);
        }

        // Desactivar trabajos que ya no estén presentes en el scraping
        console.log('comprobando jobstoDeactive')
        let jobsToDeactivate = currentJobs.filter(job => !scrapedJobTitles.includes(job.title));
        console.log(jobsToDeactivate)

        jobsToDeactivate.forEach(async (job) => {
            console.log('titulo viejo encontrado2')
            await jobService.updateJob({title: job.title}, {status: false})
            // await job.save();
            console.log('comprobando jobstoDeactive22')
        })

        // Obtener todos los trabajos actualizados desde la base de datos
        let updatedJobs = await jobService.readJobs();
        console.log('comprobando updatedJobs')

        res.status(200).render("home.pug", { jobs: updatedJobs });
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
    getScraping,
    getSignup,
    getLogin,
    getFavorites,
    getProfile,
    getUsers,
    getDashboard
}