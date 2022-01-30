import React, { useState, useEffect } from "react";
import axios from "axios"
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Table } from "@themesberg/react-bootstrap";

export default (props) => {

    const [empUser, setempUser] = useState('')

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
            })
            .catch(err => console.log(err))

    }, [])

    return (
        // {JSON.stringify(empUser)}
        <div className="container-fluid p-5 ">
            <div className="row justify-content-between ">
                <div className="col ">
                    <h5>UserID :{empUser.UserID}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{empUser.FirstName} {empUser.LastName}</h5>
                    <p class="fs-6">Job Title : {empUser.JobTitle}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Department : {empUser.Department}</p>
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

                        </tbody>
                    </Table>
                    
                </Card.Body>
            </Card>


        </div>

    )
}

