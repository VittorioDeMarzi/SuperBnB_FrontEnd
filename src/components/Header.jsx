import headerPic from "/src/assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg"
import logo from "../assets/images/Logo.png"

export default function Header() {
  return (
    <>
      <div 
      className="parallax relative bg-fixed bg-center bg-no-repeat bg-cover h-[70vh] text-white mb-4"
      style={{ backgroundImage: `url(${headerPic})` }}>
        {/* Overlay to lighten the background */}
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>

        <img
          src={logo}
          alt="Logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96"
        />
      </div>

        <h2 className="text-6xl text-center  text-ocra my-12">
          Welcome To SuperBnB
        </h2>
  
    </>
  );
}
