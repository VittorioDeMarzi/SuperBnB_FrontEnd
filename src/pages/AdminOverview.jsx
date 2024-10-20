import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProperty from "./AddProperty";

export default function AdminOverview() {
    const [allProperties, setAllProperties] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        loadPropertiesList();
    }, []);

    async function loadPropertiesList() {
        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND + "/api/v1/superbeb/property",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (!response.ok) throw new Error("Error loading Properties List");

            const data = await response.json();
            setAllProperties(data);
        } catch (error) {
            console.log("Error:", error.message);
        }
    }

    function viewDetails(propertyId) {
        navigate(`/property-controll/${propertyId}`);
    }
    
    function addProperty() {
        navigate("/add-property")
}

  return (
    <>
      <div className="container mx-auto p-4 min-h-screen">
        {allProperties && allProperties.length > 0 ? (
          <div className="max-h-full overflow-y-auto  mb-12">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left py-2 px-4">ID</th>
                  <th className="text-left py-2 px-4">Title</th>
                  <th className="text-left py-2 px-4">Country</th>
                  <th className="text-left py-2 px-4">City</th>
                  <th className="text-left py-2 px-4">Street</th>
                  <th className="text-left py-2 px-4">House Number</th>
                  <th className="text-right py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProperties.map((property, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{property.id}</td>
                    <td className="py-2 px-4">{property.title}</td>
                    <td className="py-2 px-4">{property.country}</td>
                    <td className="py-2 px-4">{property.city}</td>
                    <td className="py-2 px-4">{property.street}</td>
                    <td className="py-2 px-4">{property.houseNumber}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() =>viewDetails(property.id)}
                        className=" bg-orange-400 hover:bg-orange-300  text-white font-bold py-2 px-4 rounded"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">The list is empty</p>
        )}
              <button
                  onClick={() => addProperty()}
                  className=" bg-orange-400 hover:bg-orange-300  text-white font-bold py-2 px-4 rounded">Add Property</button>
          </div>
    </>
  );
}
