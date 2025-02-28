export default function FilterDrawer({ filters, setFilters }) {
  return (
    <>
      <div className="bg-white bg-opacity-50 p-4 md:p-6 rounded-lg shadow-lg w-full flex flex-col md:flex-row justify-around items-center gap-2">
        {/* Minimum Price */}
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Minimum Price
          </label>
          <input
            type="number"
            id="minPrice"
            placeholder="€ Min"
            className="bg-white bg-opacity-50 w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                minPrice: e.target.value,
              })
            }
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-semibold text-gray-700"
          >
            Maximum Price
          </label>
          <input
            type="number"
            id="maxPrice"
            placeholder="€ Max"
            className="bg-white bg-opacity-50 w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: e.target.value,
              })
            }
          />
        </div>

        {/* N Rooms */}
        <div>
          <label
            htmlFor="rooms"
            className="block text-sm font-semibold text-gray-700"
          >
            N. Rooms
          </label>
          <input
            type="number"
            id="rooms"
            placeholder="N° Rooms"
            className="bg-white bg-opacity-50 w-full mt-1 px-3 py-2 border rounded-md focus:outline-none"
            onChange={(e) =>
              setFilters({
                ...filters,
                minRooms: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
}
