import SearchBar from "../components/SearchBar";
import PublicPropertiesList from "../components/PublicPropertiesList";

import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function SearchLandingPage() {
  const location = useLocation();
  const [filters, setFilters] = useState(location.state);

  return (
    <>
      <SearchBar filters={filters} setFilters={setFilters} />
      <PublicPropertiesList />
    </>
  );
}
