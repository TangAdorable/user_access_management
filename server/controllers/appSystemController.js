const app_system = require("../models/app_system")

exports.allapp=(req,res)=>{
    app_system.find({}).exec((err,allapp)=>{
        res.json(allapp)
    })
}