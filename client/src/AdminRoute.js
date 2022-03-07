import React from "react";
import { getEmail } from "./services/authorize";
import { Route, Redirect } from "react-router-dom";


const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            //ถ้ามีการ login ไปที่ Component /ถ้ายังไม่ login ไปที่ /sign-in
            getEmail() ? (<Component {...props} />) : (
                <Redirect to={{ pathname: "/sign-in", state: { from: props.location } }} />)
        } />

)

export default AdminRoute;