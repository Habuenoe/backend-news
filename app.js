// REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CONECTION TO BD
mongoose.connection.openUri('mongodb://localhost:27017/newsDB', (err, res) => {
    if (err) throw err;
    console.log('DATA BASE: \x1b[33m%s\x1b[0m ', ' online');
});

// IMPORT ROUTES
var appRoutes = require('./routes/app');
var newRoutes = require('./routes/new');

// ROUTES
app.use('/new', newRoutes);
app.use('/', appRoutes);

// LISTEN REQUESTS
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m ', ' online');
});


