import Header from "../components/Header";
import PublicProperties from "../components/PublicProperties";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState({
    city: "",
    checkInDate: "",
    checkOutDate: "",
    minPrice: null,
    maxPrice: null,
    numGuests: 2,
    minRooms: 1,
  });

  const [loadProperties, setLoadProperties] = useState(false)

  return (
    <>
      <Header />

      <SearchBar filters={filters} setFilters={setFilters} setLoadProperties={setLoadProperties} />
      <PublicProperties/>
    </>
  );
}
