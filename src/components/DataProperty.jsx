import { useNavigate } from "react-router-dom";

export default function DataProperty({ property }) {
  const navigate = useNavigate();

  if (!property) {
    return (
      <p className="text-center text-gray-500">Loading property details...</p>
    );
  }

  async function deleteProperty() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/${
          property.id
        }`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), //
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Property deleted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  }

  return (
    <>
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-300 bg-opacity-90 mb-12">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {property.title}
          </h3>
          <p className="text-gray-600">{property.description}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Address</h4>
          <p className="text-gray-600">
            {property.street}, {property.houseNumber}
          </p>
          <p className="text-gray-600">
            {property.zipCode}, {property.city}, {property.country}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Info</h4>
          <p className="text-gray-600">N. Rooms: {property.rooms}</p>
          <p className="text-gray-600">Max guests: {property.maxNumGuests}</p>
        </div>

        <p className="text-lg font-bold text-gray-800">
          Price from:{" "}
          <span className="text-green-600">€{property.minPricePerNight}</span>{" "}
          per night
        </p>

        <div className="flex justify-end mt-6">
          <button
            onClick={deleteProperty}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
