import "./styles/dashboard.css";
import { Cards } from "../components/dashboard/Cards";
import { RecentNotesTable } from "../components/dashboard/RecentNotesTable";
import api from "../api/axios";
import { useEffect, useState } from "react";

export function Dashboard() {
  const [summary, setSummary] = useState({
    totalDocs: { total: 0 },
    totalCategories: { total: 0 },
    totalPinned: { total: 0 },
    totalArchivedDocs: { total: 0 },
    totalArchivedCategory: { total: 0 },
  });

  const [recent, setRecent] = useState([]);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const loadSummary = async () => {
    try {
      const res = await api.get("/dashboard/summary");
      console.log(res.data.data);

      setSummary(res.data.data.summary);
      setRecent(res.data.data.recentDocuments);
      setSuccess(res.data.message);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);
  return (
    <div className="dashboard">
      {success && (
        <div
          className="success message"
          style={{
            backgroundColor: "rgb(201, 224, 198)",
            border: "1px solid green",
            display: "block",
            color: "green",
          }}
        >
          {success}
        </div>
      )}
      {error && (
        <div
          className="error message"
          style={{
            backgroundColor: "rgb(224, 198, 198)",
            border: "1px solid red",
            display: "block",
            color: "red",
          }}
        >
          {error}
        </div>
      )}
      <h2>Dashboard</h2>
      <Cards summary={summary} />
      <div className="table-box">
        <RecentNotesTable recent={recent} />
      </div>
    </div>
  );
}
