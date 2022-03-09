import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";
import { getToken } from '../../services/authorize';

export default (props) => {
  const [empUser, setempUser] = useState('');
  const [singleLog, setSingleLog] = useState({
    UserID: '',
    App_name: '',
    Access: '',
    App_status: false,
    TicketID: '',
    Note: '',
  });

  const { UserID, App_name, Access, App_status, TicketID, Note } = singleLog;

  // const statusAppLog = (App_status === true) ? "Enabled" : "Disabled";

  // const statusApp = (statusAppLog!="Enabled") ? "Enabled" : "Disabled";

  const empSingleUser = () => {
    axios
      .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`,
      {
        headers:{authorization:`Bearer ${getToken()}`}
      })
      .then((response) => {
        setempUser(response.data);
      })
      .catch((err) => alert(err));
  };

  const userSingleLog = () => {
    axios
      .get(`${process.env.REACT_APP_API_Userlogs}/singlelog/${props.match.params._id}`,
      {
        headers:{authorization:`Bearer ${getToken()}`}
      })
      .then((response) => {
        const { UserID, App_name, Access, App_status, TicketID, Note } = response.data;
        setSingleLog({ ...singleLog, UserID, App_name, Access, App_status, TicketID, Note });
        // setSingleLog(response.data)
        // console.log(response.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    empSingleUser();
    userSingleLog();
  }, []);

  //กำหนดค่าให้กับ state / เขียน Function ซ้อนกัน
  const inputValue = (name) => (event) => {
    // console.log(name,"=",event.target.value)
    //เก็บข้อมูล state เป็นแบบ object /...singleLog เป็นการ destructuring โครงสร้าง
    setSingleLog({ ...singleLog, [name]: event.target.value });
  };
  const checkedValue = (name) => (event) => {
    setSingleLog({...singleLog, [name]: event.target.checked});
  };

  const FormModifyLog = () => (
    <Form className="col-7" onSubmit={submitForm}>
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
        <Form.Label>Application Access Status :</Form.Label>
        <Form.Check
          className="ms-3"
          checked={App_status}
          onChange={checkedValue('App_status')}
          value={!App_status}
          label="Active"
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
          Update
        </Button>
      </React.Fragment>
    </Form>
  );

  //เมื่อกดปุ่ม update
  const submitForm = (e) => {
    e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
    // console.table({title,content,author})
    //console.log("API URL = ", process.env.REACT_APP_API)
    axios
      .put(`${process.env.REACT_APP_API_Userlogs}/updatelog/${props.match.params._id}`, {
        App_status,
        TicketID,
        Note,
      },
      {
        headers:{authorization:`Bearer ${getToken()}`}
      })
      .then((res) => {
        console.log(res)
        Swal.fire('แจ้งเตือน', 'Modify data success', 'success')
        //return <Redirect to={Routes.NotFound.path} />
        // const {App_status, TicketID, Note} = response.data
        // setSingleLog({...singleLog,App_status, TicketID, Note})

      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container-fluid p-5 ">
      <UserProfile {...empUser} />
      {/* {JSON.stringify(singleLog)} <br /> */}
      {/* {props.match.params._id}<br/>
                {props.match.params.UserID} */}
      <h5 className='mb-3'>Modify user log</h5>
      {FormModifyLog()}
    </div>
  );
};
