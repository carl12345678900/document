import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import "./styles/noteDetails.css";

export function NoteDetails({ category }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);
  const { categoryId, id } = useParams();
  const [note, setNote] = useState({
    title: "",
    content: "",
    categoryId: "",
    categoryName: "",
  });
  const [saving, setSaving] = useState(false);
  const [updating, setUpdating] = useState(false);

  const showSuccess = (message) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setError(""); // hide error
    setSuccess(message);

    timeoutRef.current = setTimeout(() => {
      setSuccess("");
    }, 4000);
  };

  const showError = (message) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setSuccess(""); // hide success
    setError(message);

    timeoutRef.current = setTimeout(() => {
      setError("");
    }, 4000);
  };

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        console.log(categoryId, id);
        const res = await api.get(`/document/${categoryId}/${id}`);
        console.log(res.data.data);

        setNote({
          title: res.data.data.title,
          content: res?.data?.data.content,
          categoryId: res?.data?.data.category_id,
          categoryName: res?.data?.data.categoryName,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getNote();
  }, [categoryId, id]);

  if (!note) {
    return <div>Loading...</div>;
  }

  const updateNote = async () => {
    try {
      const data = {
        title: note.title,
        content: note.content,
        categoryId: note.categoryId,
      };

      setSaving(true);
      console.log(note);

      const res = await api.patch(`/document/${id}`, data);

      setNote({
        title: res.data.data.title,
        content: res?.data?.data.content,
        categoryId: res?.data?.data.category_id,
        categoryName: res?.data?.data.categoryName,
      });
      setSaving(false);
      setUpdating(false);
      showSuccess(res.data.message);
    } catch (error) {
      console.error(error);
      setSaving(false);
      showError(error.response.data.message);
    }
  };

  const showCategories = () => {
    const popUpModal = document.querySelector(".show-category-modal");

    popUpModal.style.display = "flex";
  };

  const exitPopUpCategoryModal = () => {
    const popUpModal = document.querySelector(".show-category-modal");

    popUpModal.style.display = "none";
  };

  return (
    <div className="note-details">
      <div>
        <button
          onClick={() => {
            setUpdating(false);
            navigate(-1);
          }}
        >
          Back
        </button>{" "}
        {/*  <h4>Title</h4> */}
        <textarea
          rows={1}
          onInput={autoResize}
          id="title-textarea"
          minLength={1}
          maxLength={100}
          value={note.title}
          onChange={(e) => {
            setUpdating(true);
            setNote((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <div>
          {updating && (
            <button disabled={saving} onClick={updateNote}>
              <img src="/save.png" alt="" />
              {saving ? "Updating..." : "Update"}
            </button>
          )}
        </div>
      </div>
      <div
        className="select-category"
        style={{ display: "flex", marginBottom: "10px" }}
      >
        <button className="select-btn" onClick={showCategories}>
          + update categories
        </button>
        <div
          className="select-btn-box"
          style={{ display: "flex", columnGap: "5px", marginLeft: "5px" }}
        >
          {note.categoryName && <span>{note.categoryName}</span>}
        </div>
        {/* pop up selector */}
        <div className="show-category-modal">
          <div>
            <h4>Select Categories</h4>
            <span className="exit" onClick={exitPopUpCategoryModal}>
              x
            </span>
          </div>
          <div>
            {category.length ? (
              category.map((c) => {
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setUpdating(true);
                      setNote((prev) => ({
                        ...prev,
                        categoryId: c.id,
                        categoryName: c.name,
                      }));
                    }}
                    className={
                      note.categoryId === c.id
                        ? "selected-category"
                        : "category-btn"
                    }
                  >
                    {c.name}
                  </button>
                );
              })
            ) : (
              <div>No Categories available.</div>
            )}
          </div>
        </div>
      </div>
      <div>
        <textarea
          name=""
          id="add-notes-textarea"
          value={note.content}
          onChange={(e) => {
            setUpdating(true);
            setNote((prev) => ({ ...prev, content: e.target.value }));
          }}
        />
      </div>{" "}
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
    </div>
  );
}

/* make this component so that every nav use these to view their note */
