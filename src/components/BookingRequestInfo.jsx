export default function BookingRequestInfo({ formData, availability }) {
    
    return (<>
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
    </>)
}