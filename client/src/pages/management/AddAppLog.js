import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from 'sweetalert2';
import { getToken } from '../../services/authorize';

export default (props) => {
    //TODO:INITIAL CONST
    const [listApp, setListApp] = useState([]);

    const [selected, setSelected] = useState([]);

    const [empUser, setempUser] = useState('');
    /* A way to set the initial value of the state. */
    const [addLog, setAddLog] = useState({
        UserID: '',
        App_name: '',
        Access: '',
        App_status: false,
        TicketID: '',
        Note: '',
    });
    const { UserID, App_name, Access, App_status, TicketID, Note } = addLog;

    //TODO:FUNCTION
    /**
     * This function gets the user information from the API and sets the state of the component to the user
     * information.
     */
    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`,
            {
                headers:{authorization:`Bearer ${getToken()}`}
            })
            .then((response) => {
                setempUser(response.data);
                setAddLog({ ...addLog, UserID: response.data.UserID });
            })
            .catch((err) => console.log(err));
    };

    /**
     * It gets all the app systems from the API and sets the listApp state to the response.
     */
    const listAppSystem = () => {
        axios
            .get(`${process.env.REACT_APP_API_AppSystem}/allapp`,
            {
                headers:{authorization:`Bearer ${getToken()}`}
            })
            .then((response) => {
                console.log(response.data);
                setListApp(response.data);
            })
            .catch((err) => console.log(err));
    };

    //TODO: CALL FUNCTION
    /* This is a React Hooks. It is a function that is used to perform side effects. In this case, it is
    used to get the user information from the API and set the state of the component to the user
    information. */
    useEffect(() => {
        empSingleUser();
        listAppSystem();
    }, []);

    //กำหนดค่าให้กับ state
    /**
     * It sets the value of the input field to the value of the state.
     * @param name - The name of the input field.
     */
    const inputValue = (name) => (event) => {
        // console.log(name,"=",event.target.value)
        //เก็บข้อมูล state เป็นแบบ object
        // setSelected()
        if (name === 'App_name') {
            // console.log('TTTTTTTTT'+event.target.value)
            const App_name = event.target.value;
            if (App_name === 'select option 1') {
                setSelected([]);
            } else {
                //
                const result = listApp.find((element) => {
                    return element.app_name === App_name;
                });
                setSelected(result.name_access);
                //   console.log('Tat'+result.name_access)
                //setFoods(result)
            }
        }

        setAddLog({ ...addLog, [name]: event.target.value });
    };

    /**
     * * Set the value of the `addLog` object to the value of the `event.target.checked` property
     * @param name - The name of the field.
     */
    const checkedValue = (name) => (event) => {
        setAddLog({ ...addLog, [name]: event.target.checked });
    };

    /**
     * This function is used to modify the log.
     */
    const FormModifyLog = () => (
        <Form className="col-7" onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>User ID :</Form.Label>
                <Form.Control type="text" rows="3" readOnly value={UserID} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Application Name :</Form.Label>
                <Form.Select onChange={inputValue('App_name')}>
                    <option>select option 1</option>
                    {listApp.map((listapp, index) => (
                        <option key={index} value={listapp.app_name.toString()}>
                            {listapp.app_name}
                        </option>
                    ))}
                    {console.log('Tang Test 1 ' + App_name)}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Access :</Form.Label>

                <Form.Select onChange={inputValue('Access')}>
                    <option>select option 2</option>
                    {selected.map((list, index) => (
                        <option key={index} value={list}>
                            {list}
                        </option>
                    ))}
                    {console.log('Tang Test 2 ' + Access)}
                </Form.Select>
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

    /**
     * ฟังก์ชันนี้ทำหน้าที่บันทึกข้อมูลลงใน database โดยใช้ axios เพื่อส่งข้อมูลไปยัง API ที่กำหนดไว้ใน
     * .env โดยจะส่งข้อมูลดังนี้
     * @param e - The event object.
     */
    const submitForm = (e) => {
        e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
        // console.table({title,content,author})
        //console.log("API URL = ", process.env.REACT_APP_API)

        if (!App_name || App_name === 'select option 1') {
            //setAddLog({ ...addLog, App_name: null });
            //console.log('Tang 55 66 77 88 99 ' + App_name)
            Swal.fire('แจ้งเตือน', 'กรุณาเลือก Acclication Name', 'error');

        } else if (!Access || Access === 'select option 2') {
            //setAddLog({ ...addLog, Access: null });
            //console.log('Tang 55 66 77 88 99 ' + Access)
            Swal.fire('แจ้งเตือน', 'กรุณาเลือก Access', 'error');

        } else {
            axios
                .post(`${process.env.REACT_APP_API_Userlogs}/addlogs`, {
                    UserID,
                    App_name,
                    Access,
                    App_status,
                    TicketID,
                    Note,
                },
                {
                    headers:{authorization:`Bearer ${getToken()}`}
                })
                .then((res) => {
                    console.log(res);
                    Swal.fire('แจ้งเตือน', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success');
                    //setAddLog({ ...addLog, UserID:'', App_name: '', Access: '', App_status: '', TicketID: '', Note: '' });

                    //return <Redirect to={Routes.NotFound.path} />
                    // const {App_status, TicketID, Note} = response.data
                    // setSingleLog({...singleLog,App_status, TicketID, Note})
                })
                .catch((err) => {
                    Swal.fire('แจ้งเตือน', err.response.data.error, 'error');
                });
        }
    };

    return (
        <div className="container-fluid p-5 ">
            <UserProfile {...empUser} />
            {/* {JSON.stringify(props)} */}
            <h5 className="mb-3">Add user application log</h5>
            {FormModifyLog()}
        </div>
    );
};
