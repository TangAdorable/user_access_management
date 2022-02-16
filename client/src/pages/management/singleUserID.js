import React, { useState, useEffect } from "react";
import axios from "axios"
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import { Link } from 'react-router-dom';
import UserProfile from "./UserProfile"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


export default (props) => {
    const [empUser, setempUser] = useState('')
    const [loguser, setloguser] = useState([])

    // const [editlog, seteditlog] = useState({
    //     App_status: "",
    //     TicketID: "",
    //     Note: ""
    // })
    // const { App_status, TicketID, Note } = editlog

    // const [showDefault, setShowDefault] = useState(false);
    // const handleClose = () => setShowDefault(false);

    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
            })
            .catch(err => console.log(err))
    }

    const logEmpSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Userlogs}/userlog/${props.match.params.UserID}`)
            .then(response => {
                setloguser(response.data)
                //console.log(response.data)
            })
            .catch(err => console.log(err))
    }

    // const popupEditLog =()=>{
    //     axios
    //     .put
    // }


    useEffect(() => {
        empSingleUser()
        logEmpSingleUser()

    }, [])


    return (
        // {JSON.stringify(empUser)}
        <div className="container-fluid p-5 ">
            {/* <p>{JSON.stringify(loguser)}
                {props.match.params.UserID}</p> */}
            {/* <div className="row justify-content-between ">
                <div className="col ">
                    <h5>UserID :{empUser.UserID}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{empUser.FirstName} {empUser.LastName}</h5>
                    <p className="fs-6">Job Title : {empUser.JobTitle}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department : {empUser.Department}</p>
                </div>
                <div className="col text-end">
                    <Button variant="primary" size="sm">
                        <FontAwesomeIcon icon={faUserEdit} className="me-2" /> Modify User
                    </Button>
                </div>
            </div>
            <hr /> */}
            <UserProfile {...empUser} />

            <Button variant="primary" size="sm" className="m-1 mb-2" as={Link} to={`/userlogs/AddAppLog/${empUser.UserID}`}>
                <FontAwesomeIcon icon={faPlus} /> Add Application Log
            </Button>

            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body>
                    <Table hover className="user-table align-items-center">
                        <thead>
                            {/* {JSON.stringify(allemp)} */}
                            <tr className="text-center" >
                                <th className="col-2 border-bottom">User ID</th>
                                <th className="col-2 border-bottom">Application</th>
                                <th className="col-2 border-bottom">Access</th>
                                <th className="col-2 border-bottom">Status</th>
                                <th className="col-2 border-bottom">Ticket ID</th>
                                <th className="col-2 border-bottom">Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loguser.map((log, index) => (
                                <tr key={index}>
                                    <td >
                                        {/* {JSON.stringify(log.App_status)} */}
                                        <Card.Link as={Link} to={`/employees/emp/${log.UserID}`} className="d-flex align-items-center">
                                            <div className="d-block">
                                                <span className="fw-bold">{log.UserID}</span>
                                            </div>
                                        </Card.Link>
                                    </td>
                                    <td><div className=" small text-gray fw-normal">{log.App_name}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.Access}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.App_status === true ? "Enabled" : "Disabled"}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.TicketID}</div></td>
                                    <td><div className="small text-gray">{log.Note}</div></td>
                                    {/* <td><Container triggerText={triggerText} onSubmit={onSubmit} /></td> */}
                                    <td ><Button variant="warning" size="sm" className="me-1" as={Link} to={`/userlogs/singlelog/${log._id}/${log.UserID}`} >Edit</Button></td>


                                    {/* <Modal as={Modal.Dialog} centered show={showDefault} size="lg" onHide={handleClose}>
                                        <Modal.Header>
                                            <Modal.Title className="h6 mt-3 ms-3">{log.UserID}&nbsp;&nbsp;&nbsp;{log.App_name} </Modal.Title>
                                            <Button variant="close" aria-label="Close" onClick={handleClose} />
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                                            <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                I Got It
                                            </Button>
                                            <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal> */}


                                    {/* onClick={() => setShowDefault(true)} */}
                                    {/* as={Link} to={`/userlogs/updatelog/61e03254d450eb9013e5eb22`} */}
                                    {/* to={`/employees/emp/${log._id}`} */}
                                    {/* <td><span className="fw-normal">{u.dateCreated}</span></td> */}
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
        </div>

    )
}

