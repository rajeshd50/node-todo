'use strict';
let _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require('../../../config/config').config,
  jwt = require('jsonwebtoken'),
  User = mongoose.model('User');

let TOKEN_EXPIRATION = 60*24;

exports.authenticate = (req,res)=> {
	if(!req.body.userName) {
		return res.status(400).send({message:'Username is required!'});
	}
	if(!req.body.password) {
		return res.status(400).send({message:'Password is required!'});
	}

	User.findOne({
		userName: req.body.userName
	},(err,user)=> {
		if(err) {
			return res.status(500).send({message:'Something wrong!'});
		}
		if(!user) {
			return res.status(404).send({message:'User not found!'});
		}
		user.comparePassword(req.body.password,(err,isMatch)=> {
			if(err) {
				return res.status(403).send({message:'Password is wrong!'});
			}
			let token = jwt.sign({
					userName: req.body.userName,
					userId: user._id
				},config.jwtSecret);
			res.status(200).json({message:'Success!',token:token});
		});
	})
};

exports.createUser = (req,res)=> {
	if(!req.body.userName) {
		return res.status(400).send({message:'Username is required!'});
	}
	if(!req.body.password) {
		return res.status(400).send({message:'Password is required!'});
	}
	let user = new User(req.body);

	user.save((err,data)=> {
		if(err || !data) {
			return res.status(500).send({message:'Something wrong!'});
		}
		delete data.password;
		return res.status(201).json(data);
	});
}