'use strict';

let _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo');

let sendJSON = (res, status, content)=> {
  res.status(status);
  res.json(content);
};

exports.listTodo = (req,res)=> {
	Todo.find({
		user: req.user.userId
	},(err,data)=>{
		if(err) {
			return sendJSON(res,404,{message:'Not found!!'});
		}
		return sendJSON(res,200,data);
	})
}

exports.createTodo = (req,res)=> {
	req.body.user = req.user.userId;

	let todo = new Todo(req.body);
	todo.save( (err,data)=> {
		if(err) {
			return sendJSON(res,400,{message:'Error, not saved'});
		}
		return sendJSON(res,201,{message:'Created!!'});
	})
}