import { useLocation, useNavigate } from "react-router-dom";
import BookingRequestInfo from "../components/BookingRequestInfo";
import Payment from "../components/Payment";
import ProfileSection from "../components/ProfileSection";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const location = useLocation();
  const { formData, availability } = location.state || {};

  const navigate = useNavigate();

  async function confirmBooking() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/booking`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Something went wrong, Error: ${errorText}`);
      }

      const data = await response.json();
      if (data) {
        console.log(data);
        navigate("/user/booking-confirmation", { state: data });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="">
      <div className="p-12 bg-slate-50 grid gap-10 shadow-md">
        <ProfileSection />

        <BookingRequestInfo formData={formData} availability={availability} />

        {/* Disclaimer Section */}
                        <section className="bg-yellow-200 text-yellow-900 p-6 mt-12 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold mb-3">⚠️ Important Disclaimer</h3>
                            <p className="mb-3">SuperBnB is a **demo project** created for educational and development purposes. The listings on this site are **fictional** and not real apartments available for rent. No actual bookings or payments can be made through this website.</p>
                            <p className="mb-3">This platform is built to demonstrate a booking system, not to provide real rental services. We do not process any personal data or payment information. Any interactions on the site are purely for demonstration purposes and will not result in any real transactions.</p>
                            <p className="mb-3">If you have any questions or concerns, please feel free to contact us. Thank you for exploring SuperBnB!</p>
                            <Link to="/disclaimer" className="underline font-bold text-yellow-700 hover:text-yellow-800">Read Full Disclaimer</Link>
                        </section>
        <Payment />
        <button
          className="mt-8 w-full p-3 text-lg text-white bg-ocra rounded-lg shadow-md hover:bg-background focus:outline-none focus:ring-2 focus:ring-ocra"
          onClick={() => confirmBooking()}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
