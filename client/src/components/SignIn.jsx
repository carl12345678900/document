import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { ROLES } from "../constants/roles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setSuccess("");
      console.log(email, password);

      if (!email || !password) {
        setErr("All fields is required");
        return;
      }

      if (!email.includes("@gmail.com")) {
        setErr("Invalid email");
        return;
      }

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data.islogin) {
        setSuccess(res.data.message);

        const allowedRoles = [ROLES.ADMIN, ROLES.USER];

        if (allowedRoles.includes(res.data.role)) {
          localStorage.setItem("token", res.data.token);

          setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        } else {
          /* add error message */
          navigate("/");
        }
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} method="POST">
      <h3>Welcome to</h3>
      <h2>NotesHub</h2>
      {/* 
      <h2>Sign In</h2> */}
      <div>
        {success ? (
          <p
            className="success"
            style={{ display: success ? "block" : "none" }}
          >
            {success}
          </p>
        ) : (
          <p className="error" style={{ display: err ? "block" : "none" }}>
            {err}
          </p>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="sign-btn" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
}
