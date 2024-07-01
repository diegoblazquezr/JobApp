const Job = require('../models/jobs.model');

const createJob = async (title, description, skills, client_location, url, source, status) => {
        try {
            // Busca el trabajo existente por título y descripción
            const existingJob = await Job.findOne({ title, description });
            if (existingJob) {
                // Si existe en mongodb, actualiza el trabajo
                existingJob.skills = skills;
                existingJob.client_location = client_location;
                existingJob.url = url;
                existingJob.source = source;
                existingJob.status = status;
                return await existingJob.save();
            } else {
                // Si no existe en mongodb, crea una nuevo
                const job = new Job({
                    title,
                    description,
                    skills,
                    client_location,
                    url,
                    source,
                    status
                });

                const result = await job.save();
                console.log(result);
                return result;
            }
        } catch (error) {
            console.log('Error creating job:', error);
        }
    };
// createJob('Twitter embed from website shared to twitter','having issue with embedding correctly an image into our twitter share . see screenhots where image is missing, quick and easy task, looking forward to hearing from you', 'Twitter/X, HTML, JavaScript', 'Spain', 'hola.com', 'scraping', 'true');

const readJobs = async () => {
    try {
        const jobs = await Job
            .find()
            .select('title description skills client_location url source status -_id')
        console.log(jobs);
        return jobs;
    } catch (error) {
        console.log('Error listing jobs:', error);
    }
};
// readJobs();

const updateJob = async (filter, update) => {
    try {
        const modifiedJob = await Job
            .findOneAndUpdate(filter, update, {
                new: true
            });
        console.log(modifiedJob);
        return modifiedJob;
    } catch (error) {
        console.log('Cannot update job, error:', error)
    }
};
// updateJob({title: 'Twitter embed from website shared to twitter'},
// {
//     title: "Experienced Virtual Assistant for Creating Shopify Landing/Product Pages",
//     description: "We are looking for an experienced virtual assistant who can help us create stunning landing and product pages on Shopify for our multiple e-commerce brands.",
//     skills: "Shopify, Web Design, Data Entry",
//     client_location: "United States",
//     url: 'hola.com',
//     source: 'scraping',
//     status: false
// });

const deleteJob = async (filter) => {
    try {
        const removedJob = await Job
            .deleteOne({ 'title': filter });
        console.log(removedJob);
        return removedJob;
    } catch (error) {
        console.log('Error deleting job:', error);
    }
};
//deleteJob("Experienced Virtual Assistant for Creating Shopify Landing/Product Pages");

module.exports = {
    createJob,
    readJobs,
    updateJob,
    deleteJob
};