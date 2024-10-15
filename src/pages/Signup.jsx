import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();
    setError("");
    const auth = {
      email,
      password,
    };
    console.log(auth);
    const encoded = btoa(email + ":" + password);
    console.log(`${import.meta.env.VITE_BACKEND}/api/v1/auth/signin`);
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND + "/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + encoded,
          },
          body: JSON.stringify(auth),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid email or password.");
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      }

      const data = await response.json(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message); 
    }
  }

  return (
    <>
      <div className="parallax relative bg-[url('src/assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg')] bg-fixed bg-center bg-no-repeat bg-cover h-[70vh] mt-12 mb-4">
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
                onChange={(e) => setEmail(e.target.value)}
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
            <a href="/login">Already have an account? Log in</a>
            <button
              type="submit"
              className="w-full bg-ocra hover:bg-background text-white font-bold py-2 rounded"
            >
              Login
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
