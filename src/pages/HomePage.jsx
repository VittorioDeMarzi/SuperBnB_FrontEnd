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
    numGuests: 2,
    minRooms: 1,
  });

  return (
    <>
      <Header />
      
      <SearchBar filters={filters} setFilters={setFilters} />
      <PublicProperties/>
    </>
  );
}
