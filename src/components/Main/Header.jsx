import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <Navbar />
      <div
        className="parallax relative bg-[url('src/assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg')] bg-fixed bg-center bg-no-repeat bg-cover h-[70vh] mt-12 text-white"
        style={{ textShadow: "2px 2px black" }}
      >
        {/* Overlay to lighten the background */}
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>

        <img
          src="src/assets/images/Logo.png"
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96"
        />
      </div>

      <header className="relative h-[150px] bg-[url('./assets/images/services4.jpg')] bg-cover bg-center">
        {/* Overlay to lighten the background */}

        <h2 className="header-title text-6xl text-center relative">
          Welcome To SuperBnB
        </h2>
      </header>
    </>
  );
}
