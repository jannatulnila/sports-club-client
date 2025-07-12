import { Link, NavLink, Outlet } from 'react-router';
// import useUserRole from '../hooks/useUserRole'; // your custom role hook
import { FaHome, FaUsers, FaSignOutAlt, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
// import useUserRole from '../Hooks/useUserRole';
import { FiUser, FiSpeaker, FiTag, FiClipboard, FiHome, FiUsers, FiUserCheck, FiCheckCircle, FiPlusSquare } from 'react-icons/fi';
import { GiSoccerField } from "react-icons/gi";



const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    // const { role, roleLoading } = useUserRole();  // 'admin', 'member', or 'user'
    // console.log(role)

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-base-200 p-6 shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-primary">Dashboard</h2>

                <ul className="space-y-4 text-sm font-semibold">
                    <li>
                        <Link to="/" className="flex items-center gap-2"><FaHome /> Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/profile" className="flex items-center gap-2"><FaUsers /> My Profile</Link>
                    </li>

                    {/* {role === 'user' && ( */}
                        {/* <> */}
                            <li>
                                <Link to="/dashboard/all-courts" className="flex items-center gap-2"><GiSoccerField  /> All Courts</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/pending-bookings" className="flex items-center gap-2"><FaCalendarAlt /> Pending Bookings</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/announcements" className="flex items-center gap-2">📣 Announcements</Link>
                            </li>

                             {/* member */}
                            <li>
                                <Link to="/dashboard/approved-bookings">✅ Approved Bookings</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/confirmed-bookings">📌 Confirmed Bookings</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/payment-history">💳 Payment History</Link>
                            </li>
                            <li>
                                <Link to="/dashboard/announcements">📣 Announcements</Link>
                            </li>

                            {/* admin */}
                            <li>
                                <NavLink to="profile">
                                    <FiUser className="inline mr-2" /> Admin Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="make-announcement">
                                    <FiSpeaker className="inline mr-2" /> Make Announcement
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-coupons">
                                    <FiTag className="inline mr-2" /> Manage Coupons
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-bookings">
                                    <FiClipboard className="inline mr-2" /> Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-courts">
                                    <FiHome className="inline mr-2" /> Manage Courts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-users">
                                    <FiUsers className="inline mr-2" /> All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-members">
                                    <FiUserCheck className="inline mr-2" /> Manage Members
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/booking-approval">
                                    <FiCheckCircle className="inline mr-2" /> Manage Bookings Approval
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-court">
                                    <FiPlusSquare className="inline mr-2" /> Add Court
                                </NavLink>
                            </li>
                            
                        {/* </>
                    )} */}

                    {/* {role === 'member' && (
                        <>
                       <li>bh</li>


                        </>
                    )}

                    {role === 'admin' && (
                        <>
                        <li>hgjykgk</li>
                         </> 
                    )} */}

                    <li>
                        <button onClick={logOut} className="flex items-center gap-2 text-red-500"><FaSignOutAlt /> Logout</button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;


{/* <li>
                <Link to="/dashboard/add-court" className="flex items-center gap-2"><FaPlus /> Add Court</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-courts">🛠️ Manage Courts</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-bookings">📋 Manage Bookings</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-users">👥 Manage Users</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-coupons">🏷️ Manage Coupons</Link>
              </li>
              <li>
                <Link to="/dashboard/announcements">📣 Manage Announcements</Link>
              </li> */}
