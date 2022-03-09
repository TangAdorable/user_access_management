const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")

exports.login = (req, res) => {
    //ข้อมูล email , password ที่ใส่เข้ามา
    const { email, password } = req.body
    
    if (email === process.env.EMAIL) {
        if (password === process.env.PASSWORD) {
            //login เข้าสู่ระบบ
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' }) //token expires in 1 Day
            return res.json({ token, email })
        }
        return res.status(400).json({ error: "password invalid !" })
    } else {
        return res.status(400).json({ error: "email or password invalid !" })
    }
}

//ตรวจสอบ token ต้องมีการ login ถึงจะเรียกข้อมูลจาก api ได้ /Middleware
//Postman : Headers > KEY:Authorization , VALUE:Bearer {token}
exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"
})