
//constants used for the configuration
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

//Variables used for the configuration
var bodyParser = require('body-parser');
var session = require('express-session');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//routes
app.use(require('./routes/routes'));
app.use(require('./routes/consulta'));
app.use(require('./routes/importar'));
app.use(require('./routes/authentication'));

//statis files
app.use(express.static(path.join(__dirname, 'public')));

//Global variables
app.use((req, res, next) => {
    next();
})

//listenig the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});