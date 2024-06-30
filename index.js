const express = require("express");
const app = express(); // Initialize server
const port = 3000;

// Import Middlewares
const morgan = require('./middlewares/morgan');

// Middlewares
app.use(morgan(':method :url :status - :response-time ms :body'));

// Routes
const webRoutes = require("./routes/web.routes");
const apiRoutes = require("./routes/api.routes");

// View engine setup
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public')); // Serve static files
app.use(express.json()); // Habilito recepción de JSON en servidor

// API Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Job App listening on http://localhost:${port}`);
});