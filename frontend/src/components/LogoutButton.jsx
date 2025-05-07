import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const logoutFn = async () => {
    const response = await axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
    alert(response.data.statusCode + ": " + response.data.message);
    if (response.data.statusCode === 200) {
      logout();
      navigate("/");
    }
  };

  return (
    <button className="btn btn-danger mx-3" onClick={logoutFn}>
      Logout
    </button>
  );
}
