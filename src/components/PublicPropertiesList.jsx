import PublicPropertyCard from "./PublicPropertyCard";
import { useEffect, useState } from "react";

export default function PublicPropertiesList({ filters, loadProperties }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numElements, setNumelements] = useState(12);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    loadPublicProperties();
  }, [loadProperties, numElements, lastPage]);

  async function loadPublicProperties() {
    const queryParams = new URLSearchParams({
      city: filters.city || "",
      checkInDate: filters.checkInDate || "",
      checkOutDate: filters.checkOutDate || "",
      minPrice: filters.minPrice !== null ? filters.minPrice : "",
      maxPrice: filters.maxPrice !== null ? filters.maxPrice : "",
      numGuests: filters.numGuests !== null ? filters.numGuests : "1",
      minRooms: filters.minRooms !== null ? filters.minRooms : 1,
      numElements: numElements,
      page: 0,
    });

    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND
        }/api/v1/superbeb/property/public/filtered?${queryParams.toString()}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorMessage}`
        );
      }
      const data = await response.json();
      setProperties(data.content);
      setLastPage(data.last);
      // console.log("last page",lastPage)
    } catch (error) {
      console.error("Error loading properties: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  function loadMoreProperties() {
    setNumelements((old) => old + 12);
  }

  return (
    <>
      {loading && !properties && <p>...loading properties</p>}
      <div className="grid grid-flow-row">
        {properties && (
          <>
            <article className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 m-auto px-12 gap-12 my-12">
              {properties.map((property, index) => (
                <PublicPropertyCard key={index} property={property} />
              ))}
            </article>
            {!lastPage && (
              <div className="divider my-12">
                <button
                  onClick={() => loadMoreProperties()}
                  className=" text-dark_violet rounded-full underline font-bold text-xl px-8 py-2 hover:text-violet hover:shadow-lg"
                >
                  <p>Browse more properties</p>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
