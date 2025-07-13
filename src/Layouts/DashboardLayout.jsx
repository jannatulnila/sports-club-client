import { Link, NavLink, Outlet } from 'react-router';
import { useState } from 'react';
import { FaHome, FaUsers, FaSignOutAlt, FaPlus, FaCalendarAlt, FaBars } from 'react-icons/fa';
import {
  FiUser, FiSpeaker, FiTag, FiClipboard, FiHome,
  FiUsers, FiUserCheck, FiCheckCircle, FiPlusSquare
} from 'react-icons/fi';
import { GiSoccerField } from "react-icons/gi";
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Top Navbar for Mobile */}
      <div className="bg-base-200 p-4 flex items-center justify-between lg:hidden shadow-md">
        <button onClick={toggleSidebar}>
          <FaBars className="text-xl" />
        </button>
        <h2 className="text-xl font-bold text-primary">Dashboard</h2>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 w-64 h-full bg-base-200 shadow-md p-6 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end lg:hidden">
          <button onClick={toggleSidebar} className="text-xl">✕</button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-primary hidden lg:block">Dashboard</h2>

        <ul className="space-y-4 text-sm font-semibold">
          <li>
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}><FaHome /> Home</Link>
          </li>
          <li>
            <Link to="/dashboard/all-courts" className="flex items-center gap-2" onClick={closeSidebar}><GiSoccerField /> All Courts</Link>
          </li>

          {role === 'user' && (
            <>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2" onClick={closeSidebar}><FaUsers /> My Profile</Link>
              </li>
              <li>
                <Link to="/dashboard/announcements" className="flex items-center gap-2" onClick={closeSidebar}>📣 Announcements</Link>
              </li>
            </>
          )}

          {role === 'member' && (
            <>
              <li><NavLink to="/dashboard/my-member-profile" onClick={closeSidebar}><FiUser className="inline mr-2" /> Member Profile</NavLink></li>
              <li><Link to="/dashboard/pending-bookings" className="flex items-center gap-2" onClick={closeSidebar}><FaCalendarAlt /> Pending Bookings</Link></li>
              <li><Link to="/dashboard/approved-bookings" onClick={closeSidebar}>✅ Approved Bookings</Link></li>
              <li><Link to="/dashboard/confirmed-bookings" onClick={closeSidebar}>📌 Confirmed Bookings</Link></li>
              <li><Link to="/dashboard/payment-history" onClick={closeSidebar}>💳 Payment History</Link></li>
              <li><Link to="/dashboard/announcements" onClick={closeSidebar}>📣 Announcements</Link></li>
            </>
          )}

          {!roleLoading && role === 'admin' && (
            <>
              <li><NavLink to="profile" onClick={closeSidebar}><FiUser className="inline mr-2" /> Admin Profile</NavLink></li>
              <li><NavLink to="make-announcement" onClick={closeSidebar}><FiSpeaker className="inline mr-2" /> Make Announcement</NavLink></li>
              <li><NavLink to="/dashboard/manage-coupons" onClick={closeSidebar}><FiTag className="inline mr-2" /> Manage Coupons</NavLink></li>
              <li><NavLink to="/dashboard/booking-approval" onClick={closeSidebar}><FiCheckCircle className="inline mr-2" /> Manage Bookings Approval</NavLink></li>
              <li><NavLink to="/dashboard/manage-bookings" onClick={closeSidebar}><FiClipboard className="inline mr-2" /> Manage Bookings</NavLink></li>
              <li><NavLink to="/dashboard/manage-courts" onClick={closeSidebar}><FiHome className="inline mr-2" /> Manage Courts</NavLink></li>
              <li><NavLink to="/dashboard/all-users" onClick={closeSidebar}><FiUsers className="inline mr-2" /> All Users</NavLink></li>
              <li><NavLink to="/dashboard/manage-members" onClick={closeSidebar}><FiUserCheck className="inline mr-2" /> Manage Members</NavLink></li>
              <li><NavLink to="/dashboard/make-admin" onClick={closeSidebar}><FiCheckCircle className="inline mr-2" />Make Admin</NavLink></li>
              <li><NavLink to="/dashboard/add-court" onClick={closeSidebar}><FiPlusSquare className="inline mr-2" /> Add Court</NavLink></li>
            </>
          )}

          <li>
            <button onClick={() => { logOut(); closeSidebar(); }} className="flex items-center gap-2 text-red-500">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
