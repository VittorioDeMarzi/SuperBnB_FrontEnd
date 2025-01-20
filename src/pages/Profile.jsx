import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";

export default function Profile() {
  const auth= useAuth();
  
    const navigate = useNavigate()

  const handleLogOut = () => {
      auth.logout();
      navigate("/home")
  };


  return (
    <>
    <div className="min-h-screen p-12">
      <div className=" font-extrabold text-3xl mb-12">Hi, {auth.user}</div>

        <ProfileSection />
        <button
        onClick={handleLogOut}
        className="p-11 bg-ocra hover:bg-background text-white font-bold py-2 rounded mt-12"
      >
        Log out
        </button>
    </div>
    </>
    
  );
}
