import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const role = useAuth();

  const [property, setProperty] = useState({
    title: "",
    description: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    country: "",
    rooms: "",
    maxNumGuests: "",
    minPricePerNight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numerical fields to numbers
    if (["rooms", "maxNumGuests", "minPricePerNight"].includes(name)) {
      setProperty({ ...property, [name]: Number(value) });
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!property.title) {
      newErrors.title = "Title cannot be empty";
    }

    if (!property.description) {
      newErrors.description = "Description cannot be empty";
    }

    if (!property.street) {
      newErrors.street = "Street cannot be empty";
    }

    if (!property.houseNumber) {
      newErrors.houseNumber = "House number cannot be empty";
    }

    if (!property.zipCode) {
      newErrors.zipCode = "ZIP code cannot be empty";
    }

    if (!property.city) {
      newErrors.city = "City cannot be empty";
    }

    if (!property.country) {
      newErrors.country = "Country cannot be empty";
    }

    if (!property.rooms || property.rooms < 1) {
      newErrors.rooms = "Number of rooms must be at least 1";
    }

    if (!property.maxNumGuests || property.maxNumGuests < 1) {
      newErrors.maxNumGuests = "Number of guests must be at least 1";
    }

    if (!property.minPricePerNight || property.minPricePerNight <= 0) {
      newErrors.minPricePerNight = "Price per night must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function submit(event) {
    event.preventDefault();

    if (validate()) {
      console.log(property);
      console.log(JSON.stringify(property));
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND + "/api/v1/superbeb/property",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(property),
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              `Something went wrong , Error: ${response.statusText}`
            );
          }
        }

        const data = await response.json();
        console.log(data);
        console.log(data.id)
        navigate(`/property-controll/${data.id}`);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  }

  return (
    <>
      <div className="bg-background">
        <section className="bg-background">
          <form
            className=" m-12 p-12 bg-slate-50 grid grid-flow-row gap-5"
            onSubmit={submit}
          >
            <h2>Fill the form to add your propety</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Title</span>
                  {errors.title && <span>{errors.title}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="title"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Description</span>
                  {errors.description && <span>{errors.description}</span>}
                </div>
                <textarea
                  type="text"
                  placeholder="Type here"
                  name="description"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  value={property.description}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Street</span>
                  {errors.street && <span>{errors.title}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="street"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  value={property.street}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">House Number</span>
                  {errors.number && <span>{errors.number}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="houseNumber"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  value={property.houseNumber}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">ZIP Code</span>
                  {errors.zip && <span>{errors.title}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  onChange={handleChange}
                  name="zipCode"
                  className="input input-bordered w-full max-w-xs"
                  value={property.zipCode}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">City</span>
                  {errors.city && <span>{errors.city}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  onChange={handleChange}
                  name="city"
                  className="input input-bordered w-full max-w-xs"
                  value={property.city}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Country</span>
                  {errors.country && <span>{errors.country}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  name="country"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  value={property.country}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">N. Rooms</span>
                  {errors.rooms && <span>{errors.rooms}</span>}
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  name="rooms"
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                  value={property.rooms}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Max N of Guests</span>
                  {errors.maxNumGuests && <span>{errors.maxNumGuests}</span>}
                </div>
                <input
                  type="number"
                  placeholder="Type here"
                  name="maxNumGuests"
                  className="input input-bordered "
                  onChange={handleChange}
                  value={property.maxNumGuests}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Default Price</span>
                  {errors.minPricePerNight && (
                    <span>{errors.minPricePerNight}</span>
                  )}
                </div>
                <input
                  type="number"
                  placeholder="Price in Euro"
                  name="minPricePerNight"
                  className="input input-bordered w-full max-w-xs"
                  step="1"
                  onChange={handleChange}
                  value={property.minPricePerNight}
                />
              </label>
            </div>

            <button
              type="submit"
              className=" bg-orange-400 hover:bg-orange-300  text-white font-bold py-2 px-4 rounded w-full"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
