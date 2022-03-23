import React from "react";
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@themesberg/react-bootstrap";
import { Link } from 'react-router-dom';
//import CustomPagination from "./PaginationManageUsers";

const UserProfile = (props) => {

    const {UserID,FirstName,LastName,JobTitle,Department } = props

    // const [empUser, setempUser] = useState('')

    // const empSingleUser = () => {
    //     axios
    //         .get(`${process.env.REACT_APP_API_Employees}/emp/${props.match.params.UserID}`)
    //         .then(response => {
    //             setempUser(response.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     empSingleUser()
    // }, [])

    return (
        <div>
            <div className="row justify-content-between ">
            {/* {JSON.stringify(props)} */}
                <div className="col-8">
                    <h5>UserID : {UserID}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{FirstName} {LastName}</h5>
                    <p className="fs-6"><span className="fw-bolder">Job Title : </span>{JobTitle}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="fw-bolder">Department : </span>{Department}</p>
                </div>
                <div className="col text-end">
                    <Button variant="primary" size="sm" as={Link} to={`/employees/modifyUser/${UserID}`}>
                        <FontAwesomeIcon icon={faUserEdit} className="me-2" /> Modify User
                    </Button>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default UserProfile;