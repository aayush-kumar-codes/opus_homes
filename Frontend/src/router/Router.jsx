import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";
import MiniDrawer from "../components/drawer";
import CRMForm from "../pages/dashboard/crmform";
import LayoutCompnent from "./layout";
import ProfileDetails from "../pages/dashboard/profiledetails";
import ProfileEdit from "../pages/dashboard/profileedit";
import CompanyFinance from "../pages/dashboard/companyfinance";
import ProjectUpdate from "../pages/dashboard/projectupdate";
import ProjectProgression from "../pages/dashboard/projectprogression";
import ProjectManagement from "../pages/dashboard/projectmanagement";
import ProjectMangementDetails from "../pages/dashboard/projectmangementdetails";
import NewJobEntry from "../pages/dashboard/newjobentry";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Login /> },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutCompnent />,
    children: [
      { path: "", element: <CRMForm /> },
      { path: "projectmanagement", element: <ProjectManagement /> },
      {
        path: "projectmanagementdetails",
        element: <ProjectMangementDetails />,
      },
      { path: "companyfinance", element: <CompanyFinance /> },
      { path: "projectupdate", element: <ProjectUpdate /> },
      { path: "projectprogression", element: <ProjectProgression /> },
      { path: "profile", element: <ProfileDetails /> },
      { path: "editprofile", element: <ProfileEdit /> },
      { path: "newjobentry", element: <NewJobEntry /> },
    ],
  },
]);
