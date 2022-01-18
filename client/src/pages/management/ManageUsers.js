import React from "react";
import { Breadcrumb, Button, ButtonGroup, Row, Col, InputGroup, Form, Image, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faCog, faCheck, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
export default () => {
  return (
    <div className="container p-3 ">
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
    </div>
  );
};
