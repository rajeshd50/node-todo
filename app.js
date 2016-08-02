'use strict';

let express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  config = require('./app_api/config/config').config,
  routes = require('./app_api/modules/index'),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  unless = require('express-unless'),
  checkValidation = require('./app_api/modules/user/controllers/user-middleware-check');

let app = express();

let unprotectedRoute = [
    '/api/user/authenticate',
    '/api/user/register'
];

require('./app_api/db/');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressJwt({
  secret: config.jwtSecret,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if(req.body && req.body.token) {
    	return req.body.token;
    }
    return null;
  }
}).unless({
  path: unprotectedRoute
}));

app.use(checkValidation().unless({path: unprotectedRoute}));

app.use('/api', routes);

app.use((err, req, res, next) => {
  if (err.constructor.name === 'UnauthorizedError') {
    let message = err.inner && err.inner.message || 'Unauthorized access!!';
    return res.status(401).json({ message: message });
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = app;
