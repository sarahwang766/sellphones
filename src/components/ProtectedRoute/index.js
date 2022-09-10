import React from "react";
import {Route, Navigate, Outlet} from "react-router-dom";
const ProtectedRoute = props => {
    const token = localStorage.getItem("accessToken");
    if(!token){
        return <Navigate to={"/login"}/>
    }
    return (
        <Outlet/>
    );
};
export default ProtectedRoute;