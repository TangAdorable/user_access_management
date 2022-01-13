const userlogs = require("../models/userlogs")

exports.addlogs=(req,res)=>{
    let {UserID,App_name,Access,App_status,TicketID,Note}=req.body

    switch(true){
        case !App_name:
            return res.status(400).json({error:"choose app/system"})
        case !Access:
            return res.status(400).json({error:"choose access"})
        }

    if (App_status === ""){
        App_status = "Test";
    }

    userlogs.create({UserID,App_name,Access,App_status,TicketID,Note},(err,log)=>{
        if(err){console.log(err) }
        res.json(log)
    })

}

exports.alllogs=(req,res)=>{
    userlogs.find({}).exec((err,all)=>{
        res.json(all)
    })
}

exports.userlog=(req,res)=>{
    const{UserID} = req.params
    userlogs.find({UserID}).exec((err,user)=>{
        res.json(user)
    })
}

exports.updatelog=(req,res)=>{
    const {_id} = req.params
    const {App_status,TicketID,Note}=req.body

    userlogs.findByIdAndUpdate({_id},{App_status,TicketID,Note},{new:true})
    .exec((err,update)=>{
        res.json(update)
    })
}

