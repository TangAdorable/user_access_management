const express = require('express');
const router = express.Router();
const {create} = require("../controllers/employeesController")

router.post('/create',create)


module.exports=router