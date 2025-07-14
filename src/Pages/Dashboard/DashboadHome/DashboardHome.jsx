import React from 'react';
import Forbidden from '../../Forbidden/Forbidden';
import useUserRole from '../../../Hooks/useUserRole';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import MemberDashboard from './MemberDashboard';


const DashboardHome = () => {
    const {role, roleLoading} =useUserRole();

    if(roleLoading){
        return <span className="loading loading-spinner text-success"></span>
    }

    if(role === 'user'){
       return <UserDashboard></UserDashboard>
    }
    else if(role === 'member'){
       return <MemberDashboard></MemberDashboard>
    }
    else if(role === 'admin'){
       return <AdminDashboard />
    }
    else{
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;