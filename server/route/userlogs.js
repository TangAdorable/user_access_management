const express = require('express');
const router = express.Router();
const userlogs = require("../controllers/userlogController")

router
.post('/addlogs',userlogs.addlogs)
.get('/alllogs',userlogs.alllogs)
.get('/userlog/:UserID',userlogs.userlog)
.get('/singlelog/:_id',userlogs.singlelog)
.put('/updatelog/:_id',userlogs.updatelog)


module.exports=router


