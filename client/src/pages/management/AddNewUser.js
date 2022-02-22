import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from './UserProfile';
import { Form, Button } from '@themesberg/react-bootstrap';
import Swal from "sweetalert2";

export default () => {


    const FormAddNewUser = () => (
        <Form className="col-5 mt-4 ms-4 ">
            <Form.Group className="mb-3">
                <Form.Label>User ID :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>First Name :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Job Title :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Creator By :</Form.Label>
                <Form.Control type="text" rows="3" />
            </Form.Group>

            <Button type="submit" variant="warning" className="m-1">
                Submit
            </Button>

        </Form>
    )


    return (
        <div className="container-fluid p-3 ">
            <h4>Create New User <span class="fs-5 text-success"  > to add log </span></h4>
            {FormAddNewUser()}


        </div>
    );
};