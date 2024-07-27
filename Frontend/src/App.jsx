import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLoginPage from './pages/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import HomePage from './pages/HomePage';
import AdminRegister from './pages/AdminRegister';
import GrassRootWorkerRegister from './pages/GrassRootWorkerRegister';
import DashBoard from './pages/DashBoard';
import AgGrid from './pages/AgGid';
import SideNavDonor from './pages/SideNavDonor';
import DonatePage from './pages/DonatePage';
import Combine from './pages/Combine';
import UserInfo from './pages/UserInfo';
import RegisterPageSchool from './pages/RegisterPageSchool.jsx';
import RegisterPageDonor from './pages/RegisterPageDonor.jsx';
import DashboardSchool from './pages/DashboardSchool.jsx';
import SubmitRequest from './pages/SubmitRequests.jsx';
import ViewRequests from './pages/ViewRequests.jsx';


export default function App() {
  const router = createBrowserRouter([
    {"path": "/", "element": <HomePage/>},
    {"path": "/user/login", "element": <UserLoginPage/>},
    {"path": "/user/register", "element": <UserRegisterPage/>},
    {"path": "/admin/register", "element": <AdminRegister/>},
    {"path": "/grassRoot/register", "element": <GrassRootWorkerRegister/>},
    {"path": "/school/register", "element": <RegisterPageSchool/>},
    {"path": "/donor/register", "element": <RegisterPageDonor/>},
    {"path": "/dashboard", "element": <DashBoard/>},
    {"path": "/dashboard/school", "element": <DashboardSchool/>},
    {"path": "/viewRequest", "element": <ViewRequests/>},
    {"path": "/submitReques", "element": <SubmitRequest/>},
    {"path": "/grid", "element": <AgGrid/>},
    {"path": "/donate", "element": <DonatePage/>},
    {"path": "/test", "element": <Combine/>},
    {"path": "/test2", "element": <UserInfo/>},

  ])
  return (
    <RouterProvider router={router}/>
  )
}
