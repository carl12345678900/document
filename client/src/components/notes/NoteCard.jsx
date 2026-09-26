import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router";

export function NoteCard({
  note,
  openToggleId,
  handleToggle,
  handlePin,
  handleArchive,
  handleDelete,
  handleUnpin,
  setOpenToggleId,
}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/document/${note.category_id}/${note.id}`)}>
      <p>{note.title}</p>
      <div>
        {note.status === "pinned" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUnpin(note.id);
            }}
          >
            📌
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(note.id);
          }}
          className="three-dot-menu"
        >
          <MoreVertical />
        </button>
      </div>

      {openToggleId === note.id && (
        <div className="toggle">
          {note.status === "pinned" ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleUnpin(note.id);
                setOpenToggleId(null);
              }}
            >
              unpin
            </div>
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handlePin(note.id);
                setOpenToggleId(null);
              }}
            >
              pin
            </div>
          )}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleArchive(note.id);
              setOpenToggleId(null);
            }}
          >
            archive
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(note.id);
              setOpenToggleId(null);
            }}
          >
            delete
          </div>
        </div>
      )}
    </div>
  );
}
