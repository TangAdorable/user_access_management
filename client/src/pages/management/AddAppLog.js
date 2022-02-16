import React, { useState, useEffect } from "react";
import axios from "axios"
import UserProfile from "./UserProfile";
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";

export default (props) => {

    const [listApp, setListApp] = useState([])

    const [empUser, setempUser] = useState('');
    const [addLog, setAddLog] = useState({
        UserID : '',
        App_name: '',
        Access: '',
        App_status: false,
        TicketID: '',
        Note: '',
    })
    const {UserID,App_name,Access,App_status,TicketID,Note } = addLog;

    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
                setAddLog({...addLog,UserID:response.data.UserID})
                //setAddLog(response.data)
            })
            .catch(err => console.log(err))
    }

    const listAppSystem = () => {
        axios
            .get(`${process.env.REACT_APP_API_AppSystem}/allapp`)
            .then(response => {
                console.log(response.data)
                setListApp(response.data)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        empSingleUser()
        listAppSystem()
    }, [])


    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        // console.log(name,"=",event.target.value)
        //เก็บข้อมูล state เป็นแบบ object
        setAddLog({ ...addLog, [name]: event.target.value });
    }

    const checkedValue = (name) => (event) => {
        setAddLog({...addLog, [name]: event.target.checked });
    };


    const FormModifyLog = () => (
        <Form className="col-7" onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>User ID :</Form.Label>
                <Form.Control type="text" rows="3" readOnly value={UserID}  />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Application Name :</Form.Label>
                <Form.Select  onChange={inputValue('App_name')}>
                    {listApp.map((listapp,index) => (
                        <option key={index} value={listapp.app_name.toString()}  >{listapp.app_name}</option>
                    ))}
                </Form.Select>
                
                {/* <Form.Control type="text" rows="3" value={App_name} onChange={inputValue('App_name')} /> */}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Access :</Form.Label>
                <Form.Control type="text" rows="3" value={Access} onChange={inputValue('Access')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Application Access Status :</Form.Label>
                <Form.Check
                    className="ms-3"
                    checked={App_status}
                    onChange={checkedValue('App_status')}
                    value={!App_status}
                />
                <div className="ms-3 fs-6">Status is {App_status ? 'Enable' : 'Disable'}.</div>

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Ticket ID :</Form.Label>
                <Form.Control type="text" rows="3" value={TicketID} onChange={inputValue('TicketID')} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Note :</Form.Label>
                <Form.Control as="textarea" rows="3" value={Note} onChange={inputValue('Note')} />
            </Form.Group>

            <React.Fragment>
                <Button type="submit" variant="warning" className="m-1">
                    Submit
                </Button>
            </React.Fragment>
        </Form>
    );

    const submitForm = (e) => {
        e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
        // console.table({title,content,author})
        //console.log("API URL = ", process.env.REACT_APP_API)
        axios
            .post(`${process.env.REACT_APP_API_Userlogs}/addlogs`, {
                UserID,App_name,Access,App_status,TicketID,Note
            })
            .then((res) => {
                console.log(res)
                Swal.fire('แจ้งเตือน', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
                //setAddLog({ ...addLog, UserID, App_name, Access, App_status, TicketID, Note });



                //return <Redirect to={Routes.NotFound.path} />
                // const {App_status, TicketID, Note} = response.data
                // setSingleLog({...singleLog,App_status, TicketID, Note})

            })
            .catch((err) => {
                Swal.fire('แจ้งเตือน', err.response.data.error, 'error')
            });
    };



    return (
        <div className="container-fluid p-5 ">
            <UserProfile {...empUser} />
            {/* {JSON.stringify(props)} */}
            <h5 className='mb-3'>Add user application log</h5>
            {FormModifyLog()}
        </div>
    );
};