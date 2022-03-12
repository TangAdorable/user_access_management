import React, { useState , useEffect} from "react";
import axios from 'axios';
import { Form, Button } from '@themesberg/react-bootstrap';
import { Badge } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";
import { getToken } from "../../services/authorize";

export default () => {


    const [allApp, setAllApp] = useState([])
    const [showAccess, setShowAccess] = useState([]);
    let [addApp, setAddApp] = useState({
        app_name: '', name_access: []
    })

   let{ app_name, name_access } = addApp


    const listAppSystem = () => {
        axios
            .get(`${process.env.REACT_APP_API_AppSystem}/allapp`,
            {
                headers:{authorization:`Bearer ${getToken()}`}
            })
            .then((response) => {
                console.log(response.data);
                setAllApp(response.data);
            })
            .catch((err) => console.log(err));
    };
    
      /* This is a React Hook that is used to fetch data from the API. It is used to fetch data from the API
      and set it to the state. */
      useEffect(() => {
        listAppSystem()
      }, [])
    


    //กำหนดค่าให้กับ state
    const inputValue = name => event => {
        // console.log(name,"=",event.target.value)
        //เก็บข้อมูล state เป็นแบบ object

        if (name==="app_name"){
            const app_name = event.target.value;
            if (app_name === 'select application / system') {
                setShowAccess([]);
            } else {
                const result = allApp.find((element) => {
                    return element.app_name === app_name;
                    
                });
                console.log(result.app_name) //แสดง app name
                addApp.app_name = result.app_name //TODO: test
                setShowAccess(result.name_access);
                
            }
        }else{ // (name === "name_access") 
            const name_access = event.target.value;
            const usingSplit = name_access.split(',');
            var data_concat =  showAccess.concat(usingSplit);
            //console.log(data_concat)

            //TODO: กลับมาดู
                 
            setAddApp({ ...addApp, [name]: usingSplit })
            addApp.name_access=data_concat
            console.log('Tang Test ',data_concat)
        }
        
    }



    const FormAddNewApp = () => (
        <Form className="col-5 mt-4 ms-4" onSubmit={submitForm}>
            <Form.Group className="mb-3">
                <Form.Label>Application / System Name :</Form.Label>
                <Form.Select onChange={inputValue('app_name')}>
                    <option>select application / system</option>
                    {allApp.map((allApp, index) => (
                        <option key={index} value={allApp.app_name.toString()}>
                            {allApp.app_name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
               
                <React.Fragment>
                    <Badge className="me-1 text-info">Original Access in Application / System :</Badge>
                </React.Fragment>
                <Form.Control type="text" rows="3" readOnly value={showAccess} />
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Add New Function / Access / Menu :</Form.Label>
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

        let name_access=addApp.name_access

        axios
            .put(`${process.env.REACT_APP_API_AppSystem}/updateSingleApp/${addApp.app_name}`, {
                name_access
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
    };

    return (

        <div className="container-fluid p-3 ">
            <h4>Add New Access of Application / System</h4>
            {FormAddNewApp()}
        </div>
    );
};
