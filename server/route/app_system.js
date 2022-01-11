const express = require('express');
const router = express.Router();
const app_system = require("../controllers/appSystemController")

router.get('/allapp',app_system.allapp)

module.exports=router

