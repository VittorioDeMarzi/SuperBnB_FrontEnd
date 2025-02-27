import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Map from "../components/Map";
import PropertyImagesUser from "../components/PropertyImagesUser";
import CheckAvailability from "../components/CheckAvailability";

export default function PropertyView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    fetchDataApartment();
  }, []);

  async function fetchDataApartment() {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/${id}`
      );

      if (response.status === 403) {
        setError(
          "You are not allowed to access this property. Redidection to Home"
        );
        navigate("/home");
        throw new Error("Property is private");
      }

      if (!response.ok) {
        setError("Failed to fetch property");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

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

      setAddress(newAddress);
    } catch (error) {
      console.error("Error fetching property:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p className="text-center container mx-auto p-4 min-h-screen">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 container mx-auto p-4 min-h-screen">{error}</p>;
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
        <div className="max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden p-6 mx-auto mb-12">
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
            <CheckAvailability propertyId={id} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
