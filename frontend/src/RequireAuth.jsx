import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return children;
  else return <Navigate to={"/login"} replace />;
}
