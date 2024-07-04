// General Variables
const fragment = document.createDocumentFragment();


/* *********************EVENTS**********************/

document.addEventListener('DOMContentLoaded', () => validateForm());

// evento - User CREATE
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formSignUp')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const role = "user";

        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/login', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// evento - User UPDATE (by User)
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formProfile')) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const old_email = document.querySelector('#formProfile').getAttribute("data");

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: "user", old_email: old_email })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Profile updated');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (event.target.matches('#formLogIn')) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Found user: ', data);

                if (data.length <= 0) {
                    return alert("Incorrect user or password");
                }

                fetch('http://localhost:3000/api/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: password })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Login data: ', data);
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

document.addEventListener('click', (event) => {
    if (event.target.matches('#linkLogout')) {
        fetch('http://localhost:3000/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logout data: ', data);
                window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function getSignedInUserEmail() {
    const token = getCookie('token');
    console.log('Token:', token); // Debug token
    if (token) {
        const decoded = jwt_decode(token);
        const { email, role } = decoded;
        console.log('Email:', email);
        console.log('Role:', role);
        return email;
    } else {
        console.log('Token not found');
        return null;
    }
}

// evento - User UPDATE (by Admin)
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formUser')) {
        event.preventDefault();
        const formElement = document.querySelector('#formUser');
        const old_email = formElement.getAttribute('data-email');
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const role = event.target.role.value;
        console.log(role)

        fetch('http://localhost:3000/api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password, role: role, old_email: old_email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/users', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    alert('Profile updated');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - User DELETE (by User)
document.addEventListener('click', (event) => {
    if (event.target.matches('#deleteButton')) {
        event.preventDefault();
        const deleteButton = document.querySelector("#deleteButton")
        const email = deleteButton.getAttribute("dataEmail");

        fetch('http://localhost:3000/api/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logout data: ', data);
                // window.location.href = '/login';
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            document.open();
                            document.write(html);
                            document.close();
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - User DELETE (by Admin)
document.addEventListener('click', (event) => {
    if (event.target.matches('.deleteUserButton')) {
        event.preventDefault();
        const email = event.target.value;

        fetch(`http://localhost:3000/api/user?email=${email}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/users', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Favorito CREATE
document.addEventListener('click', (event) => {
    if (event.target.matches('.favButtonCreate')) {
        event.preventDefault();
        const favButtonCreate = document.querySelector('.favButtonCreate');
        const email = favButtonCreate.getAttribute('dataEmail');
        const jobID = event.target.value;

        fetch('http://localhost:3000/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, job_id: jobID })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/favorites', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Favorite DELETE
document.addEventListener('click', (event) => {
    if (event.target.matches('.favButtonDelete')) {
        event.preventDefault();
        const favButtonDelete = document.querySelector('.favButtonDelete');
        const email = favButtonDelete.getAttribute('dataEmail');
        const jobID = event.target.value;

        fetch(`http://localhost:3000/api/favorites?email=${email}&job_id=${jobID}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/favorites', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Job CREATE
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formDashboard')) {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const skills = event.target.skills.value;
        const arraySkills = [skills];
        console.log(arraySkills)
        const client_location = event.target.client_location.value;
        const url = event.target.url.value;


        fetch('http://localhost:3000/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, skills: arraySkills, client_location: client_location, url: url, source: 'admin', status: true })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Evento - Job DELETE
document.addEventListener('click', (event) => {
    if (event.target.matches('.deleteJobButton')) {
        event.preventDefault();
        const title = event.target.value;

        fetch(`http://localhost:3000/api/jobs?title=${title}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// evento - Job UPDATE - NO CONSIGO QUE ARRANQUE
document.addEventListener('submit', (event) => {
    if (event.target.matches('#formJob')) {
        event.preventDefault();
        console.log('boton funciona')
        const formElement = document.querySelector('#formJob');
        const old_title = formElement.getAttribute('data-title');
        const title = event.target.title.value;
        const description = event.target.description.value;
        const skills = [event.target.skills.value];
        const client_location = event.target.client_location.value;
        const url = event.target.url.value;

        fetch(`http://localhost:3000/api/jobs?title=${old_title}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title, description: description, skills: skills, client_location: client_location, url: url, source: 'admin', status: true })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    console.error('Validation errors:', data.errors);
                    for (i = 0; i < data.errors.length; i++) {
                        console.log('Validation errors: ' + JSON.stringify(data.errors[i].msg));
                    }
                } else {
                    console.log('Success:', data);

                    fetch('http://localhost:3000/dashboard', {
                        method: 'GET'
                    })
                        .then(response => response.text())
                        .then(html => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    alert('Job updated');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// btn ir a Job Editor desde Dashboard
document.addEventListener('click', (event) => {
    if (event.target.matches('.goToEditJob')) {
        event.preventDefault();
        const job_id = event.target.value;
        console.log(job_id)

        fetch(`http://localhost:3000/job-editor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ job_id: job_id })
        })

            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// btn ir a User Editor desde User Dashboard
document.addEventListener('click', (event) => {
    if (event.target.matches('.goToEditUser')) {
        event.preventDefault();
        const email = event.target.value;
        console.log(email)
        console.log('probando evento gotoedit')

        fetch(`http://localhost:3000/user-editor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })

            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});











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

// Filtro keyword
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchKeyword')) {
        event.preventDefault();
        const keyword = event.target.keyword.value;

        fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword: keyword })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

// Filtro skill
document.addEventListener('submit', (event) => {
    if (event.target.matches('.searchSkill')) {
        event.preventDefault();
        const skill = event.target.skill.value;

        fetch('http://localhost:3000/searchbyskill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ skill: skill })
        })
            .then(response => response.text()) // Cambiamos a response.text() para manejar HTML
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});



/**** SCRIPT SIGNUP.PUG *****/

const validateForm = () => {
    const form = document.querySelector('.cardForms');
    const email = document.querySelector('.email');
    const password = document.querySelector('.password');
    const confirmPassword = document.getElementById('confirmPassword');
    const inputs = document.querySelectorAll('input');
    const passwordInstructions = document.getElementById('instructions');
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^.{8}$/;

    passwordInstructions.style.display = 'none';

    password.addEventListener('focus', () => {
        passwordInstructions.style.display = 'block';
    });

    password.addEventListener('blur', () => {
        passwordInstructions.style.display = 'none';
    });

    email.addEventListener('input', () => {
        if (email.checkValidity()) {
            email.classList.remove('error');
        } else {
            email.classList.add('error');
        }
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (!passwordRegex.test(password.value)) {
            password.classList.add('error');
            isValid = false;
            passwordInstructions.style.display = 'block';
        } else {
            password.classList.remove('error');
        }

        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('error');
            confirmPassword.setCustomValidity('Passwords do not match');
            isValid = false;
        } else {
            confirmPassword.classList.remove('error');
            confirmPassword.setCustomValidity('');
        }

        if (isValid === false) {
            event.preventDefault();
        }
    });

    window.onload = () => {
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('googleSignInButton'),
            { theme: 'outline', size: 'large' } // opciones de personalización del botón
        );
        google.accounts.id.prompt(); // muestra la ventana emergente de inicio de sesión de Google
    };

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        // Aquí puedes enviar el token al servidor o manejarlo como necesites
    }
};


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