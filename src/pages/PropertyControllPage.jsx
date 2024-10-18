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
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loadImages, setLoadImages] = useState(false)

  useEffect(() => {
    if (auth && auth.role) {
      checkIfAdmin();
    }
    fetchDataApartment();
  }, [loadImages]);

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

  function handleImgsChange(event) {
    const files = Array.from(event.target.files);
    setSelectedImgs(files);
  }

  async function handleImgsSubmit(event) {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData();
    selectedImgs.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/imgbb/upload-images/${
          property.id
        }`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorMessage}`);
      }
  
     /*  const data = await response.json();
      console.log(data); */
      setSelectedImgs([]);
      setLoadImages(old => !old)
    } catch (error) {
      console.error("Error uploading images:", error);
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
        <div>
          <form onSubmit={handleImgsSubmit}>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              multiple
              onChange={handleImgsChange}
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload Images
            </button>
          </form>
        </div>
        {property && property.picUrls && property.picUrls.length > 0 && (
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Make property Public</button>
        )}
      </section>
    </>
  );
}
