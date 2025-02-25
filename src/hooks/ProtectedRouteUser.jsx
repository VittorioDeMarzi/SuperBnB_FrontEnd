import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRouteUser(props) {
  const [load, setLoad] = useState(true);

  const auth = useAuth();
  const { token } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      auth.logout();
      navigate("/login");
    }
  }, [token, auth, navigate]);

  return token ? (
    <Outlet {...props} />
  ) : (
    <span className="loading loading-spinner loading-lg"></span>
  );
};
