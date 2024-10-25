
import { useState } from "react";

export default function CheckAvailability({ propertyId }) {
  const [formData, setFormData] = useState({
    propertyId: propertyId,
    numAdults: 1,
    numChildren: 0,
    checkInDate: "",
    checkOutDate: "",
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
        }/api/v1/superbeb/property/check-availability/${propertyId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok)
        throw new Error(`Something went wrong , Error: ${response.statusText}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <>
      <form onSubmit={submit} className="">
        <h2 className="text-2xl font-bold mb-6">Check Availability</h2>

        <div className="flex justify-start mb-4 gap-12">
            <div className="">
              <label htmlFor="checkInDate" className="block text-gray-700 mb-2">
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
              <label htmlFor="checkOutDate" className="block text-gray-700 mb-2">
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
          <label htmlFor="numChildren" className="block text-gray-700 mb-2">
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
