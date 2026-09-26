import "./styles/addDocument.css";
import { useState, useRef } from "react";
import api from "../api/axios";

export function AddDocument({ category }) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [selectedCategory, setSelectedCategory] = useState({
    id: "",
    name: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const timeoutRef = useRef(null);

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

  const createNote = async () => {
    try {
      const res = await api.post("/document/", {
        title: note.title,
        content: note.content,
        categoryId: selectedCategory.id,
      });
      console.log(res.data?.message);
      setNote({ title: "", content: "" });
      setSelectedCategory({
        id: "",
        name: "",
      });
      showSuccess(res.data.message);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        showError(Object.values(error.response.data.errors).flat()[0]);
        return;
      }
      showError(error.response.data.message);
    }
  };

  const showButton = note.title.trim() !== "" && note.content.trim() !== "";

  const showCategories = () => {
    const popUpModal = document.querySelector(".show-category-modal");

    popUpModal.style.display = "flex";
  };

  const exitPopUpCategoryModal = () => {
    const popUpModal = document.querySelector(".show-category-modal");

    popUpModal.style.display = "none";
  };

  return (
    <div className="add-notes">
      <div>
        {/*  <h4>Title</h4> */}
        <textarea
          rows={1}
          onInput={autoResize}
          id="title-textarea"
          minLength={1}
          maxLength={200}
          placeholder="Title..."
          value={note.title}
          onChange={(e) => {
            setNote((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <div>
          {showButton && (
            <button onClick={createNote}>
              {" "}
              <img src="/save.png" alt="" /> Save
            </button>
          )}
        </div>
      </div>
      <div
        className="select-category"
        style={{ display: "flex", marginBottom: "10px" }}
      >
        <button className="select-btn" onClick={showCategories}>
          + select categories
        </button>
        <div
          className="select-btn-box"
          style={{ display: "flex", columnGap: "5px", marginLeft: "5px" }}
        >
          {selectedCategory.name && <span>{selectedCategory.name}</span>}
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
                      setSelectedCategory({ id: c.id, name: c.name });
                    }}
                    className={
                      selectedCategory.id === c.id
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
      {/* 
      {errors && (
        <div className="error-box">
          <h4>Errors</h4>

          {errors.title && <p className="errors">{errors.title[0]}</p>}
          {errors.content && <p className="errors">{errors.content[0]}</p>}
          {errors.categoryId && (
            <p className="errors">{errors.categoryId[0]}</p>
          )}
        </div>
      )} */}
      <textarea
        name=""
        id="add-notes-textarea"
        placeholder="say something dude..."
        maxLength={10000}
        value={note.content}
        onChange={(e) => {
          setNote((prev) => ({ ...prev, content: e.target.value }));
        }}
      />{" "}
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
