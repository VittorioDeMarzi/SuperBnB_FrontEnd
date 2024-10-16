import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
      <div className="bg-background">
        <Navbar />
        <main className="mt-12">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
