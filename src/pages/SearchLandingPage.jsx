import SearchBar from "../components/SearchBar";
import PublicPropertiesList from "../components/PublicPropertiesList";

import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SearchLandingPage() {
  const location = useLocation();
  const [filters, setFilters] = useState(location.state.filters);
  const [loadProperties, setLoadProperties] = useState(false);

  return (
    <>
      <div className="flex">

        <SearchBar
          filters={filters}
          setFilters={setFilters}
          setLoadProperties={setLoadProperties}
        />
      </div>

      <PublicPropertiesList filters={filters} loadProperties={loadProperties} />
    </>
  );
}
