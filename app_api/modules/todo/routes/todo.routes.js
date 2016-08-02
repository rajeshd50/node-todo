let express = require('express');
let router = express.Router();
let todoCtrl = require('../controllers/todo.controller');

router.get('/list', todoCtrl.listTodo);
router.post('/create',todoCtrl.createTodo);

module.exports = router;