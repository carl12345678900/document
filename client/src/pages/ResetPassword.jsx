import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import api from "../api/axios";
import "./styles/resetPassword.css";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/account");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="reset">
      {message && <p className="suc">{message}</p>}
      {error && <p className="err">{error}</p>}
      <div>
        <h2>Reset Password</h2>

        <form className="reset-form" onSubmit={handleSubmit}>
          <div>
            <label>New Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
