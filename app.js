var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const basicAuth = require('express-basic-auth');
const sslRedirect = require('heroku-ssl-redirect');

var app = express();

const resolvedPath = path.resolve(__dirname, './src/config/' + process.env.NODE_ENV + '.env');
dotenv.config({path: resolvedPath});

// view engine setup
app.set('views', path.join(__dirname, 'src/resources/ejs'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


if (process.env.NODE_ENV === 'production') {
    app.use(basicAuth({
        users: {'bifrost': process.env.BASIC_AUTH_PASSWORD},
        challenge: true
    }))
}

app.use(sslRedirect(['production', 'dev', 'staging']));
app.use(express.static(path.join(__dirname, '/src/resources')));
app.use('/healthcheck', require('express-healthcheck')());
app.use('/heroku', require('./src/controllers/herokuController'));
app.use('/', require('./src/filter/ClientConfigRequestFilter').loadClientConfig);
app.use('/', require('./src/routes/demoshopRoutes'));

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: 'Error'});
});

module.exports = app;
