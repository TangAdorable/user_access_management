const express = require('express');
const router = express.Router();
const userlogs = require("../controllers/userlogController")
const {requireLogin} = require("../controllers/authController")

router
.post('/addlogs',requireLogin,userlogs.addlogs)
router.get('/alllogs',requireLogin,userlogs.alllogs)
.get('/userlog/:UserID',requireLogin,userlogs.userlog)
.get('/singlelog/:_id',requireLogin,userlogs.singlelog)
.put('/updatelog/:_id',requireLogin,userlogs.updatelog)


module.exports=router


