const employees = require("../models/employees")

    //บันทึกข้อมูล
exports.create=(req,res)=>{
    const {UserID,FirstName,LastName,JobTitle,Department,CreatorBy}=req.body

    // validate  / ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !UserID:
            return res.status(400).json({error:"ระบุ User ID"})
            break;
        case !FirstName:
            return res.status(400).json({error:"ระบุ First Name"})
            break;
        case !LastName:
            return res.status(400).json({error:"ระบุ Last Name"})
            break;
        case !JobTitle:
            return res.status(400).json({error:"ระบุ Job Title"})
            break;
        case !Department:
            return res.status(400).json({error:"ระบุ Department"})
            break;
        case !CreatorBy:
            return res.status(400).json({error:"ระบุ CreatorBy"})
            break;
    }

    employees.create({UserID,FirstName,LastName,JobTitle,Department,CreatorBy},(err,create)=>{
        if(err){
            res.status(400).json({error:"พบข้อมูล User ID นี้ในระบบ"})
        }
        res.json(create)
    })
}

    //แสดงข้อมูล / เรียงจากล่าสุดไปเก่าสุดด้วย createdAt .sort({createdAt: "desc"})
exports.getallemp=(req,res)=>{
    employees.find({}).sort({createdAt: "desc"}).exec((err,allemp)=>{
        res.json(allemp)
    })
}


exports.singleemp=(req,res)=>{
    const {UserID} = req.params
    employees.findOne({UserID}).exec((err,emp)=>{
        res.json(emp)
    })
}

exports.removeemp=(req,res)=>{
    const {UserID} = req.params
    employees.findOneAndRemove({UserID}).exec((err,emp)=>{
        if(err) console.log(err)
        res.json({
            message:"success delete user"
        })
    })
}

exports.updateemp=(req,res)=>{
    const {UserID} = req.params
    const {FirstName,LastName,JobTitle,Department}=req.body //ส่งข้อมูลมา
    
    //ตรวจสอบ request by case
    switch(true){
        case !FirstName:
            return res.status(400).json({error:"ระบุชื่อพนักงาน"})
        case !LastName:
            return res.status(400).json({error:"ระบุนามสกุลพนักงาน"})
        case !JobTitle:
            return res.status(400).json({error:"ระบุตำแหน่งของพนักงาน"})
        case !Department:
            return res.status(400).json({error:"ระบุแผนกของพนักงาน"})
    }
       
    employees.findOneAndUpdate({UserID},{FirstName,LastName,JobTitle,Department},{new:true})
    .exec((err,emp)=>{
        if(err) console.log(err)
        res.json(emp)
        
    })
}

