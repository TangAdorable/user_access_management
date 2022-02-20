const userlogs = require("../models/userlogs")

exports.addlogs=(req,res)=>{
    let {UserID,App_name,Access,App_status,TicketID,Note}=req.body

    switch(true){
        case !App_name || App_name === 'select option 1':
            return res.status(400).json({error:"เลือก Acclication Name"})
            break;
        case !Access || Access === 'select option 2':
            return res.status(400).json({error:"เลือก Access"})
            break;
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

exports.singlelog=(req,res)=>{
    const {_id} = req.params
    userlogs.findById({_id}).exec((err,user)=>{
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

