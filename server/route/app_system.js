const express = require('express');
const router = express.Router();
const app_system = require("../controllers/appSystemController")
const {requireLogin} = require("../controllers/authController")

router.get('/allapp',requireLogin,app_system.allapp)

module.exports=router

