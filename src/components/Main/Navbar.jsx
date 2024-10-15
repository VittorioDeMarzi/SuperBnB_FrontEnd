import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className=" bg-slate-50 bg-opacity-80 shadow fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between p-6">
        <Link to="/">
          <h1 className=" font-bold ext-slate-700 text-2xl">SuperBnB.</h1>
        </Link>
        <ul className="flex justify-center space-x-4 items-center">
          <li>About Us</li>
          <li>Contacts</li>
          <Link to="/login">
            <li>Log In</li>
          </Link>
          <Link to="/login">
            <li>Log In</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
