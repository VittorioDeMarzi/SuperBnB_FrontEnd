import { useState, useEffect } from "react";
import Select from "react-select";
import searchLogo from "/src/assets/images/search-square-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import filtersLogo from "../assets/images/filters.png";
import FilterDrawer from "./FilterDrawer";

export default function SearchBar({ filters, setFilters, setLoadProperties }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setFilters(filters);
  }, [filters]);

  async function loadCities() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/superbeb/property/public/cities`
      );
      if (!response.ok) throw new Error("Error fetching cities");

      const data = await response.json();
      const cityOptions = data.map((city) => ({
        value: city,
        label: city,
      }));
      setCities(cityOptions);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    loadCities();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    setLoadProperties((old) => !old);
    sessionStorage.setItem("filters", JSON.stringify(filters));
    navigate("/searchpage", { state: { filters } });
  }

  function openFilters() {
    setIsFiltersOpen((old) => !old);
  }

  return (
    <>
      {filters && (
        <>
          <div className="w-full max-w-6xl mx-auto p-4">
            <form
              className="bg-white bg-opacity-50 py-3 rounded-lg sm:rounded-full shadow-lg px-12 mb-5"
              onSubmit={handleSearch}
            >
              <div className="flex flex-col md:flex-row space-y-0 md:space-y-0 md:space-x-4">
                {/* city */}
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Where
                  </label>
                  <Select
                    options={cities}
                    onChange={(selectedCity) =>
                      setFilters({
                        ...filters,
                        city: selectedCity?.value || "",
                      })
                    }
                    value={cities.find((city) => city.value === filters.city)}
                    // placeholder="Select a city"
                    isSearchable
                    isClearable
                    className="w-full mt-1"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "transparent",
                        border: "none",
                        boxShadow: "none",
                      }),

                      placeholder: (base) => ({
                        ...base,
                        color: "inherit",
                      }),

                      option: (base) => ({
                        ...base,
                        backgroundColor: "transparent",
                        color: "inherit",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          color: "#333",
                        },
                      }),
                    }}
                  />
                </div>

                {/* Check-in */}
                <div className="flex-1">
                  <label
                    htmlFor="checkin"
                    className="text-sm font-semibold text-gray-00"
                  >
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkin"
                    value={filters.checkInDate}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        checkInDate: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-3 py-2  focus:outline-none bg-white bg-opacity-0"
                  />
                </div>

                {/* Check-out */}
                <div className="flex-1">
                  <label
                    htmlFor="checkout"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkout"
                    value={filters.checkOutDate}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        checkOutDate: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-3 py-2  bg-white bg-opacity-0 focus:outline-none"
                  />
                </div>

                {/* Number of Guests */}
                <div className="flex-1  focus:bg-background">
                  <label
                    htmlFor="guests"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    value={filters.numGuests}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        numGuests: e.target.value,
                      })
                    }
                    className="w-full mt-1 px-3 py-2  bg-white bg-opacity-0 focus:outline-none"
                  />
                </div>
                <div className="flex items-center space-x-4 justify-center">
                  <button type="submit" className="self-center">
                    <img
                      className="w-12"
                      src={searchLogo}
                      alt="search"
                    />
                  </button>
                  <button className="self-center">
                    <img
                      className="w-12"
                      src={filtersLogo}
                      alt="filters"
                      onClick={(e) => openFilters()}
                    />
                  </button>
                </div>
              </div>
            </form>
            {isFiltersOpen && (
              <FilterDrawer filters={filters} setFilters={setFilters} />
            )}
          </div>
        </>
      )}
    </>
  );
}
