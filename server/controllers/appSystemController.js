const app_system = require("../models/app_system")

/* A function that returns all the app_system data. */
exports.allapp=(req,res)=>{
    app_system.find({}).exec((err,allapp)=>{
        res.json(allapp)
    })
}


exports.create=(req,res)=>{
    const {app_name,name_access} = req.body

    switch(true){
        case !app_name:
            return res.status(400).json({error:"กรอกข้อมูล Application"})
            break;
        case !name_access:
            return res.status(400).json({error:"กรอกข้อมูล Access"})
            break;
    }

    app_system.create({app_name,name_access},(err,create)=>{
        if(err) console.log(err)
        res.json(create)
    })
}