import { useState } from "react";
import api from "../api/axios";

export function SignUp({ setIsSignIn, isSignIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setSuccess("");
      console.log(username, email, password);

      if (!username || !email || !password) {
        setErr("All fields is required");
        console.log("All fields is required");

        console.log(err);
        return;
      }

      if (!email.includes("@gmail.com")) {
        setErr("Invalid email");
        console.log("Invalid email");

        console.log(err);
        return;
      }

      if (password.length < 5) {
        setErr("Password too short");
        console.log("Password too short");
        return;
      }

      if (password.length > 30) {
        setErr("Password too long");
        console.log("Password too long");
        return;
      }

      const res = await api.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log(res);

      if (res.data.isRegistered) {
        setSuccess(res.data.message);
        console.log(res.data.isRegistered);
        setTimeout(() => {
          setIsSignIn(!isSignIn);
        }, 1500);
      }

      console.log(success);

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErr(error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} method="POST">
      <h3>
        Welcome to <span>NotesHub</span>
      </h3>
      <h2>Sign Up</h2>
      {success ? (
        <p className="success" style={{ display: success ? "block" : "none" }}>
          {success}
        </p>
      ) : (
        <p className="error" style={{ display: err ? "block" : "none" }}>
          {err}
        </p>
      )}
      <div>
        <label htmlFor="email">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
          Sign Up
        </button>
      </div>
    </form>
  );
}
