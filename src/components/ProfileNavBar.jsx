import React from "react";
import { NavLink } from "react-router-dom";

const ProfileNavbar = () => {
  return (
    <nav className="-mt-12 text-black flex justify-center space-x-6 py-4">
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition ${
            isActive
              ? "text-blue-400 border-b-2 border-blue-400"
              : "hover:text-gray-400"
          }`
        }
      >
        User Details
      </NavLink>
      <NavLink
        to="/booking-history"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md transition ${
            isActive
              ? "text-blue-400 border-b-2 border-blue-400"
              : "hover:text-gray-400"
          }`
        }
      >
        Bookings
      </NavLink>
    </nav>
  );
};

export default ProfileNavbar;
