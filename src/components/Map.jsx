import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ address }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          console.log(data);
          const { lat, lon } = data[0];
          setPosition([lat, lon]);
          console.log(position);
        } else console.log("no map")
      } catch (error) {
        console.error(error);
      }
    };

    if (address) {
      fetchCoordinates();
    }
  }, [address]);

  return (
    <>
      {position ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className=" relative z-0 mb-5"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      ) :
      (
      <p className="my-12 underline">Map not available at the moment.</p>
      )}
    </>
  );
};

export default Map;
