import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import headerPic from "/src/assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();
    setError("");
    const auth = {
      username,
      password,
    };
    // console.log(auth);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auth),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  }

  return (
    <>
      <div
        className="relative bg-scroll md:bg-fixed bg-center bg-no-repeat bg-cover h-[70vh] mb-4"
        style={{ backgroundImage: `url(${headerPic})` }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-30"></div>

        <section className=" flex justify-center items-center absolute inset-0">
          <form
            onSubmit={signup}
            className=" bg-white bg-opacity-75 p-6 rounded-lg shadow-md w-96"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">Sign up</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Password"
                required
              />
            </div>
            <Link to="/login">Already have an account? Log in</Link>
            <button
              type="submit"
              className="w-full bg-ocra hover:bg-background text-white font-bold py-2 rounded"
            >
              Sign up
            </button>
          </form>
        </section>
      </div>
      <header className="relative h-[150px] bg-cover bg-center">
        <h2 className="header-title text-6xl text-center relative text-ocra">
          Welcome To SuperBnB
        </h2>
      </header>
    </>
  );
}
