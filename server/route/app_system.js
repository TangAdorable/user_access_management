const express = require('express');
const router = express.Router();
const app_system = require("../controllers/appSystemController")
const {requireLogin} = require("../controllers/authController")

router
.post('/create',app_system.create)
.get('/allapp',app_system.allapp)
.put('/updateSingleApp/:app_name',app_system.updateSingleApp)

module.exports=router

