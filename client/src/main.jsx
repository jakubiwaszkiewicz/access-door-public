import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Login from "./pages/login";

import OwnerPrivilegesAdd from "./pages/owner/Privileges/Add";
import OwnerPrivilegesDelete from "./pages/owner/Privileges/Delete";


import AdminEditAccesses from "./pages/admin/edit/Accesses";
import AdminEditDoors from "./pages/admin/edit/Doors";
import AdminEditLabourers from "./pages/admin/edit/Labourers";


import LabourerProfile from "./pages/labourer/Profile";
import LabourerAccesses from "./pages/labourer/Accesses";

import Error401 from "./pages/error401";

import { useLocation } from 'react-router-dom';

const Layout = () => {
  let location = useLocation();
  return (
    <div>
      { location.pathname != '/' && <Header /> }
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
        children: [
          {
            path: "/",
            element: <Login/>,
          },
          {
            path: "/owner/privileges/add",
            element: <OwnerPrivilegesAdd />,
          },
          {
            
            path: "/owner/privileges/delete",
            element: <OwnerPrivilegesDelete />,
          },
          {
            path: "/admin/edit/accesses",
            element: <AdminEditAccesses />,
          },
          {
            path: "/admin/edit/doors",
            element: <AdminEditDoors />,
          },
          {
            path: "/admin/edit/labourers",
            element: <AdminEditLabourers />,
          },
          {
            path: "/labourer/profile",
            element: <LabourerProfile />,
          },
          {
            path: "/labourer/accesses",
            element: <LabourerAccesses />,
          },
          {
            path: "/error401",
            element: <Error401 />,
          },
          // {
          //   path: "/log",
          //   element: <Log />,
          // },
        ]
      },
    ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
