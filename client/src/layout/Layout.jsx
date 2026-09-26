import { LogOut } from "../components/LogOut";
import { Outlet } from "react-router";
/* style */
import "./styles/layout.css";
import { UserProfile } from "../components/menu/UserProfile";
import { Nav } from "../components/menu/Nav";
import { useState } from "react";

export function Layout({ category }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="container">
      <div className={`burger-btn ${menuOpen && "open"}`}>
        <button
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          ☰
        </button>
      </div>

      <div className={`side-bar ${menuOpen ? "open" : ""}`}>
        <button
          className="open"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        >
          X
        </button>
        <UserProfile />
        <Nav category={category} />
        <LogOut />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
