import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Navigate } from 'react-router';


const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole()

    if (loading || roleLoading) {
        return <span class="loading loading-spinner text-success"></span>
    }

    if (!user || role !== 'member') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }
    return children;
};

export default MemberRoute;