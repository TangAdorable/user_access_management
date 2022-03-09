import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";
import { getEmail,getToken } from '../../services/authorize';

export default () => {


    const [addUser, setAddUser] = useState({
        UserID: '', FirstName: '', LastName: '', JobTitle: '', Department: '', CreatorBy:getEmail()
    })


    const { UserID, FirstName, LastName, JobTitle, Department, CreatorBy } = addUser


    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        // console.log(name,"=",event.target.value)
        //เก็บข้อมูล state เป็นแบบ object
        setAddUser({ ...addUser, [name]: event.target.value });
    }



    const FormAddNewUser = () => (
        <Form className="col-5 mt-4 ms-4" onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>User ID :</Form.Label>
                <Form.Control type="text" rows="3" value={UserID} onChange={inputValue('UserID')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>First Name :</Form.Label>
                <Form.Control type="text" rows="3" value={FirstName} onChange={inputValue('FirstName')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name :</Form.Label>
                <Form.Control type="text" rows="3" value={LastName} onChange={inputValue('LastName')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Job Title :</Form.Label>
                <Form.Control type="text" rows="3" value={JobTitle} onChange={inputValue('JobTitle')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department :</Form.Label>
                <Form.Control type="text" rows="3" value={Department} onChange={inputValue('Department')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Creator By :</Form.Label>
                <Form.Control type="text" rows="3" readOnly value={CreatorBy} />
            </Form.Group>

            <Button type="submit" variant="warning" className="m-1">
                Submit
            </Button>
        </Form>
    )

    //เมื่อกดปุ่ม submit
    const submitForm = (e) => {
        e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
        // console.table({title,content,author})
        //console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .post(`${process.env.REACT_APP_API_Employees}/create`, {
                UserID, FirstName, LastName, JobTitle, Department, CreatorBy
            },
            {
                headers:{authorization:`Bearer ${getToken()}`}
            })
            .then((res) => {
                console.log(res)
                Swal.fire('แจ้งเตือน', 'Add new user success', 'success')
                //return <Redirect to={Routes.NotFound.path} />
                // const {App_status, TicketID, Note} = response.data
                // setSingleLog({...singleLog,App_status, TicketID, Note})

            })
            .catch((err) => {
                alert(err.response.data.error)

            });
    };

    return (
        <div className="container-fluid p-3 ">
            <h4>Create New User <span class="fs-5 text-success"  > to add log </span></h4>
            {FormAddNewUser()}


        </div>
    );
};