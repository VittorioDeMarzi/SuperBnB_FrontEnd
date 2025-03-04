import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <section className="min-h-screen p-12">
        <h1 className="text-ocra text-5xl p-5">
          Welcome to SuperBnB - A Learning Project
        </h1>
        <p className="mb-5">
          SuperBnB is a web application for managing and booking vacation
          rentals. This project is a work in progress and serves as a hands-on
          opportunity to apply and refine my skills in{" "}
          <strong>
            Java (Spring Boot), React, PostgreSQL, Redis, Docker, and DevOps
          </strong>
          .
        </p>

        <p>You can test the platform using the following credentials:</p>
        <div>
          <h2 className="text-ocra text-2xl mb-3 p-2">User Experience</h2>
          <p>
            🧑‍💻 <strong>Email:</strong> user1@test.com |{" "}
            <strong>Password:</strong> 123
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Search for properties in major German cities</li>
            <li>Filter available options</li>
            <li>Edit profile information</li>
            <li>Book an apartment</li>
          </ul>
        </div>

        <div>
          <h2 className="text-ocra text-2xl mb-3 p-2">Admin Experience</h2>
          <p>
            🔧 <strong>Email:</strong> admin@test.com |{" "}
            <strong>Password:</strong> 123
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Add new apartments</li>
            <li>Upload photos for properties</li>
            <li>Modify listing visibility</li>
          </ul>
        </div>

        {/* Disclaimer Section */}
        <section className="bg-yellow-200 text-yellow-900 p-6 mt-12 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-3">⚠️ Important Disclaimer</h3>
          <p className="mb-3">
            SuperBnB is a **demo project** created for educational and
            development purposes. The listings on this site are **fictional**
            and not real apartments available for rent. No actual bookings or
            payments can be made through this website.
          </p>
          <p className="mb-3">
            This platform is built to demonstrate a booking system, not to
            provide real rental services. We do not process any personal data or
            payment information. Any interactions on the site are purely for
            demonstration purposes and will not result in any real transactions.
          </p>
          <p className="mb-3">
            If you have any questions or concerns, please feel free to contact
            us. Thank you for exploring SuperBnB!
          </p>
          <Link
            to="/disclaimer"
            className="underline font-bold text-yellow-700 hover:text-yellow-800"
          >
            Read Full Disclaimer
          </Link>
        </section>
      </section>
    </>
  );
}
