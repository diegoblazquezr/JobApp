// General Variables
const fragment = document.createDocumentFragment();

//**** SCRIPT HEADER.PUG **** */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

//**** SCRIPT HOME.PUG **** */

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

//**** SCRIPT FOOTER.PUG **** */

// Function that randomly shuffles the contents of an array
const shuffleArray = (array) => {
    //console.log('Primer array', array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        //console.log(i, j, array);
    }
    return array;
};

// Footer Logic
const generateFooter = () => {
    const developers = [
        {
            name: 'Emilio Latorre Guerra',
            github: 'https://github.com/emiliolatorre'
        },
        {
            name: 'Eduardo Fatou Cerrato',
            github: 'https://github.com/EduFatou'
        },
        {
            name: 'Diego Blázquez Rosado',
            github: 'https://github.com/diegoblazquezr'
        }
    ];
    const footerDevsContainer = document.querySelector('#footer-devs-container');
    shuffleArray(developers);
    developers.forEach((element) => {
        const spanDev = document.createElement('SPAN');
        spanDev.innerHTML = `${element.name} <a href="${element.github}" target="_blank"><i class="fa-brands fa-github fa-lg" style="color: #ffffff;"></i></a>`;
        fragment.append(spanDev);
    });
    footerDevsContainer.append(fragment);
};

// Function Calls
generateFooter();