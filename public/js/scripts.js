console.log("scripts.js");

// Filtro por título - home.pug
document.addEventListener('input', ({ target }) => {

    if (target.matches('#searchTitle')) {
        filterJobs(target);
    }

});

const filterJobs = (target) => {
    const jobsFiltered = jobs.filter(obj => obj.title.toLowerCase().includes(target.value.toLowerCase()));
    updateJobList(jobsFiltered)
    // combineAllListsFilters();
}

const updateJobList = (jobsFiltered) => {
    const articles = document.querySelectorAll('#jobsContainer article');

    articles.forEach(article => {
        const title = article.getAttribute('data-jobTitle').toLowerCase();
        const isVisible = jobsFiltered.some(job => job.title.toLowerCase() === title);
        article.style.display = isVisible ? 'block' : 'none';
    });
}