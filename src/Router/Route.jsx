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
// import AdminRoute from "../Routes/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            Component:Home, 
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path:'/register',
            Component:Register
        }
    ]
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:'/dashboard/manage-courts',
        element:<ManageCourts></ManageCourts>
      },
      {
        path:'/dashboard/add-court',
        Component: AddCourt
      },
      {
        path:'/dashboard/profile',
        element:<MyProfile></MyProfile>
      },
      {
        path:'/dashboard/make-admin',
        element:<MakeAdmin></MakeAdmin>
      },
      {
        path:'/dashboard/all-courts',
        element:<AllCourts></AllCourts>
      },
      {
        path:'/dashboard/pending-bookings',
        element:<PendingBookings></PendingBookings>
      }
    ]
  }
]);