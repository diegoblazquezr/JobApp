// General Variables
const fragment = document.createDocumentFragment();

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