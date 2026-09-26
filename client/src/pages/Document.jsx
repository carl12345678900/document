import "./styles/document.css";
import { NoteCard } from "../components/notes/NoteCard";
import { useParams } from "react-router";
import api from "../api/axios";
import { useEffect, useState } from "react";

export function Document() {
  const { categoryId } = useParams();
  const [data, setData] = useState({ categoryName: "", data: [] });
  const [openToggleId, setOpenToggleId] = useState(null);

  const handleToggle = (id) => {
    setOpenToggleId((prev) => (prev === id ? null : id));
  };

  const handlePin = async (id) => {
    try {
      const result = await api.patch(`/document/pin/${id}`);
      console.log(result.data.message);
      await getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (id) => {
    try {
      const result = await api.patch(`/document/archive/${id}`);
      console.log(result.data.message);
      await getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await api.delete(`/document/${id}`);
      console.log(result.data.message);
      await getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnpin = async (id) => {
    try {
      const result = await api.patch(`/document/unpin/${id}`);
      console.log(result.data.message);
      await getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  const getNotes = async () => {
    try {
      const res = await api.get(`/document/${categoryId}/`);

      setData({
        categoryName: res.data.data.categoryName[0].name,
        data: res.data?.data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [categoryId]);

  const docs = data.data.filter((doc) => {
    return doc.id !== null;
  });

  return (
    <div className="notes">
      <h2>{data.categoryName}</h2>
      <div className="notes-box">
        {docs.length === 0 ? (
          <div className="no-docs">No documents available.</div>
        ) : (
          data.data.map((data) => {
            return (
              <NoteCard
                key={data.id}
                note={data}
                openToggleId={openToggleId}
                handleToggle={handleToggle}
                handlePin={handlePin}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
                handleUnpin={handleUnpin}
                setOpenToggleId={setOpenToggleId}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
