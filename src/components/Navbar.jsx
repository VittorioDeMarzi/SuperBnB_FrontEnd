import { Link } from "react-router-dom";
import { useAuth } from "./auth";

export default function Navbar() {
  const auth = useAuth();
  const { role } = useAuth();

  return (
    <nav className=" bg-background bg-opacity-70 shadow fixed top-0 left-0 w-full z-10">
      <div className="mx-auto px-4 py-2 flex justify-between p-6">
        <Link to="/home">
          <h1 className=" font-bold ext-slate-700 text-2xl">SuperBnB.</h1>
        </Link>
        <ul className="flex justify-center space-x-4 items-center ">
          <Link to="/aboutus">About Us</Link>
          <li>Contacts</li>
          <Link to="/Profile">
            <li>Profile</li>
          </Link>
          {role === "ADMIN" && (
            <>
      
            <Link to="/admin-overview">
              <li>Admin Overview</li>
            </Link>
            </>
            
          )}
          {!auth.token && (
            <Link to="/login">
              <li>Log In</li>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
