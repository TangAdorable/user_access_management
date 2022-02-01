import React, { useState, useEffect } from "react";
import axios from "axios"
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import { Link } from 'react-router-dom';

export default (props) => {
    const [empUser, setempUser] = useState('')
    const [loguser, setloguser] = useState([])

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
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        empSingleUser()
        logEmpSingleUser()

    }, [])

    return (
        // {JSON.stringify(empUser)}
        <div className="container-fluid p-5 ">
            {/* <p>{JSON.stringify(loguser)}
                {props.match.params.UserID}</p> */}
            <div className="row justify-content-between ">
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
            <hr />

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
                                        <Card.Link as={Link} to={`/employees/emp/${log.UserID}`} className="d-flex align-items-center">
                                            <div className="d-block">
                                                <span className="fw-bold">{log.UserID}</span>
                                            </div>
                                        </Card.Link>
                                    </td>
                                    <td><div className=" small text-gray fw-normal">{log.App_name}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.Access}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.App_status}</div></td>
                                    <td><div className="small text-gray fw-normal">{log.TicketID}</div></td>
                                    <td><div className="small text-gray">{log.Note}</div></td>
                                    <td><Button variant="warning"  size="sm" as={Link} to={`/userlogs/updatelog`} className="me-1">Edit</Button></td>
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

