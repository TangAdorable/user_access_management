import React , {useState,useEffect} from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
//import users from "../../data/users";
import axios from "axios"


export default () => {

  const [allemp,setAllemp] = useState([])

  const fetchData=()=>{
    axios
    .get(`${process.env.REACT_APP_API_Employees}/allemp`)
    .then(Response=>{
      setAllemp(Response.data)
    })
    .catch(err=>alert(err));
  }

  useEffect(()=>{
    fetchData()
  },[])


  return (
    <div className="container-fluid p-3 bg-danger">
      <h4>Users List</h4>
      <p className="mb-0">Your web user access management</p>

      <div className="btn-toolbar justify-content-end ">
        <Button variant="primary" size="sm">
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
        </Button>
        <ButtonGroup className="ms-3">
          <Button variant="outline-primary" size="sm">
            Share
          </Button>
          <Button variant="outline-primary" size="sm">
            Export
          </Button>
        </ButtonGroup>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={9} lg={4} className="d-flex">
            <InputGroup className="me-2 me-lg-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
            <Form.Select className="w-25">
              <option defaultChecked>All</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
              <option value="3">Pending</option>
              <option value="3">Canceled</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="user-table align-items-center">
            <thead>
              {/* {JSON.stringify(allemp)} */}
              <tr className="text-center" >
                <th className="border-bottom">UserID</th>
                <th className="border-bottom">FirstName</th>
                <th className="border-bottom">LastName</th>
                <th className="border-bottom">JobTitle</th>
                <th className="border-bottom">Department</th>
              </tr>
            </thead>
            <tbody>
              {allemp.map(emp => (
                <tr key={emp._id}>
                  <td>
                    <Card.Link className="d-flex align-items-center">
                      <div className="d-block">
                        <span className="fw-bold">{emp.UserID}</span>
                      </div>
                    </Card.Link>
                  </td>
                  <td><span className="fw-normal"><div className="small text-gray">{emp.FirstName}</div></span></td>
                  <td><span className="fw-normal"><div className="small text-gray">{emp.LastName}</div></span></td>
                  <td><span className="fw-normal"><div className="small text-gray">{emp.JobTitle}</div></span></td>
                  <td><span className="fw-normal"><div className="small text-gray">{emp.Department}</div></span></td>
                  {/* <td><span className="fw-normal">{u.dateCreated}</span></td> */}
                </tr>
              ))}
            </tbody>

          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
