import { useEffect, useState } from "react";
import { useAuth } from "../components/auth";

export default function ProfileSection() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState([]);
  const [address, setAddress] = useState([]);
  const [editing, setEditing] = useState(false);

  async function getProfile() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/user`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setProfile(data.profileDto || {});
      setAddress(data.addressDto || {});
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(event) {
    event.preventDefault();
    setError(null);
    console.log(
      JSON.stringify({
        profileDto: profile,
        addressDto: address,
      })
    );
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/v1/user`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            profileDto: profile,
            addressDto: address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to update profile. Please try again.");
      alert("Failed to update profile");
    } finally {
      setEditing(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h3 className="text-center text-ocra font-bold text-3xl mb-6">
        Profile Information
      </h3>
      {editing ? (
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="font-bold">First Name:</label>
            <input
              type="text"
              value={profile.firstName || ""}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="block font-bold">Last Name:</label>
            <input
              type="text"
              value={profile.lastName || ""}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">Date of Birth:</label>
            <input
              type="date"
              value={profile.dateOfBirth || ""}
              onChange={(e) =>
                setProfile({ ...profile, dateOfBirth: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">Phone Number:</label>
            <input
              type="text"
              value={profile.phoneNumber || ""}
              onChange={(e) =>
                setProfile({ ...profile, phoneNumber: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">Street:</label>
            <input
              type="text"
              value={address.street || ""}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">House Number:</label>
            <input
              type="text"
              value={address.houseNumber || ""}
              onChange={(e) =>
                setAddress({ ...address, houseNumber: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="block font-bold">Zip Code:</label>
            <input
              type="text"
              value={address.zipCode || ""}
              onChange={(e) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">City:</label>
            <input
              type="text"
              value={address.city || ""}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="font-bold">Country:</label>
            <input
              type="text"
              value={address.country || ""}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              className="border rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-ocra text-white p-2 rounded w-full mt-4"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="bg-gray-500 text-white p-2 rounded w-full mt-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold">First Name:</h4>
            <p>{profile.firstName || "N/A"}</p>
            <h4 className="font-bold">Last Name:</h4>
            <p>{profile.lastName || "N/A"}</p>
            <h4 className="font-bold">Date of Birth:</h4>
            <p>
              {profile.dateOfBirth ? profile.dateOfBirth.toString() : "N/A"}
            </p>
            <h4 className="font-bold">Phone Number:</h4>
            <p>{profile.phoneNumber || "N/A"}</p>
          </div>
          <div>
            <h4 className="font-bold">Address:</h4>
            <p>Street: {address.street || "N/A"}</p>
            <p>House Number: {address.houseNumber || "N/A"}</p>
            <p>Zip Code: {address.zipCode || "N/A"}</p>
            <p>City: {address.city || "N/A"}</p>
            <p>Country: {address.country || "N/A"}</p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="bg-purple-800 text-white px-12 py-2 rounded text-center mt-4"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
