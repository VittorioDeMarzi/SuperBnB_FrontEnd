import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PublicPropertyCard({ property }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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

  function propertyView(propertyId) {
    navigate(`/property-view/${propertyId}`);
  }

  return (
    <>
      {property && (
        <Link
          to={`/property-view/${property.id}`}
          className="card w-72 hover:shadow-2xl"
        >
          <figure>
            <div className="relative w-full max-w-md mx-auto">
              {/* Current image */}
              <img
                src={property.picUrls[currentIndex]}
                alt={`Image ${currentIndex}`}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Previous button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prevImage();
                }}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-background bg-opacity-55 text-white p-2 rounded-full"
              >
                &#8592;
              </button>

              {/* Next button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  nextImage();
                }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-background bg-opacity-55 text-white p-2 rounded-full"
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
          <div className="p-4">
            <p className=" font-semibold leading-9">
              {property.city + ", " + property.country}
            </p>
            <h2 className="leading-6 text-slate-700">{property.title}</h2>
            <p className=" text-slate-400">Guests: {property.maxNumGuests}</p>
            <div className="card-actions flex justify-between items-center">
              <p className=" font-semibold leading-9">
                {property.minPricePerNight} € night
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
