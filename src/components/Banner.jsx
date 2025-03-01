import { useState } from "react";

export default function Banner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;
  
    return (
      <div className="bg-yellow-200 text-yellow-900 p-4 text-center relative">
        <p className="text-sm font-semibold">
          🔔 <span className="mr-1">SuperBnB is a demo project. All listings are fictional, and no real bookings or payments can be made.</span>
          <a href="/disclaimer" className="underline font-bold hover:text-yellow-700">
            Learn more
          </a>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-4 text-yellow-900 font-bold text-lg"
        >
          ✖
        </button>
      </div>
    );
  };