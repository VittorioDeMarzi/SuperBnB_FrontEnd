import { useLocation, useNavigate } from "react-router-dom";
import BookingRequestInfo from "../components/BookingRequestInfo";
import Payment from "../components/Payment";
import ProfileSection from "../components/ProfileSection";

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
        // console.log(data);
        navigate("/user/booking-confirmation", { state: data });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="mx-auto p-12 min-h-screen">
      <div className="p-12 bg-slate-50 grid grid-flow-row gap-5 shadow-md">
        <ProfileSection />

        <BookingRequestInfo formData={formData} availability={availability} />

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
