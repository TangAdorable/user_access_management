const jwt = require("jsonwebtoken")

exports.login = (req, res) => {

    const { email, password } = req.body
    
    if (email === process.env.EMAIL) {
        if (password === process.env.PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30' })
            return res.json({ token, email })
        }
        return res.status(400).json({ error: "password invalid !" })
    } else {
        return res.status(400).json({ error: "email or password invalid !" })
    }
}