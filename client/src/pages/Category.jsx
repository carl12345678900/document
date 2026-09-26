import api from "../api/axios";
import { useState, useRef } from "react";
import "./styles/category.css";

export function Category({ category, loadCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updatingCategoryId, setUpdatingCategoryId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [archiveCategoryId, setArchiveCategoryId] = useState(null);
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

  const hadleSubmit = async () => {
    try {
      const data = await api.post(`/category`, {
        category: categoryName,
      });
      await loadCategory();

      showSuccess(data.data.message);
      setCategoryName("");
    } catch (error) {
      console.error(error.response.data.message);
      showError(error.response.data.message);
    }
  };

  const handleEdit = (category) => {
    setUpdating(true);
    setUpdatingCategoryId(category.id);
    setCategoryName(category.name);
  };

  const handleRemove = async (categoryId) => {
    try {
      setShowPopup(false);

      const data = await api.patch(`/category/archive/${categoryId}`);

      await loadCategory();

      showSuccess(data.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      showError(error.response.data.message);
    }
  };

  const validate = async (categoryId) => {
    try {
      const res = await api.get(`/document/${categoryId}/`);

      const filtered = res.data.data.data
        .filter((r) => r.status === "active" || "status")
        .map((r) => r.status);

      if (filtered.length) {
        setArchiveCategoryId(categoryId);
        setShowPopup(true);
        return;
      }

      handleRemove(categoryId);
    } catch (error) {
      console.error(error.response.data.message);
      showError(error.response.data.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const data = await api.patch(`/category/${updatingCategoryId}`, {
        name: categoryName,
      });

      await loadCategory();

      setCategoryName("");
      setUpdatingCategoryId("");
      setUpdating(false);
      showSuccess(data.data.message);
    } catch (error) {
      console.error(error.response.data.message);
      showError(error.response.data.message);
    }
  };

  return (
    <div className="categories">
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

      <h2>Categories</h2>

      <form method="POST">
        <div>
          <label htmlFor="">Category Name:</label>
          <input
            type="text"
            placeholder="ex. Policies"
            className={`${updating ? "editing" : "submitting"}`}
            value={categoryName}
            minLength={1}
            maxLength={30}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />

          {updating ? (
            <button
              className="edit-form"
              onClick={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              Update
            </button>
          ) : (
            <button
              className="submit-form"
              onClick={(e) => {
                e.preventDefault();
                hadleSubmit();
              }}
            >
              Create
            </button>
          )}
        </div>

        {updating && (
          <button
            className="cancel-btn"
            onClick={() => {
              setUpdating(false);
              setCategoryName("");
              setUpdatingCategoryId("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="category-list">
        <h3>Categories List</h3>
        {category.length ? (
          category.map((c) => {
            return (
              <div key={c.id} className="category-item">
                <p>{c.name}</p>
                <div className="btn">
                  <button
                    className="edit"
                    onClick={() => {
                      handleEdit(c);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="remove"
                    onClick={() => {
                      validate(c.id);
                    }}
                  >
                    Archive
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Category</div>
        )}
      </div>

      {showPopup && (
        <div className="modal-overlay">
          <div className="pop-up">
            <p>
              Archiving this category will also archive the documents. Are you
              sure?
            </p>
            <div>
              <button
                onClick={() => {
                  setArchiveCategoryId(null);
                  setShowPopup(false);
                }}
              >
                No
              </button>
              <button onClick={() => handleRemove(archiveCategoryId)}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
