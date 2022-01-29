import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH, faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import CustomPagination from "./PaginationManageUsers";
import { Link } from 'react-router-dom';



export default () => {

  const [allemp, setAllemp] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_Employees}/allemp`)
      .then(Response => {
        setAllemp(Response.data)
      })
      .catch(err => alert(err));
  }

  useEffect(() => {
    fetchData()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allemp.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = currentPosts => setCurrentPage(currentPosts)

  // console.log(`Test1 ${indexOfLastPost} `)
  // console.log(`Test2 ${currentPosts} `)
  // console.log(`Test3 ${paginate} `)

  return (
    <div className="container-fluid p-3 ">
      <h4>Users List</h4>
      <p className="mb-0">Your web user access management</p>

      <div className="btn-toolbar justify-content-end ">
        <Button variant="primary" size="sm">
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New User
        </Button>
        <ButtonGroup className="ms-3">
          <Button variant="outline-info" size="sm">
            Share
          </Button>
          <Button variant="outline-info" size="sm">
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
              {/* const allemp1 = allemp.sort((a, b) => {return a-b})
              console.log(allemp1) */}
              {currentPosts.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <Card.Link as={Link} to={`/employees/emp/${emp.UserID}`}  className="d-flex align-items-center">
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
          <CustomPagination postsPerPage={postsPerPage} totalPosts={allemp.length} paginate={paginate} />
        </Card.Body>
      </Card>
    </div>
  );
};