import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

export default function Navbar() {
  const auth = useAuth();
  const { role } = useAuth();

  const handleLogOut = () => {
    auth.logout();
    navigate("/home");
  };

  return (
    <nav className=" bg-background bg-opacity-70 shadow fixed top-0 left-0 w-full z-10">
      <div className="mx-auto px-4 py-0 flex justify-between items-center gap-6">
        <Link to="/home" className="flex items-center">
          <h1 className=" font-bold ext-slate-700 text-2xl">SuperBnB.</h1>
        </Link>
        <p className="text-xs md:text-sm font-semibold">
          🔔 <span className="mr-2">SuperBnB is a demo project.</span>
          <Link to="/disclaimer" className="underline font-bold hover:text-yellow-700">Learn more</Link>
        </p>
        <ul className="flex justify-center space-x-4 items-center  ">
          {role === "ADMIN" && (
            <li>
              <Link to="/admin-overview">Admin</Link>
            </li>
          )}
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-slate-300 rounded-box z-[1] w-52 p-2 shadow mt-5"
              >
              <li>
                <Link to="/user/profile">Profile</Link>
              </li>
              {!auth.token && (
                <li>
                  <Link to="/login">Log In / Sign Up</Link>
                </li>
              )}
              {auth.token && (
                <li>
                  <button onClick={handleLogOut}>Log out</button>
                </li>
              )}
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <p>Contacts</p>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
}
