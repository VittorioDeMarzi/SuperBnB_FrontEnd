import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAvailability({ propertyId }) {
  const [availability, setAvailability] = useState(null);
  const filters = sessionStorage.getItem("filters");
  console.log("filters, ",  filters.city)

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyId: propertyId,
    numAdults: filters.numGuests || "2",
    numChildren: 0,
    checkInDate: filters.checkInDate || "",
    checkOutDate: filters.checkOutDate || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    fetchAvailabilityData();
  };

  async function fetchAvailabilityData() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND
        }/api/v1/superbeb/property/public/check-availability`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok)
        throw new Error(`Something went wrong , Error: ${response.text}`);
      const data = await response.json();
      console.log(data);
      if (data) setAvailability(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <>
      {formData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          <form onSubmit={submit} className="p-12 card shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Check Availability</h2>
            <div className="flex justify-between mb-4 gap-12">
              <div className="">
                <label
                  htmlFor="checkInDate"
                  className="block text-gray-700 mb-2"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  name="checkInDate"
                  value={formData.checkInDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="">
                <label
                  htmlFor="checkOutDate"
                  className="block text-gray-700 mb-2"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-between mb-4 gap-12">
              <div className="mb-4">
                <label htmlFor="numAdults" className="block text-gray-700 mb-2">
                  Number of Adults
                </label>
                <input
                  type="number"
                  id="numAdults"
                  name="numAdults"
                  value={formData.numAdults}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numChildren"
                  className="block text-gray-700 mb-2"
                >
                  Number of Children
                </label>
                <input
                  type="number"
                  id="numChildren"
                  name="numChildren"
                  value={formData.numChildren}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-violet text-white py-3 text-lg font-semibold rounded-lg hover:bg-opacity-55 transition duration-300"
            >
              Check
            </button>
          </form>
          {availability != null && availability.isAvailable === true && (
            <div className="w-5/6 card shadow-lg p-12">
              <div className="flex justify-between">
                <h3 className=" underline mb-6">
                  {availability.pricePerNight} € x {availability.numNight}{" "}
                  nights
                </h3>
                <p>{availability.totalPrice} €</p>
              </div>
              <button
                onClick={() =>
                  navigate(`/user/booking/${propertyId}`, {
                    state: { formData, availability },
                  })
                }
                className="w-full bg-violet text-white py-3 text-lg font-semibold rounded-lg hover:bg-opacity-55 transition duration-300"
              >
                Book Now
              </button>
              <p></p>
            </div>
          )}
          {availability != null && availability.isAvailable === false && (
            <div className="w-5/6 card shadow-lg p-12">
              <div className="flex justify-between">
                <h3 className=" underline mb-6">
                  Not available for the given dates.
                </h3>
              </div>
              <button
                disabled
                className="w-full bg-violet text-white py-3 text-lg font-semibold rounded-lg bg-opacity-55 transition duration-300"
              >
                Book Now
              </button>
              <p></p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
