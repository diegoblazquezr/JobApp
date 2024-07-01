const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: Array, 
        required: true
    },
    client_location: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    // date:{
    //     type: new Date("<YYYY-mm-dd>")
    // },
    source: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
};

// Crear el esquema
const jobSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

// Insertar un producto
// const j = new Job({
//     title: "Need an online database with different users login",
//     description: "Need a small customized database that will have different levels of users permission based login. database was initially developed in MS Access. Now need a cloud based version.",
//     skills: "PHP, Python, MySQL, JavaScript",
//     client_location: "United States",
//     url: 'www.google.com',
//     source: 'scraping',
//     status: true
// });

// Guardar en la BBDD
// j.save()
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// Buscar en la BBDD
// Job.find({}).then(data=>console.log(data));

// 