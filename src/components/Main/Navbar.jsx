import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between p-6">
            <Link to="/"><h1 className=" font-bold ext-slate-700">SuperBnB.</h1></Link>
            <ul className="flex justify-center space-x-4">
                <li>About Us</li>
                <li>Contacts</li>
                <Link to="/login"><li>Log In</li></Link>
            </ul>
        </nav>
    )
}