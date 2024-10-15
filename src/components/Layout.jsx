import Navbar from "./Main/Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Main/Header";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
