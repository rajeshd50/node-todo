let express = require('express');
let router = express.Router();
let todoCtrl = require('../controllers/todo.controller');
	// multiparty = require('connect-multiparty'),
	// middleWare = multiparty();

router.get('/list', todoCtrl.listTodo);
router.get('/single/:todoId', todoCtrl.getSingle);
router.post('/create',todoCtrl.createTodo);
router.put('/update/:todoId',todoCtrl.updateTodo);
router.delete('/remove/:todoId',todoCtrl.removeTodo);

router.param('todoId',todoCtrl.todoByID);

module.exports = router;