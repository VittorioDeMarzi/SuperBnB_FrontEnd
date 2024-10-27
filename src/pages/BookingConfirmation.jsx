import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  const bookingConfirmationData = location.state || {};

  if (!bookingConfirmationData) {
    return <h1 className="text-red-500 text-center">No booking data available.</h1>;
  }

  const {
    bookingCode,
    bookingDate,
    checkInDate,
    checkOutDate,
    property,
    numAdults,
    numChildren,
    totGuests,
    totalNights,
    totalPrice,
  } = bookingConfirmationData;

  return (
    <div className="max-w-4xl mx-auto my-8 p-12 border border-gray-300 rounded-lg shadow-lg bg-slate-100">
      <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
      <div className="mb-4">
        <p><strong>Booking Code:</strong> {bookingCode}</p>
        <p><strong>Booking Date:</strong> {new Date(bookingDate).toLocaleString()}</p>
        <p><strong>Check-In Date:</strong> {checkInDate}</p>
        <p><strong>Check-Out Date:</strong> {checkOutDate}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Property Details</h3>
        <p><strong>Title:</strong> {property.title}</p>
        <p><strong>Location:</strong> {property.street}, {property.houseNumber}, {property.zipCode}, {property.city}, {property.country}</p>
        <p><strong>Rooms:</strong> {property.rooms}</p>
        <p><strong>Price per Night:</strong> €{property.minPricePerNight.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Guest Information</h3>

        <p><strong>Adults:</strong> {numAdults}</p>
        <p><strong>Children:</strong> {numChildren}</p>
        <p><strong>Total Guests:</strong> {totGuests}</p>
        <p><strong>Total Nights:</strong> {totalNights}</p>
        <p><strong>Total Price:</strong> €{totalPrice.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Property Images</h3>
        <div className="grid grid-cols-2 gap-2">
          {property.picUrls.map((url, index) => (
            <img key={index} src={url} alt={`Property image ${index + 1}`} className="w-full h-auto rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
