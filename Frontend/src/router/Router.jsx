import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login";
import Register from "../pages/register";
import MiniDrawer from "../components/drawer";
import CRMForm from "../pages/dashboard/crmform";
import LayoutCompnent from "./layout";

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
    children: [{ path: "crmform", element: <CRMForm /> }],
  },
]);
