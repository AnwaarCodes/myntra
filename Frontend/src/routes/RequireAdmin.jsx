import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  
  const decoded = jwtDecode(token);
  const isAdmin = decoded?.isAdmin;

  return isAdmin ? children : <Navigate to="/app" />;
};

export default RequireAdmin;
