const sslRedirect = require('heroku-ssl-redirect');
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import dotenv from 'dotenv';
import basicAuth from 'express-basic-auth';

// dotenv | declare before custom imports / routes
dotenv.config({ path: path.join(__dirname, `config/${process.env.NODE_ENV}.env`) });

import { errorService, pageNotFoundService } from "./services/error.service";
import shopRoutes from "./routes/shop.routes";
import { herokuService } from "./services/heroku.service";

// vars
const app = express();
const user = process.env.BASIC_AUTH_USER;
const password = process.env.BASIC_AUTH_PASSWORD;
const basicAuthUsers: { [key: string]: any } = {};
if (user?.length) basicAuthUsers[user] = password;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/assets/views');
app.use(express.static(path.join(__dirname, '/assets')));

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sslRedirect(['production', 'dev', 'staging']));

// basic auth
if (process.env.NODE_ENV === 'production')
    app.use('/admin/', basicAuth({ users: basicAuthUsers, challenge: true }));

// routes
app.get('/healthcheck', require('express-healthcheck')());
app.get('/heroku', herokuService);
app.use('/', shopRoutes);


// catch 404 and forward to error handler
app.use('*', pageNotFoundService);


// error handling | route comes last
app.use(errorService);


export default app;
