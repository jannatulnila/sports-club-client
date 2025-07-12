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
import AllCourts from "../Pages/Dashboard/AllCourts/AllCourts";
import PendingBookings from "../Pages/Dashboard/PendingBookings/PendingBookings";
import MakeAdmin from "../Pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";

import AdminRoute from "../Routes/AdminRoute";
import Courts from "../Pages/Courts/Courts";
import ManageBookingApproval from "../Pages/ManageBookingApprovel/ManageBookingApprovel";
import ManageMembers from "../Pages/ManageMembers/ManageMembers";
import MyMemberProfile from "../Pages/Dashboard/MyProfile/MymemberProfile";


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
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard/manage-courts',
        element: <AdminRoute><ManageCourts></ManageCourts></AdminRoute>
      },
      {
        path: '/dashboard/add-court',
        element:<AdminRoute><AddCourt></AddCourt></AdminRoute>
      },
      {
        path: '/dashboard/booking-approval',
        element:<AdminRoute><ManageBookingApproval></ManageBookingApproval></AdminRoute>
      },
      {
        path: '/dashboard/manage-members',
        element:<AdminRoute><ManageMembers></ManageMembers></AdminRoute>
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
        path:"/dashboard/my-member-profile",
        element:<MyMemberProfile></MyMemberProfile>
      },
      {
        path: '/dashboard/all-courts',
        element: <AllCourts></AllCourts>
      },
      {
        path: '/dashboard/pending-bookings',
        element: <PendingBookings></PendingBookings>
      }
    ]
  }
]);