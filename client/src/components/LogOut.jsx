import api from "../api/axios";

import { useNavigate } from "react-router";

export function LogOut() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/account");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button className="sign-btn" onClick={handleLogout}>
      Log Out
    </button>
  );
}
