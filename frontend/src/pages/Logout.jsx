import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../services/auth"; // ✅ fix here
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthData();         
    navigate("/login");      
  }, []);

  return <p>Logging you out...</p>;  
};

export default Logout;
