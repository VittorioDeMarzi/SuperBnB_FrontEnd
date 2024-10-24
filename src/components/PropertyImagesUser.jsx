import { useState } from "react";

export default function PropertyImagesUser({ picUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === picUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? picUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <figure className="p-12">
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Current image */}
          <img
            src={picUrls[currentIndex]}
            alt={`Image ${currentIndex}`}
            className="w-full max-h-96 object-cover rounded-lg"
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
            {picUrls.map((_, index) => (
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
    </>
  );
}
