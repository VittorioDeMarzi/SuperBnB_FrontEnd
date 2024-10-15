import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const auth = useAuth();
    const navigate = useNavigate()

  const handleLogOut = () => {
      auth.logout();
      navigate("/home")
  };
  return (
    <div className="mt-12">
      <div>Profile</div>
      <button
        onClick={handleLogOut}
        className="p-11 bg-ocra hover:bg-background text-white font-bold py-2 rounded"
      >
        Log out
      </button>
    </div>
  );
}
