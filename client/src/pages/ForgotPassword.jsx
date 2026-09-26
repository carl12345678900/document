import { useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";
import "./styles/forgotPassword.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/forgot-password", { email });
      setMessage(response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.log(error);

      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="box">
      {message && <p>{message}</p>}
      <div>
        <div>
          <img src="/lock.jpg" alt="" />
          <h2>Forgot Password?</h2>
          <p>
            No worries! Enter your email address and we'll send you a reset
            link.
          </p>
        </div>

        <form className={"form"} onSubmit={handleSubmit}>
          <Link to={"/account"}>
            {" "}
            <img src="/back.png" alt="" /> Return
          </Link>
          <label htmlFor="">Enter your email</label>
          <div>
            <img src="/send.png" alt="" />
            <input
              type="email"
              placeholder="ex. juan@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit">
            {" "}
            <img src="/send.png" alt="" /> Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
