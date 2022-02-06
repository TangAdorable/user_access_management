import React, { useState, useEffect } from "react";
import axios from "axios"
import UserProfile from "./UserProfile"

export default (props) => {

    const [singleLog, setSingleLog] = useState('')
    const [empUser, setempUser] = useState('')



    const userSingleLog = () => {
        axios
            .get(`${process.env.REACT_APP_API_Userlogs}/singlelog/${props.match.params._id}`)
            .then(response => {
                setSingleLog(response.data)
            })
            .catch(err => console.log(err))
    }

    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        
        userSingleLog()
        empSingleUser()
    }, [])

    return (

        <div>
            <div className="container-fluid p-5 ">
                <UserProfile {...empUser} />
                {/* {console.log(singleLog.UserID)}
                {JSON.stringify(singleLog.UserID)} <br/> */}
                {props.match.params._id}<br/>
                {props.match.params.UserID}



            </div>
        </div>
    )
};