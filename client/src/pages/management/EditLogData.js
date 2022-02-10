import React, { useState, useEffect } from "react";
import axios from "axios"
import UserProfile from "./UserProfile"
import { Form } from '@themesberg/react-bootstrap';
import { Button } from '@themesberg/react-bootstrap';
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";


export default (props) => {

    const [empUser, setempUser] = useState('')
    const [singleLog, setSingleLog] = useState({
        App_status:"",
        TicketID:"",
        Note:""
    })

    const {UserID, App_name, Access,App_status,TicketID,Note} = singleLog

    const statusAppLog = (App_status === true) ? "Enabled" : "Disabled";
  
    const statusApp = (statusAppLog!="Enabled") ? "Enabled" : "Disabled";


    console.log(App_status)
    // console.log(statusAppLog)
    // console.log(statusApp)

    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
            })
            .catch(err => console.log(err))
    }

    const userSingleLog = () => {
        axios
            .get(`${process.env.REACT_APP_API_Userlogs}/singlelog/${props.match.params._id}`)
            .then(response => {
                const { UserID, App_name, Access, App_status, TicketID, Note } = response.data
                setSingleLog({ ...singleLog , UserID, App_name, Access,  App_status, TicketID, Note })
                // setSingleLog(response.data)
                // console.log(response.data)
            })
            .catch(err => console.log(err))
    }


    const FormModifyLog = () => (
        <Form className="col-7" >
            <Form.Group className="mb-3">
                <Form.Label>User ID :</Form.Label>
                <Form.Control type="text" readOnly rows="3" value={UserID} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Application Name :</Form.Label>
                <Form.Control type="text" readOnly rows="3" value={App_name} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Access :</Form.Label>
                <Form.Control type="text" readOnly rows="3" value={Access} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Application Access Sttus :</Form.Label>
                <div className="col-3">
                    <Form.Select >
                        <option defaultValue value={App_status}>{statusAppLog}</option>
                        <option value={statusApp}>{statusApp}</option>
                    </Form.Select>
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Ticket ID :</Form.Label>
                <Form.Control type="text" rows="3" value={TicketID} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Note :</Form.Label>
                <Form.Control as="textarea" rows="3" value={Note} />
            </Form.Group>

            <React.Fragment>
                <Button type="submit" variant="warning" className="m-1">Update</Button>
            </React.Fragment>
        </Form>
    )

    useEffect(() => {
        empSingleUser()
        userSingleLog()

    }, [])

    return (

        <div className="container-fluid p-5 ">
            <UserProfile {...empUser} />
            {/* {JSON.stringify(singleLog)} <br /> */}
            {/* {props.match.params._id}<br/>
                {props.match.params.UserID} */}
            <h5>Modify user log</h5><br />
            {FormModifyLog()}

        </div>
    )
};