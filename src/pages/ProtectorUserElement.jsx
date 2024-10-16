import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectorElement(props) {
  const [load, setLoad] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND + "/api/v1/auth/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      if (response.ok) setAuth(true);
      else setAuth(false);
      setLoad(false);
    });

    return () => {
      setLoad(true);
      setAuth(false);
    };
  }, []);

  if (load) return <p></p>;
  return auth ? props.element : <Navigate to={"/login"} />;
}
