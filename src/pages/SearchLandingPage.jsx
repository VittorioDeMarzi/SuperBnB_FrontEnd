import SearchBar from "../components/SearchBar";
import PublicPropertiesList from "../components/PublicPropertiesList";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FilterDrawer from "../components/FilterDrawer";

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
