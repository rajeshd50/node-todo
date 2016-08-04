'use strict';

let express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  config = require('./app_api/config/config').config,
  routes = require('./app_api/modules/index'),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  unless = require('express-unless'),
  checkValidation = require('./app_api/modules/user/controllers/user-middleware-check');

let expressBusboy = require('express-busboy');
let app = express();

let unprotectedRoute = [
  '/api/user/authenticate',
  '/api/user/register'
];

require('./app_api/db/');

expressBusboy.extend(app, {
    upload: true,
    path: path.join(__dirname, 'uploads/'),
    allowedPath: path.join(__dirname, 'uploads/')
});

app.use('/download',express.static(path.join(__dirname, 'uploads/')));

app.use(logger('dev'));

app.use((req, res, next)=> {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use(expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.body && req.body.token) {
      return req.body.token;
    }
    return null;
  }
}).unless({
  path: unprotectedRoute
}));

app.use(checkValidation().unless({ path: unprotectedRoute }));

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err.constructor.name === 'UnauthorizedError') {
    let message = err.inner && err.inner.message || 'Unauthorized access!!';
    return res.status(401).json({ message: message });
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
