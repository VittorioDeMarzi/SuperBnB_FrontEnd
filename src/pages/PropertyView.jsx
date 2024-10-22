import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";

export default function PropertyView() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    } catch (error) {
      console.error("Error fetching property:", error);
    }
  }

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === property.picUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.picUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="mt-5">
          {property && property.picUrls && (
            <figure className="p-12">
              <div className="relative w-full max-w-3xl mx-auto">
                {/* Current image */}
                <img
                  src={property.picUrls[currentIndex]}
                  alt={`Image ${currentIndex}`}
                  className="w-full max-h-svh object-cover rounded-lg"
                />
                {/* Previous button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-ocra bg-opacity-85 text-white p-2 rounded-full"
                >
                  &#8592;
                </button>
                {/* Next button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-ocra bg-opacity-85 text-white p-2 rounded-full"
                >
                  &#8594;
                </button>
                {/* Image indicators */}
                <div className="flex justify-center mt-4">
                  {property.picUrls.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 mx-1 rounded-full ${
                        currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </figure>
          )}
          <section className="container mx-auto p-4 min-h-screen shadow-md">
            <h1>{property?.title}</h1>
            <p>{property?.description}</p>
            <p>
              {property?.street} {property?.houseNumber}, {property?.zipCode}{" "}
              {property?.city}, {property?.country}
            </p>
            <p>Guests: {property?.maxNumGuests}</p>
            <p>Price per night: {property?.minPricePerNight}€</p>
          </section>
      </div>
    </>
  );
}
