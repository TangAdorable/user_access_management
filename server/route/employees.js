const express = require('express');
const router = express.Router();
const employees = require("../controllers/employeesController")
const {requireLogin} = require("../controllers/authController")

router
.post('/create',requireLogin,employees.create)
.get('/allemp',requireLogin,employees.getallemp)
.get('/emp/:UserID',requireLogin,employees.singleemp)
.delete('/emp/:UserID',requireLogin,employees.removeemp)
.put('/emp/:UserID',requireLogin,employees.updateemp)


module.exports=router

