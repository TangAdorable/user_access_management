import React , { useState , useEffect } from "react";
import axios from "axios"
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { Button } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props) =>{

    const [empUser , setempUser] = useState('')

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
        .then(response=>{
            setempUser(response.data)
        })
        .catch(err=>console.log(err))

    },[])

    return (
        // {JSON.stringify(empUser)}
        <div className="container-fluid p-5 ">
            <div className="row justify-content-between ">
                <div className="col ">
                    <h5>UserID :{empUser.UserID}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{empUser.FirstName} {empUser.LastName}</h5>

                </div>
                <div className="col text-end">
                    <Button variant="primary" size="sm">
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Modify User
                    </Button>
                </div>
            </div>
            <hr/>


        </div>





    )
}

