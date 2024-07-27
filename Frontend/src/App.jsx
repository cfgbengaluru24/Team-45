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


export default function App() {
  const router = createBrowserRouter([
    {"path": "/", "element": <HomePage/>},
    {"path": "/user/login", "element": <UserLoginPage/>},
    {"path": "/user/register", "element": <UserRegisterPage/>},
    {"path": "/admin/register", "element": <AdminRegister/>},
    {"path": "/grassRoot/register", "element": <GrassRootWorkerRegister/>},
    {"path": "/dashboard", "element": <DashBoard/>},
    {"path": "/grid", "element": <AgGrid/>},
    {"path": "/donate", "element": <DonatePage/>},
    {"path": "/test", "element": <Combine/>},
    {"path": "/test2", "element": <UserInfo/>},

  ])
  return (
    <RouterProvider router={router}/>
  )
}
