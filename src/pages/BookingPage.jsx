import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingPage() {
  const location = useLocation();
  const { formData, availability } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    cardHolder: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleCardDetailChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
      console.log(data);
      if (data) {
        console.log(data);
        navigate("/booking-confirmation", { state: data });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className="mx-auto p-12 min-h-screen">
      <div className="p-12 bg-slate-50 grid grid-flow-row gap-5 shadow-md">
        <h2 className=" text-center text-ocra font-bold text-5xl">
          Payment Confirmation
        </h2>
        <div className="grid gap-6">
          <p>
            <strong>Adults:</strong> {formData.numAdults}
          </p>
          <p>
            <strong>Children:</strong> {formData.numChildren}
          </p>
          <p>
            <strong>Check-in:</strong> {formData.checkInDate}
          </p>
          <p>
            <strong>Check-out:</strong> {formData.checkOutDate}
          </p>
          <p>
            <strong>Nights:</strong> {availability.numNights}
          </p>
          <p>
            <strong>Price per Night:</strong> €{availability.pricePerNight}
          </p>
          <p className="underline">
            <strong>Total Price:</strong> €{availability.totalPrice}
          </p>
        </div>
        <h3 className=" text-center text-ocra font-bold text-3xl mb-6">
          Payment method
        </h3>
        <div className="flex gap-12 ">
          <button
            onClick={() => setPaymentMethod("card")}
            className="p-4 text-lg rounded-md min-w-44"
            style={{
              border:
                paymentMethod === "card"
                  ? "2px solid #ba8a3b"
                  : "1px solid #ccc",
              backgroundColor: paymentMethod === "card" ? "#ffe8ca" : "#f9f9f9",
              boxShadow:
                paymentMethod === "card"
                  ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                  : "none",
              cursor: "pointer",
            }}
          >
            Carta di credito
          </button>
          <button
            className="p-4 text-lg rounded-md min-w-44"
            onClick={() => setPaymentMethod("paypal")}
            style={{
              border:
                paymentMethod === "paypal"
                  ? "2px solid #ba8a3b"
                  : "1px solid #ccc",
              backgroundColor:
                paymentMethod === "paypal" ? "#ffe8ca" : "#f9f9f9",
              boxShadow:
                paymentMethod === "paypal"
                  ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                  : "none",
              cursor: "pointer",
            }}
          >
            PayPal
          </button>
        </div>

        {paymentMethod === "card" && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="cardHolder"
              placeholder="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleCardDetailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocra"
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleCardDetailChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocra"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={cardDetails.expirationDate}
                onChange={handleCardDetailChange}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocra"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleCardDetailChange}
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocra"
              />
            </div>
          </div>
        )}

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
