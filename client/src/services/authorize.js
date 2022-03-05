//เก็บ token / username=> session storage
export const authenticate = (response, next) => {
    if (window !== "undefinded") {
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("email", JSON.stringify(response.data.email))
    }
    next()
}

//ดึงข้อมูล token
export const getToken = () => {
    if (window !== "undefinded") {
        if (sessionStorage.getItem("token")) {
            //JSON.parse เปลี่ยนจาก stringify ไปเป็น JSON
            return JSON.parse(sessionStorage.getItem("token"))
        } else { //ยังไม่ login
            return false
        }
    }
}

//ดึงข้อมูล email
export const getEmail = () => {
    if (window !== "undefinded") {
        if (sessionStorage.getItem("email")) {
            //JSON.parse เปลี่ยนจาก stringify ไปเป็น JSON
            return JSON.parse(sessionStorage.getItem("email"))
        } else { //ยังไม่ login
            return false
        }
    }
}

//logout
export const logout = (next) => {
    if (window !== "undefinded") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
    }
    next() //redirect
}