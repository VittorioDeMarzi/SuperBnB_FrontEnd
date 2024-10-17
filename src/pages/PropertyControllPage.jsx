import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import { useNavigate, useParams } from "react-router-dom";
import DataProperty from "../components/DataProperty";
import ShowAddImags from "../components/ShowAddImags";

export default function PropertyControllPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (auth && auth.role) {
      checkIfAdmin();
      fetchDataApartment();
    }
  }, []);

  async function fetchDataApartment() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"), 
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
        setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  }

  function checkIfAdmin() {
    console.log(auth.role);
    console.log(auth.user);
    if (auth.role !== "ADMIN") {
      setIsAdmin(false);
      alert("Access denied. You are not authorized to view this page.");
      navigate("/home");
    } else {
      setIsAdmin(true);
    }
  }

  return (
    <>
      <section className=" min-h-screen p-12">
        {isAdmin ? (
          <h2 className=" text-3xl mb-12">Admin Control Panel for property</h2>
        ) : (
          <h2 className=" min-h-screen">Checking permissions...</h2>
        )}
              <DataProperty property={property} />
              <ShowAddImags property={property} />
              {property.picUrls && property.picUrls.length > 0 && (
        <div>
          <h4 className="font-semibold">Images</h4>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {property.picUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Property Image ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg" 
              />
            ))}
          </div>
        </div>
      )}
          </section>
        
    </>
  );
}
