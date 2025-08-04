import {jwtDecode} from "jwt-decode";
 const isAdmin = () => {
  try {
    const token = localStorage.getItem("token");
    console.log(jwtDecode(token));    
    const decoded = jwtDecode(token);
    return decoded?.isAdmin; // `isAdmin` must be included in JWT payload
    const isAdmin = user?.isAdmin;
    console.log("Am I admin? 👉", isAdmin);
  } catch {
    return false;
  }
};

export default isAdmin;