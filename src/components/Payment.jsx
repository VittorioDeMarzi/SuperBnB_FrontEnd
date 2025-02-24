import { useState } from "react";

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState("card");
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
    

    return (<>
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

       
    </>)
}