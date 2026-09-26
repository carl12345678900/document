const db = require("../config/db");

const dashboardModel = {
  totalDocs: async () => {
    const [row] = await db.query(
      "SELECT COUNT(*) AS total FROM documents WHERE status = 'active' OR status = 'pinned'",
    );

    return row[0];
  },

  totalCategories: async () => {
    const [row] = await db.query(
      "SELECT COUNT(*) AS total FROM categories  WHERE status = 'active' OR status = 'pinned'",
    );

    return row[0];
  },

  totalPinned: async () => {
    const [row] = await db.query(
      "SELECT COUNT(*) AS total FROM documents WHERE status = 'pinned'",
    );

    return row[0];
  },

  totalArchivedDocs: async () => {
    const [row] = await db.query(
      "SELECT COUNT(*) AS total FROM documents WHERE status = 'archived'",
    );

    return row[0];
  },

  totalArchivedCategory: async () => {
    const [row] = await db.query(
      "SELECT COUNT(*) AS total FROM categories WHERE status = 'archived'",
    );

    return row[0];
  },

  recentDocs: async () => {
    const [rows] = await db.query(`
    SELECT 
      d.id,
      d.title,
      c.name,
      d.updated_at,
      CASE
        WHEN d.created_at = d.updated_at THEN 'created'
        ELSE 'updated'
      END AS activity
    FROM documents d
    INNER JOIN categories c ON c.id = d.category_id
    WHERE d.status IN ('active', 'pinned')
    ORDER BY d.updated_at DESC
    LIMIT 5
  `);

    return rows;
  },
};

module.exports = dashboardModel;
