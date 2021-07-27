require('./global_functions');
const config = require('./config.json');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const xml2js = require('xml2js');


const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('client-sessions');
const expressValidator = require('express-validator');
//const multer = require('multer');
const request = require('request');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const index = require('./routes/index');
const api = require('./routes/api');
const login = require('./routes/user/login');
const registrarse = require('./routes/user/registrarse');
const cambiarPassword = require('./routes/user/cambiarPassword');
const recuperar = require('./routes/user/recuperar');
const configuracion = require('./routes/config/configuracion');
const ABMusuarios = require('./routes/user/ABMusuarios');
const cliente = require('./routes/cliente/cliente');


const app = express();

// mongoose conexion, dato en archivo config.json dentro de la carpeta raiz
let stringConexion = 'None';
if (app.get('env') == 'development') {
	stringConexion = config.ConnectionString
}
if (app.get('env') == 'production') {
	stringConexion = config.ConnectionStringHeroku;
}
console.log('Enviroment: ', app.get('env'));
console.log('MongoDB: ', stringConexion);
mongoose.connect(stringConexion ,{ useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true });
mongoose.connection.on('error', function(err){
	console.log(' \x1b[41m%s\x1b[0m','Error al intentar conectar con MongoDB.', 'Mensaje: ' + err.message);
	process.exit();
});
// esta linea crea el usuario Administrador
const crear = require('./models/crearUsuarioAdmin');

//sesiones
app.use(session({
	cookieName: 'session',
	secret: 'bvbakusdyXadAS123a',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}));

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs',handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', '.hbs');
app.use('/public', express.static('public'));


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/', login);
app.use('/index', index);
app.use('/api', api);
app.use('/registrarse', registrarse);
app.use('/cambiarPassword', cambiarPassword);
app.use('/recuperar', recuperar);
app.use('/Configuracion', configuracion);
app.use('/ABMusuarios', ABMusuarios);
app.use('/Clientes', cliente);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
