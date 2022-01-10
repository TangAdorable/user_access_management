const express = require('express');
const router = express.Router();
const employees = require("../controllers/employeesController")

router
.post('/create',employees.create)
.get('/allemp',employees.getallemp)
.get('/emp/:UserID',employees.singleemp)
.delete('/emp/:UserID',employees.removeemp)
.put('/emp/:UserID',employees.updateemp)


module.exports=router

