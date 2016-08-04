'use strict';

let _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  mongoose = require('mongoose'),
  Todo = mongoose.model('Todo');

let sendJSON = (res, status, content) => {
  res.status(status);
  res.json(content);
};

exports.listTodo = (req, res) => {
  Todo.find({
    user: req.user.userId
  }, (err, data) => {
    if (err) {
      return sendJSON(res, 404, { message: 'Not found!!' });
    }
    return sendJSON(res, 200, data);
  })
}

exports.getSingle = (req, res) => {
  return sendJSON(res, 200, req.todoObj);
}

exports.createTodo = (req, res) => {
  req.body.user = req.user.userId;

  let keyType = Object.keys(req.files);
  if (keyType.length > 0) {
    let fileObj = req.files[keyType[0]];
    req.body.file = {
      path: path.join('uploads', fileObj.uuid, fileObj.field, fileObj.filename),
      uuid: fileObj.uuid,
      type: fileObj.field
    }
  }
  let todo = new Todo(req.body);
  todo.save((err, data) => {
    if (err) {
      return sendJSON(res, 400, { message: 'Error, not saved' });
    }
    return sendJSON(res, 201, data);
  })
}
exports.updateTodo = (req, res) => {
  let todoObj = req.todoObj;

  if (req.files) {
    let keyType = Object.keys(req.files);
    if (keyType.length > 0) {
      let fileObj = req.files[keyType[0]];
      req.body.file = {
        path: path.join('uploads', fileObj.uuid, fileObj.field, fileObj.filename),
        uuid: fileObj.uuid,
        type: fileObj.field
      }
    }
  }

  for (var key in req.body) {
    todoObj[key] = req.body[key];
  }

  todoObj.save((err, data) => {
    if (err || !data) {
      return res.status(400).send({
        message: 'Some error occured'
      });
    }
    return res.status(200).json(data);
  });
};

exports.removeTodo = (req, res) => {
  let todoObj = req.todoObj;

  todoObj.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: 'Some error occured while deleting the todo'
      });
    } else {
      res.status(200).json(todoObj);
    }
  });
};

exports.todoByID = (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Todo id is invalid'
    });
  }
  Todo.findOne({
    _id: id,
    user: req.user.userId
  }).exec(function(err, todoObj) {
    if (err) {
      return next(err);
    } else if (!todoObj) {
      return res.status(404).send({
        message: 'No todo with that id has been found'
      });
    }
    req.todoObj = todoObj;
    next();
  });
};
