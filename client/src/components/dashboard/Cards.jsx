export function Cards({ summary }) {
  return (
    <div className="cards">
      <div className="card-1">
        Documents <span>{summary.totalDocs.total}</span>
      </div>{" "}
      <div className="card-1">
        Categories <span>{summary.totalCategories.total}</span>
      </div>
      <div className="card-2">
        Pinned Notes <span>{summary.totalPinned.total}</span>
      </div>
      <div className="card-3">
        Archived Notes <span>{summary.totalArchivedDocs.total}</span>
      </div>
      <div className="card-4">
        Archived Category <span>{summary.totalArchivedCategory.total}</span>
      </div>
    </div>
  );
}