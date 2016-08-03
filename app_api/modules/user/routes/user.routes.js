let express = require('express');
let router = express.Router();
let userCtrl = require('../controllers/user.controller');

router.post('/authenticate', userCtrl.authenticate);
router.post('/register',userCtrl.createUser);
router.post('/validate',userCtrl.checkToken);
router.get('/logout',userCtrl.logout);

module.exports = router;