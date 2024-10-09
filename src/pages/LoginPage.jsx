import { useState } from "react";
import Navbar from "../components/Main/Navbar";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    const auth = {
      email,
      password,
    };
    const encoded = btoa(email + ":" + password);
    console.log(encoded);
    console.log(`${import.meta.env.VITE_BACKEND}/api/v1/auth/signin`);
    fetch(import.meta.env.VITE_BACKEND + "/api/v1/auth/signin", {
      method: "POST",
      headers: {
        Authorization: "Basic " + encoded,
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Errore di autenticazione");
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/");
      });
  }

  return (
    <main className="bg-[url('src/assets/images/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg')] bg-cover bg-center h-screen relative">
      <Navbar />
      <section className=" flex justify-center items-center absolute inset-0">
        <form
          onSubmit={login}
          className=" bg-white bg-opacity-75 p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
