import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLoginPage from './pages/UserLoginPage';
import HomePage from './pages/HomePage';
import AdminRegister from './pages/AdminRegister';
import GrassRootWorkerRegister from './pages/GrassRootWorkerRegister';
import AgGrid from './pages/AgGid';
// import SideNavDonor from './pages/SideNavDonor';
import DonatePage from './pages/DonatePage';
import Combine from './pages/Combine';
import UserInfo from './pages/DonorInfo.jsx';
import RegisterPageSchool from './pages/RegisterPageSchool.jsx';
import RegisterPageDonor from './pages/RegisterPageDonor.jsx';
import DashboardSchool from './pages/DashboardSchool.jsx';
import SubmitRequest from './pages/SubmitRequests.jsx';
import ViewRequests from './pages/ViewRequests.jsx';
import { DonorProvider } from './context/DonorContext.jsx';
import { GrassRootWorkerProvider } from './context/GrassRootWorkerContext.jsx';
import { SchoolProvider } from './context/SchoolContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';


import GrassRooter from './pages/GrassRooter';import NGODashboard from './pages/NGODashboard';
import AllDonations from './pages/AllDonations';
import SideBarAdmin from './pages/SideBarAdmin'
export default function App() {
  const router = createBrowserRouter([
    {"path": "/", "element": <HomePage/>},
    {"path": "/user/login", "element": <UserLoginPage/>},
    {"path": "/admin/register", "element": <AdminRegister/>},
    {"path": "/grassRoot/register", "element": <GrassRootWorkerRegister/>},
    {"path": "/school/register", "element": <RegisterPageSchool/>},
    {"path": "/donor/register", "element": <RegisterPageDonor/>},
    {"path": "/school/dashboard", "element": <DashboardSchool/>},
    {"path": "/viewRequest", "element": <ViewRequests/>},
    {"path": "/submitReques", "element": <SubmitRequest/>},
    {"path": "/grid", "element": <AgGrid/>},
    {"path": "/donate", "element": <DonatePage/>},
    {"path": "/donor/dashboard", "element": <Combine/>},
    {"path": "/test2", "element": <UserInfo/>},
    {"path": "/admin/dashboard", "element": <NGODashboard/>},
    {"path": "/grassRooter/dashboard", "element": <GrassRooter/>},{"path": "/NGO/Dashboard", "element": <NGODashboard/>},
    {"path": "/NGO/AllDonations", "element": <AllDonations/>},
    {"path": "/NGO/Sidebar", "element": <SideBarAdmin/>}
    
  ])
  return (
    <DonorProvider>
      <GrassRootWorkerProvider>
        <SchoolProvider>
          <AdminProvider>
             <RouterProvider router={router}/>
          </AdminProvider>
        </SchoolProvider>
      </GrassRootWorkerProvider>
    </DonorProvider>

  )
}
