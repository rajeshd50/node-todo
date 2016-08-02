'use strict';


function getToken(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if(req.body && req.body.token) {
    	return req.body.token;
    }
    return null;
}

module.exports = (config)=> {
	let checkValidation = (req,res,next)=> {
		let token = getToken(req),
			user = req.user;
		//check here
		next();
	};

	checkValidation.unless = require('express-unless');

	return checkValidation;
}