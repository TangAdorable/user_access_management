import React, { useState, useEffect } from "react";
import axios from "axios"
import UserProfile from "./UserProfile";
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";

export default (props) => {

    const [empUser, setempUser] = useState('')

    const empSingleUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
            .then(response => {
                setempUser(response.data)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        empSingleUser()
    }, [])

    // const FormModifyLog = () => (
    //     <Form className="col-7" onSubmit={submitForm}>
    //       <Form.Group className="mb-3">
    //         <Form.Label>User ID :</Form.Label>
    //         <Form.Control type="text" readOnly rows="3" value={UserID} />
    //       </Form.Group>
    
    //       <Form.Group className="mb-3">
    //         <Form.Label>Application Name :</Form.Label>
    //         <Form.Control type="text" readOnly rows="3" value={App_name} />
    //       </Form.Group>
    
    //       <Form.Group className="mb-3">
    //         <Form.Label>Access :</Form.Label>
    //         <Form.Control type="text" readOnly rows="3" value={Access} />
    //       </Form.Group>
    
    //       <Form.Group className="mb-3">
    //         <Form.Label>Application Access Status :</Form.Label>
    //         <Form.Check
    //           className="ms-3"
    //           checked={App_status}
    //           onChange={checkedValue('App_status')}
    //           value={!App_status}
    //           label="Active"
    //         />
    //         <div className="ms-3 fs-6">Status is {App_status ? 'Enable' : 'Disable'}.</div>
    
    //       </Form.Group>
    
    //       <Form.Group className="mb-3">
    //         <Form.Label>Ticket ID :</Form.Label>
    //         <Form.Control type="text" rows="3" value={TicketID} onChange={inputValue('TicketID')} />
    //       </Form.Group>
    
    //       <Form.Group className="mb-3">
    //         <Form.Label>Note :</Form.Label>
    //         <Form.Control as="textarea" rows="3" value={Note} onChange={inputValue('Note')} />
    //       </Form.Group>
    
    //       <React.Fragment>
    //         <Button type="submit" variant="warning" className="m-1">
    //           Update
    //         </Button>
    //       </React.Fragment>
    //     </Form>
    //   );

    //   const submitForm = (e) => {
    //     e.preventDefault(); //e.preventDefault() ถูกใช้เพื่อไม่ให้ browser reload หรือ refresh
    //     // console.table({title,content,author})
    //     //console.log("API URL = ", process.env.REACT_APP_API)
    //     axios
    //       .put(`${process.env.REACT_APP_API_Userlogs}/updatelog/${props.match.params._id}`, {
    //         App_status,
    //         TicketID,
    //         Note,
    //       })
    //       .then((res) => {
    //         console.log(res)
    //         Swal.fire('แจ้งเตือน', 'Modify data success', 'success')
    //         //return <Redirect to={Routes.NotFound.path} />
    //         // const {App_status, TicketID, Note} = response.data
    //         // setSingleLog({...singleLog,App_status, TicketID, Note})
    
    //       })
    //       .catch((err) => {
    //         alert(err);
    //       });
    //   };



    return (
        <div className="container-fluid p-5 ">
            <UserProfile {...empUser} />
            {/* {JSON.stringify(props)} */}
            <h5 className='mb-3'>Add user application log</h5>
            {/* {FormModifyLog()} */}
        </div>
    );
};