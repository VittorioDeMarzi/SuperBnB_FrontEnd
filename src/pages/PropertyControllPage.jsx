import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import { useNavigate, useParams } from "react-router-dom";
import DataProperty from "../components/DataProperty";
import ProprtyImages from "../components/PropertyImages";

export default function PropertyControllPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (auth && auth.role) {
      checkIfAdmin();
    }
    fetchDataApartment();
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
          <h2 className=" text-3xl mb-12">Admin Control Panel</h2>
        ) : (
          <h2 className=" min-h-screen">Checking permissions...</h2>
        )}
              <DataProperty property={property} />
              <ProprtyImages property={property} />
              
          </section>
        
    </>
  );
}
