import { useEffect, useState } from "react";
import PublicPropertyCard from "./PublicPropertyCard";

export default function PublicProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadProperties, setLoadProperties] = useState(false);
  const [numElements, setNumelements] = useState(8);

  useEffect(() => {
    loadPublicProperties();
  }, [loadProperties]);

  async function loadPublicProperties() {
    setLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND
        }/api/v1/superbeb/property/public?noElements=${numElements}&page=0`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status} - ${errorMessage}`
        );
      }
      const data = await response.json();
      setProperties(data);
      setLoadProperties((old) => !old);
    } catch (error) {
      console.error("Error loading properties: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPublicProperties();
  }, [numElements]);

  function loadMoreProperties() {
    setNumelements((old) => old + 12);
  }

  return (
    <>
      {loading && !properties && <p>...loading properties</p>}
      <div className="grid grid-flow-row">
        {properties && (
          <>
            <div className="divider"></div>
            <article className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 m-auto px-12 gap-12">
              {properties.map((property, index) => (
                <PublicPropertyCard property={property} />
              ))}
            </article>
            <div className="divider mb-12">
              <button
                onClick={() => loadMoreProperties()}
                className=" text-dark_violet rounded-full underline font-bold text-xl px-8 py-2 hover:text-violet hover:shadow-lg"
              >
                <p>Browse more properties</p>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
