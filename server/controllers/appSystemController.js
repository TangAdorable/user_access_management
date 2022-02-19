const app_system = require("../models/app_system")

/* A function that returns all the app_system data. */
exports.allapp=(req,res)=>{
    app_system.find({}).exec((err,allapp)=>{
        res.json(allapp)
    })
}