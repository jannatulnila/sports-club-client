import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';


const PrivateRoute = ({children}) => {
    const {user, loading} =useAuth()
    const location = useLocation();


    if(loading){
        return <span class="loading loading-spinner text-success"></span>
    }
    if(!user){
       return <Navigate to="/login" state={{form:location.pathname}}></Navigate>
    }
    return children;
};

export default PrivateRoute;