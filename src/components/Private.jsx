import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../apicontext";
import Loader from "./Loader";

export default function Private({ children }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader/>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return children;
}

