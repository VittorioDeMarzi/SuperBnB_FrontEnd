import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./components/auth";
import LoginPage from "./pages/LoginPage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from "./pages/Signup.jsx";
import AddProperty from "./pages/AddProperty";
import ProtectorElement from "./pages/ProtectorUserElement.jsx";
import PropertyControllPage from "./pages/PropertyControllPage.jsx";
import AdminOverview from "./pages/AdminOverview.jsx";
import PropertyView from "./pages/PropertyView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/property-view/:id",
        element: <PropertyView />,
      },
      {
        path: "/profile",
        element: <ProtectorElement element={<Profile />}/>,
      },
      {
        path: "/add-property",
        element: <ProtectorElement element={<AddProperty/>} />,
      },
      {
        path: "/property-controll/:id",
        element: <ProtectorElement element={<PropertyControllPage/>} />,
      },
      {
        path: "/admin-overview",
        element: <ProtectorElement element={<AdminOverview/>} />,
      },

    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);
