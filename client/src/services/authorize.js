//เก็บ token / username=> session storage
export const authenticate=(response,next)=>{
    if(window !=="undefinded"){
        //เก็บข้อมูลลง session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("email",JSON.stringify(response.data.email))
    }
    next()
}