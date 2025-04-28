import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return { logout };
};

export default useAuth;