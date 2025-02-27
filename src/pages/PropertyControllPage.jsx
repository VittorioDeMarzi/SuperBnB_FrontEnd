import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useParams } from "react-router-dom";
import DataProperty from "../components/DataProperty";
import ProprtyImages from "../components/PropertyImages";

export default function PropertyControllPage() {
  const [property, setProperty] = useState(null);
  const { id } = useParams();
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadPropertyDetails, setLoadPropertyDetails] = useState(false);
  const [error, setError] = useState("");
  const [visibilityMessage, setVisibilityMessage] = useState("");

  useEffect(() => {
    fetchDataApartment();
  }, [loadPropertyDetails]);

  // useEffect(() => {
  //  if (auth && auth.role) {
  //    checkIfAdmin();
  //  }
  // });

  async function fetchDataApartment() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/admin/${id}`,
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
      setProperty(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  }

  // function checkIfAdmin() {
  //   console.log(auth.role);
  //   console.log(auth.user);
  //   if (auth.role !== "ADMIN") {
  //     setIsAdmin(false);
  //     alert("Access denied. You are not authorized to view this page.");
  //     navigate("/home");
  //   } else {
  //     setIsAdmin(true);
  //   }
  // }

  function handleImgsChange(event) {
    const files = Array.from(event.target.files);
    setSelectedImgs(files);
  }

  async function handleImgsSubmit(event) {
    event.preventDefault();
    if (selectedImgs.length > 0) {
      setUploading(true);
      const formData = new FormData();
      selectedImgs.forEach((file) => {
        formData.append("file", file);
      });

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND
          }/api/v1/superbeb/imgbb/upload-images/${property.id}`,
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
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorMessage}`
          );
        }
      } catch (error) {
        console.error("Error uploading images:", error);
      } finally {
        setSelectedImgs([]);
        setUploading(false);
        setLoadPropertyDetails((old) => !old);
      }
    } else {
      setError("Please select first Images");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  async function changeVisibility() {
    setVisibilityMessage(null);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND
        }/api/v1/superbeb/property/change-visibility/${id}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response text:", errorText);
        throw new Error(
          `Error occurred changing visibility: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Visibility changed:", data);
      setVisibilityMessage("Visibility changed successfully");
      setLoadPropertyDetails((old) => !old);
    } catch (error) {
      console.error("Error changing visibility:", error.message);
      setVisibilityMessage("Error occurred while changing visibility");
    } finally {
      setTimeout(() => {
        setVisibilityMessage("");
      }, 3000);
    }
  }

  return (
    <>
      <section className=" min-h-screen p-12">
        {/* {isAdmin ? (
          <h2 className=" text-3xl mb-12">Admin Control Panel</h2>
        ) : (
          <h2 className=" min-h-screen">Checking permissions...</h2>
        )} */}
        <h2 className=" text-3xl mb-12">Admin Control Panel</h2>
        <DataProperty property={property} />
        <ProprtyImages property={property} />
        <div>
          <form onSubmit={handleImgsSubmit}>
            <p>{error}</p>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              multiple
              onChange={handleImgsChange}
            />

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mb-12"
            >
              Upload Images
            </button>
          </form>
        </div>
        {uploading && <p>..uploading imeges</p>}
        {property && property.picUrls && property.picUrls.length > 0 && (
          <>
            <p>
              Visibility of this Property is setted on
              {property.isPublic ? (
                <span className=" text-xl font-bold text-red-700"> PUBLIC</span>
              ) : (
                <span className=" text-xl font-bold text-red-700">
                  {" "}
                  PRIVATE
                </span>
              )}
            </p>

            <span className=" text-xl font-bold text-red-700"></span>
            <button
              onClick={changeVisibility}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Change Visibility
            </button>
          </>
        )}
      </section>
    </>
  );
}
