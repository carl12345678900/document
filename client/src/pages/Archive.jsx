import api from "../api/axios";
import { useState, useEffect, useRef } from "react";
import "./styles/archive.css";
import { MoreVertical } from "lucide-react";

export function Archive({ loadCategory }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [categoryArchive, setCategoryArchive] = useState([]);
  const [documentArchive, setDocumentArchive] = useState([]);
  const timeoutRef = useRef(null);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("archiveTab") || "category",
  );
  const [hasDocs, setHasDocs] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [threeDotModal, setThreeDotModal] = useState(null);
  const [popup, setPopup] = useState("");

  const handleToggle = (id) => {
    setThreeDotModal((prev) => (prev === id ? null : id));
  };

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

  const loadCategoryArchived = async () => {
    try {
      const result = await api.get("category/archive");
      setCategoryArchive(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDocumentArchived = async () => {
    try {
      const result = await api.get("document/archived/all/all");

      setDocumentArchive(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategoryArchived();
    loadDocumentArchived();
  }, []);

  const restoreBtn = {
    allDocs: async (id) => {
      try {
        const res = await api.patch(`document/restore/all/${id}`);
        /*    loadCategory();
        loadCategoryArchived(); */
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },

    category: async (id) => {
      try {
        const res = await api.patch(`category/restore/${id}`);
        loadCategory();
        loadCategoryArchived();
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },

    document: async (id) => {
      try {
        const res = await api.patch(`document/restore/${id}`);
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },
  };

  const deletePermanently = {
    hasDocs: async (id) => {
      try {
        const hasDocs = await api.get(`category/has/${id}`);

        if (!hasDocs.data.bool) {
          deletePermanently.category(id);
        }

        setHasDocs(hasDocs.data.bool);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },

    confirmDelete: async (id) => {
      setDeletingId(id);
      setConfirmDeleteModal(true);
    },

    allDocs: async (id) => {
      try {
        const res = await api.delete(`document/all/${id}`);
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },

    category: async (id) => {
      try {
        const res = await api.delete(`category/${id}`);

        loadCategoryArchived();
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }
    },

    document: async (id) => {
      try {
        const res = await api.delete(`document/${id}`);

        loadCategoryArchived(); // remove
        loadDocumentArchived();
        showSuccess(res.data.message);
      } catch (error) {
        console.error(error);
        showError(error.response.data.message);
      }

      console.log("hee hee");
    },
  };

  const showPopup = (message) => {
    setPopup(message);

    setTimeout(() => {
      setPopup("");
    }, 2000);
  };

  return (
    <div className="archive">
      {" "}
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
      <h2>Archive</h2>
      <div>
        <div>
          <button
            className={activeTab === "category" ? "active" : ""}
            onClick={() => {
              setActiveTab("category");
              localStorage.setItem("archiveTab", "category");
            }}
          >
            Category
          </button>
          <button
            className={activeTab === "documents" ? "active" : ""}
            onClick={() => {
              setActiveTab("documents");
              localStorage.setItem("archiveTab", "documents");
            }}
          >
            Documents
          </button>
        </div>
        <div className="archive-data-container">
          {activeTab === "category" &&
            (categoryArchive.length ? (
              categoryArchive.map((a) => {
                return (
                  <div className="category-archive" key={a.id}>
                    <p>{a.name}</p>
                    <div>
                      <button onClick={() => restoreBtn.category(a.id)}>
                        Restore
                      </button>
                      <button
                        onClick={() => {
                          setDeletingId(a.id);
                          setConfirmDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-archive">No archived {activeTab}.</div>
            ))}

          {activeTab === "documents" &&
            (documentArchive.length ? (
              documentArchive.map((a) => {
                return (
                  <section key={a.id}>
                    <div>
                      <p>{a.name}</p>
                      <button onClick={() => handleToggle(a.id)}>
                        <MoreVertical />
                      </button>
                      {threeDotModal === a.id && (
                        <div className="three-dot-modal">
                          <button
                            onClick={() => {
                              setThreeDotModal(null);
                              restoreBtn.allDocs(a.id);
                            }}
                          >
                            Restore All
                          </button>
                          <button
                            onClick={() => {
                              setThreeDotModal(null);
                              deletePermanently.allDocs(a.id);
                            }}
                          >
                            Delete All
                          </button>
                        </div>
                      )}
                    </div>

                    {a.documents.map((docs) => {
                      return (
                        <div key={docs.id}>
                          <p>{docs.title}</p>
                          <div>
                            <button
                              onClick={() => {
                                if (a.status === "archived") {
                                  showPopup(
                                    "Document can't be restored. Category is archived",
                                  );

                                  return;
                                }
                                restoreBtn.document(docs.id);
                              }}
                            >
                              Restore
                            </button>
                            <button
                              onClick={() =>
                                deletePermanently.confirmDelete(docs.id)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                );
              })
            ) : (
              <div className="no-archive">No archived {activeTab}.</div>
            ))}
        </div>
        {
          //ask
        }
        {hasDocs && (
          <div className="modal-overlay">
            <div className="pop-up">
              <p>
                This category contains a document, deleting this category will
                delete also its document. Are you sure?
              </p>

              <div className="btn-box">
                <button
                  onClick={() => {
                    setHasDocs(false);
                  }}
                >
                  NO
                </button>
                <button
                  onClick={() => {
                    setHasDocs(false);
                    deletePermanently.category(deletingId);
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        )}

        {
          //confirm delete modal
        }

        {confirmDeleteModal && (
          <div className="modal-overlay">
            <div className="pop-up">
              <p>
                Are you sure you want to delete this{" "}
                {activeTab === "documents" ? "document" : "category"}?
              </p>

              <div className="btn-box">
                <button
                  onClick={() => {
                    setConfirmDeleteModal(false);
                  }}
                >
                  NO
                </button>
                <button
                  onClick={() => {
                    setConfirmDeleteModal(false);
                    {
                      activeTab === "documents"
                        ? deletePermanently.document(deletingId)
                        : deletePermanently.hasDocs(deletingId);
                    }
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        )}

        {
          //popup modal
        }
        {popup && (
          <div className="overlay">
            <div className="popup">{popup}</div>
          </div>
        )}
      </div>
    </div>
  );
}
