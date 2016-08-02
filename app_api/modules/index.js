'use strict';

require('./todo/');
require('./user/');

let express = require('express');
let router = express.Router();
let _ = require('lodash');
let todoRoute = require('./todo/routes/todo.routes');
let userRoute = require('./user/routes/user.routes');

router.use('/todo',todoRoute);
router.use('/user',userRoute);

module.exports = router;