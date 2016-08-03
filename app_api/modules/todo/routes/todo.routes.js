let express = require('express');
let router = express.Router();
let todoCtrl = require('../controllers/todo.controller'),
	multiparty = require('connect-multiparty'),
	middleWare = multiparty();

router.get('/list', todoCtrl.listTodo);
router.post('/create',middleWare,todoCtrl.createTodo);
router.post('/update/:todoId',middleWare,todoCtrl.updateTodo);
router.delete('/remove/:todoId',todoCtrl.removeTodo);

router.param('todoId',todoCtrl.todoByID);

module.exports = router;