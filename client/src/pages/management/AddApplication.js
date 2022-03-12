import React, { useState } from "react";
import axios from 'axios';
import { Form, Button } from '@themesberg/react-bootstrap';
import { Badge } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

export default () => {


    const [addApp, setAddApp] = useState({
        app_name: '', name_access: ''
    })

    const { app_name, name_access } = addApp

    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        // console.log(name,"=",event.target.value)
        //เก็บข้อมูล state เป็นแบบ object

        if (name === "name_access") {
            const name_access = event.target.value;
            const usingSplit = name_access.split(',');

            setAddApp({ ...addApp, [name]: usingSplit });
        } else {
            setAddApp({ ...addApp, [name]: event.target.value });

        }
    }

    const FormAddNewApp = () => (
        <Form className="col-5 mt-4 ms-4" onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>Application / System Name :</Form.Label>
                <Form.Control type="text" rows="3" value={app_name} onChange={inputValue('app_name')} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Add Function / Access / Menu :</Form.Label>
                <React.Fragment>
                    <Badge className="me-1 text-info">Note : if more than one example : function1,function2,function3</Badge>
                </React.Fragment>
                <Form.Control type="text" rows="3" value={name_access} onChange={inputValue('name_access')} />
            </Form.Group>
            <Button type="submit" variant="warning" className="m-1">
                Submit
            </Button>
        </Form>
    )

    //เมื่อกดปุ่ม submit
    const submitForm = (e) => {
        e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh

        if (!app_name){
            Swal.fire('แจ้งเตือน', 'กรุณาระบุ Application', 'error');
        } else if(!name_access){
            Swal.fire('แจ้งเตือน', 'กรุณา Add Function / Access / Menu', 'error');
        } else {
            axios
            .post(`${process.env.REACT_APP_API_AppSystem}/create`, {
                app_name, name_access
            },
            {
                headers:{authorization:`Bearer ${getToken()}`}
            })
            .then((res) => {
                console.log(res)
                Swal.fire('แจ้งเตือน', 'Add new user success', 'success')

            })
            .catch((err) => {
                alert(err.response.data.error)

            });

        }

    };

    return (

        <div className="container-fluid p-3 ">
            <h4>Create New Application / System</h4>
            {FormAddNewApp()}
        </div>
    );
};


