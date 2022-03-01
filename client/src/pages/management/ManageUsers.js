import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import CustomPagination from "./PaginationManageUsers";
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import { CSVLink } from "react-csv";



export default () => {

  const [allemp, setAllemp] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  /**
   * It fetches all the employees from the API and sets the state of the component to the data that is
   * fetched.
   */
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_Employees}/allemp`)
      .then(Response => {
        setAllemp(Response.data)
      })
      .catch(err => alert(err));
  }

  /* This is a React Hook that is used to fetch data from the API. It is used to fetch data from the API
  and set it to the state. */
  useEffect(() => {
    fetchData()
  }, [])

  /* This is the code that is used to paginate the table. */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allemp.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = currentPosts => setCurrentPage(currentPosts)

  // console.log(`Test1 ${indexOfLastPost} `)
  // console.log(`Test2 ${currentPosts} `)
  // console.log(`Test3 ${paginate} `)

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = allemp.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(allemp)
    }
  }


  const headers = [
    { label: "User ID", key: "UserID" },
    { label: "First Name", key: "FirstName" },
    { label: "Last Name", key: "LastName" },
    { label: "Job Title", key: "JobTitle" },
    { label: "Department", key: "Department" },
    { label: "Creator by", key: "CreatorBy" },
    { label: "Create Date", key: "createdAt" },
    { label: "Last Update", key: "updatedAt" }
  ];

  return (
    <div className="container-fluid p-3 ">
      <h4>Users List</h4>
      <p className="mb-0">Your web user access management</p>

      <div className="btn-toolbar justify-content-end ">

        <Button variant="primary" size="sm" as={Link} to={Routes.AddNewUser.path}>
          <FontAwesomeIcon icon={faPlus} className="me-2"
          />
          Add New User
        </Button>

        <Button className="ms-2 me-4" variant="outline-info" size="sm">
          <CSVLink
            headers={headers}
            data={allemp}
            filename={"List_User_Employees.csv"}
            target="_blank"
          >
            Export user
          </CSVLink>
        </Button>
      </div>

      <div className="table-settings mb-2">
        <Row className="justify-content-between align-items-center">
          <Col xs={9} lg={2} className="d-flex">
            <InputGroup >
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control type="text"
                placeholder="Search"
                onChange={(e) => searchItems(e.target.value)} />
            </InputGroup>
            {/* <Form.Select className="w-25">
              <option defaultChecked>All</option>
              <option value="1">Active</option>
              <option value="2">Inactive</option>
              <option value="3">Pending</option>
              <option value="3">Canceled</option>
            </Form.Select> */}
          </Col>
        </Row>
      </div>

      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body>
          <Table hover className="user-table align-items-center">
            <thead>
              {/* {JSON.stringify(allemp)} */}
              <tr className="text-center" >
                <th className="col-2 border-bottom ">UserID</th>
                <th className="col-2 border-bottom ">FirstName</th>
                <th className="col-2 border-bottom">LastName</th>
                <th className="col-3 border-bottom">JobTitle</th>
                <th className="col-3 border-bottom">Department</th>
              </tr>
            </thead>
            <tbody>
              {/* const allemp1 = allemp.sort((a, b) => {return a-b})
              console.log(allemp1) */}


              {searchInput.length > 1 ? (
                
                filteredResults.map((emp, index) => (
                  <tr key={index}>
                    <td >
                      <Card.Link as={Link} to={`/employees/emp/${emp.UserID}`} className="d-flex align-items-center">
                        <div className="d-block">
                          <span className="fw-bold">{emp.UserID}</span>
                        </div>
                      </Card.Link>
                    </td>
                    <td><div className=" small text-gray fw-normal">{emp.FirstName}</div></td>
                    <td><div className="small text-gray fw-normal">{emp.LastName}</div></td>
                    <td><div className="small text-gray fw-normal">{emp.JobTitle}</div></td>
                    <td><div className="small text-gray">{emp.Department}</div></td>
                    {/* <td><span className="fw-normal">{u.dateCreated}</span></td> */}
                  </tr>
                ))
              ) : (

                currentPosts.map((emp, index) => (
                  <tr key={index}>
                    <td >
                      <Card.Link as={Link} to={`/employees/emp/${emp.UserID}`} className="d-flex align-items-center">
                        <div className="d-block">
                          <span className="fw-bold">{emp.UserID}</span>
                        </div>
                      </Card.Link>
                    </td>
                    <td><div className=" small text-gray fw-normal">{emp.FirstName}</div></td>
                    <td><div className="small text-gray fw-normal">{emp.LastName}</div></td>
                    <td><div className="small text-gray fw-normal">{emp.JobTitle}</div></td>
                    <td><div className="small text-gray">{emp.Department}</div></td>
                    {/* <td><span className="fw-normal">{u.dateCreated}</span></td> */}
                  </tr>
                ))
              )}

            </tbody>
          </Table>
          <CustomPagination postsPerPage={postsPerPage} totalPosts={allemp.length} paginate={paginate} />
        </Card.Body>
      </Card>
    </div>
  );
};
