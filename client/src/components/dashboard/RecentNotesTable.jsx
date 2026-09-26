import { formatDateByAgo } from "../../utils/formatDateByAgo";

export function RecentNotesTable({ recent }) {
  return (
    <>
      <h3>Recent Notes</h3>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((d) => {
              return (
                <tr key={d.id}>
                  <td>{d.title}</td>
                  <td>{d.name}</td>
                  <td>{d.activity}</td>
                  <td>{formatDateByAgo(d.date)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
