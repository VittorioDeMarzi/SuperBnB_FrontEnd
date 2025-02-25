import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from "./pages/Signup.jsx";
import AddProperty from "./pages/AddProperty";
import ProtectedRouteUser from "./hooks/ProtectedRouteUser.jsx";
import PropertyControllPage from "./pages/PropertyControllPage.jsx";
import AdminOverview from "./pages/AdminOverview.jsx";
import PropertyView from "./pages/PropertyView.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import "leaflet/dist/leaflet.css";
import BookingPage from "./pages/BookingPage.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import SearchLandingPage from "./pages/SearchLandingPage.jsx";
import UserBookings from "./pages/UserBookings.jsx";
import ProtectedRouteAdmin from "./hooks/ProtectedRouteAdmin.jsx";
import AdminLayout from "./Layouts/AdminLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/searchpage",
        element: <SearchLandingPage />,
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
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/user",
        element: <ProtectedRouteUser />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "booking-history",
            element: <UserBookings />,
          },
          {
            path: "booking/:id",
            element: <BookingPage />,
          },
          {
            path: "booking-confirmation",
            element: <BookingConfirmation />,
          },
        ],
      },
    ],
  },
  {
    path: "",
    element: <ProtectedRouteAdmin />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "add-property",
            element: <AddProperty />,
          },
          {
            path: "property-controll/:id",
            element: <PropertyControllPage />,
          },
          {
            path: "admin-overview",
            element: <AdminOverview />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
