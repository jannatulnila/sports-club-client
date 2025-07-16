import { NavLink, Outlet } from 'react-router';
import { useState } from 'react';
import {
  FaBars, FaSignOutAlt, FaCalendarAlt, FaCheckCircle, FaBookmark,
  FaCreditCard, FaUserFriends, FaUsers, FaUserShield, FaBullhorn,
  FaThLarge, FaPlusCircle
} from 'react-icons/fa';
import {
  FiUser, FiSpeaker, FiTag, FiClipboard
} from 'react-icons/fi';
import useUserRole from '../Hooks/useUserRole';
import PrimeFit from '../Components/PrimeFit';

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded-md transition duration-200 font-semibold text-sm ${
      isActive ? 'bg-gray-200 text-primary' : 'text-primary hover:bg-gray-100'
    }`;

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* Mobile Top Navbar */}
      <div className="bg-white p-4 flex items-center justify-between lg:hidden">
        <button onClick={toggleSidebar}>
          <FaBars className="text-xl" />
        </button>
        <PrimeFit />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 w-64 h-full p-6 transform transition-transform duration-300 ease-in-out bg-white
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end lg:hidden">
          <button onClick={toggleSidebar} className="text-xl text-secondary">✕</button>
        </div>

        <PrimeFit />

        <ul className="space-y-2 mt-4">
          {role === 'user' && (
            <>
              <li>
                <NavLink to="/dashboard/profile" className={linkClass} onClick={closeSidebar}>
                  <FiUser /> My Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending-bookings" className={linkClass} onClick={closeSidebar}>
                  <FaCalendarAlt /> Pending Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements" className={linkClass} onClick={closeSidebar}>
                  <FiSpeaker /> Announcements
                </NavLink>
              </li>
            </>
          )}

          {role === 'member' && (
            <>
              <li>
                <NavLink to="/dashboard/my-member-profile" className={linkClass} onClick={closeSidebar}>
                  <FiUser /> Member Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pending-bookings" className={linkClass} onClick={closeSidebar}>
                  <FaCalendarAlt /> Pending Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/approved-bookings" className={linkClass} onClick={closeSidebar}>
                  <FaCheckCircle /> Approved Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/confirmed-bookings" className={linkClass} onClick={closeSidebar}>
                  <FaBookmark /> Confirmed Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment-history" className={linkClass} onClick={closeSidebar}>
                  <FaCreditCard /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/announcements" className={linkClass} onClick={closeSidebar}>
                  <FiSpeaker /> Announcements
                </NavLink>
              </li>
            </>
          )}

          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/admin-profile" className={linkClass} onClick={closeSidebar}>
                  <FiUser /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booking-approval" className={linkClass} onClick={closeSidebar}>
                  <FaCheckCircle /> Manage Bookings Approval
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-members" className={linkClass} onClick={closeSidebar}>
                  <FaUserFriends /> Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users" className={linkClass} onClick={closeSidebar}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-courts" className={linkClass} onClick={closeSidebar}>
                  <FaThLarge /> Manage Courts
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-bookings" className={linkClass} onClick={closeSidebar}>
                  <FiClipboard /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-coupons" className={linkClass} onClick={closeSidebar}>
                  <FiTag /> Manage Coupons
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-announcements" className={linkClass} onClick={closeSidebar}>
                  <FaBullhorn /> Manage Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-admin" className={linkClass} onClick={closeSidebar}>
                  <FaUserShield /> Make Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/make-announcement" className={linkClass} onClick={closeSidebar}>
                  <FiSpeaker /> Make Announcement
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-court" className={linkClass} onClick={closeSidebar}>
                  <FaPlusCircle /> Add Court
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
