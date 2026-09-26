import { NavLink } from "react-router";

export function Nav({ category }) {
  return (
    <nav>
      <NavLink
        to="dashboard"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="document/category"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Category
      </NavLink>
      <NavLink
        to="document"
        end
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Add Documentation
      </NavLink>
      {category.map((nav) => {
        return (
          <NavLink
            key={nav.id}
            to={`document/${nav.id}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {nav.name}
          </NavLink>
        );
      })}
      <NavLink
        to="document/archive"
        end
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        Archive
      </NavLink>
    </nav>
  );
}
