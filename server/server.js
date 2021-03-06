const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); //ตั้งค่าระบบ

const app_system = require("./route/app_system");
const employees = require("./route/employees");
const userlogs = require("./route/userlogs");
const authRoute = require("./route/auth")

const app = express();

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("เชื่อมต่อเรียบร้อย"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.use('/api/app_system',app_system)
app.use('/api/employees',employees)
app.use('/api/userlogs',userlogs)
app.use('/api/auth',authRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`start server in port ${port}`));