import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}
