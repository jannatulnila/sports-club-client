import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Register";
import Register from "../Pages/Authentication/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageCourts from "../Pages/Dashboard/ManageCourts";
import AddCourt from "../Pages/Dashboard/AddCourt";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import PendingBookings from "../Pages/Dashboard/PendingBookings/PendingBookings";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";

import AdminRoute from "../Routes/AdminRoute";
import Courts from "../Pages/Courts/Courts";
import ManageBookingApproval from "../Pages/ManageBookingApprovel/ManageBookingApprovel";
import MyMemberProfile from "../Pages/Dashboard/MyProfile/MymemberProfile";
import ApprovedBookings from "../Pages/Dashboard/ApprovedBookings/ApprovedBookings";
import Payment from "../Pages/Dashboard/Payment/Payment";
import ManageCupons from "../Pages/Dashboard/ManageCoupons/ManageCoupons";
import ManageMembers from "../Pages/Dashboard/ManageMembers/ManageMembers";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import MemberRoute from "../Routes/MemberRoute";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ManageAnnouncements from "../Pages/Dashboard/ManageAnnouncements/ManageAnnouncements";
import Announcements from "../Pages/Dashboard/Announcements/Announcements";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import ConfirmedBookings from "../Pages/Dashboard/ConfirmedBookings/ConfirmedBookings";
import DashboardHome from "../Pages/Dashboard/DashboadHome/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
      path:'/courts',
      Component:Courts
      },
      {
      path:'/forbidden',
      Component:Forbidden
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/courts',
        element: <Courts></Courts>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index:true,
        Component:DashboardHome
      },
      {
        path: '/dashboard/admin-profile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: '/dashboard/make-announcement',
        element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
      },
      {
        path: '/dashboard/manage-courts',
        element: <AdminRoute><ManageCourts></ManageCourts></AdminRoute>
      },
      {
        path: '/dashboard/add-court',
        element:<AdminRoute><AddCourt></AddCourt></AdminRoute>
      },
      {
        path: '/dashboard/Manage-Announcements',
        element:<AdminRoute><ManageAnnouncements></ManageAnnouncements></AdminRoute>
      },
      {
        path: '/dashboard/booking-approval',
        element:<AdminRoute><ManageBookingApproval></ManageBookingApproval></AdminRoute>
      },
      {
        path: '/dashboard/profile',
        element: <MyProfile></MyProfile>
      },
      {
        path: '/dashboard/make-admin',
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      },
      {
        path: '/dashboard/manage-bookings',
        element:<AdminRoute><ManageBookings></ManageBookings></AdminRoute>
      },
      {
        path: '/dashboard/manage-coupons',
        element:<AdminRoute><ManageCupons></ManageCupons></AdminRoute>
      },
      {
        path: '/dashboard/manage-courts',
        element:<AdminRoute><ManageCourts></ManageCourts></AdminRoute>
      },
      {
        path: '/dashboard/manage-members',
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
      },
      {
        path: '/dashboard/all-users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:"/dashboard/my-member-profile",
        element:<MemberRoute><MyMemberProfile></MyMemberProfile></MemberRoute>
      },
      
      {
        path: '/dashboard/pending-bookings',
        element: <PendingBookings></PendingBookings>
      },
      {
        path: '/dashboard/approved-bookings',
        element: <MemberRoute><ApprovedBookings></ApprovedBookings></MemberRoute>
      },
      {
        path:'/dashboard/payment/:id',
        element:<MemberRoute><Payment></Payment></MemberRoute>
      },
      {
        path:'/dashboard/payment-history',
        element:<MemberRoute><PaymentHistory></PaymentHistory></MemberRoute>
      },
      {
        path:'/dashboard/confirmed-bookings',
        element:<MemberRoute><ConfirmedBookings></ConfirmedBookings></MemberRoute>
      },
      {
        path:'/dashboard/Announcements',
        element:<Announcements></Announcements>
      }
    ]
  }
]);