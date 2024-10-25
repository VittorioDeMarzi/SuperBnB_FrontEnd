import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import PropertyImagesUser from "../components/PropertyImagesUser";
import CheckAvailability from "../components/CheckAvailability";

export default function PropertyView() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchDataApartment();
  }, []);

  async function fetchDataApartment() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setProperty(data);
      const newAddress =
        data.street +
        " " +
        data.houseNumber +
        ", " +
        data.city +
        ", " +
        data.zipCode +
        ", " +
        data.country;
      console.log(newAddress);

      setAddress(newAddress);
      console.log("Address:", address);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  }

  useEffect(() => {
    if (address) {
      console.log("Address:", address);
    }
  }, [address]);

  function goToBooking() {
    navigate(`/booking/${id}`)
  }

  return (
    <>
      <div className="mt-5">
        {property && property.picUrls && (
          <>
            <div className="pt-12">
              <div className=" bg-ocra bg-opacity-90 p-4 text-white">
                <h1 className="text-4xl font-bold">{property.title}</h1>
                <p className="text-lg">
                  {property.street} {property.houseNumber}, {property.zipCode}{" "}
                  {property.city}, {property.country}
                </p>
              </div>
            </div>
            <PropertyImagesUser picUrls={property.picUrls} />
          </>
        )}
      </div>

      {property && address ? (
        <div className="max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden p-6 mx-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Guests: {property.maxNumGuests}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                Price per night from: {property.minPricePerNight}€
              </span>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {property.description}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Amenities</h2>
            <ul className="grid grid-cols-2 gap-4 mb-6">
              <li className="flex items-center space-x-2">
                <span>✔️ Free Wi-Fi</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✔️ Air Conditioning</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✔️ Kitchen</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✔️ Washing Machine</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✔️ TV</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✔️ Coffee Maker</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Location</h2>
            <p className="text-gray-700 text-lg mb-4">{address}</p>

            <Map address={address} />
            <CheckAvailability propertyId = {id}/>
            <button
              onClick={goToBooking}
              className="w-full bg-ocra text-white py-3 text-lg font-semibold rounded-lg hover:bg-opacity-55 transition duration-300">
              Book Now for {property.minPricePerNight}€ per night
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
