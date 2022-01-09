const employees = require("../models/employees")


exports.create=(req,res)=>{
    const {UserID,FirstName,LastName,JobTitle,Department,CreatorBy}=req.body

    // validate  / ตรวจสอบความถูกต้องของข้อมูล
    switch(true){
        case !UserID:
            return res.status(400).json({error:"ระบุ UserID"})
        case !FirstName:
            return res.status(400).json({error:"ระบุชื่อพนักงาน"})
        case !LastName:
            return res.status(400).json({error:"ระบุนามสกุลพนักงาน"})
        case !JobTitle:
            return res.status(400).json({error:"ระบุตำแหน่งของพนักงาน"})
        case !Department:
            return res.status(400).json({error:"ระบุแผนกของพนักงาน"})
        case !CreatorBy:
            return res.status(400).json({error:"ระบุชื่อผู้บันทึกข้อมูล"})
    }
    //บันทึกข้อมูล
    employees.create({UserID,FirstName,LastName,JobTitle,Department,CreatorBy},(err,create)=>{
        if(err){
            res.status(400).json({error:"พบข้อมูล UserID นี้ในระบบ"})
        }
        res.json(create)
    })

}
