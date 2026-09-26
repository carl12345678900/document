const db = require("../config/db");

const documentModel = {
  add: async (title, content, categoryId) => {
    const [row] = await db.query(
      "INSERT INTO documents (title,content,category_id) VALUES (?,?,?)",
      [title, content, categoryId],
    );

    return row;
  },

  getAll: async (id) => {
    const [row] = await db.query(
      "SELECT c.id, c.name AS categoryName, d.* FROM categories AS c LEFT JOIN documents AS d ON c.id = d.category_id WHERE c.id = ? AND (d.status = 'active' OR d.status = 'pinned') ORDER BY d.status = 'pinned' DESC, d.updated_at ASC",
      [id],
    );
    return row;
  },

  getById: async (categoryId, id) => {
    const [row] = await db.query(
      "SELECT d.*,c.name as categoryName FROM documents as d INNER JOIN categories as c ON d.category_id = c.id WHERE d.id = ? AND d.category_id = ? ",
      [id, categoryId],
    );

    /* loser pwede naman id lang kasi lahat ng docs unique ang id loser */

    console.log("data: ", row[0]);

    return row[0];
  },

  updateById: async (title, content, categoryId, id) => {
    const [row] = await db.query(
      "UPDATE documents SET title = ?, content = ?, category_id = ? WHERE id = ?",
      [title, content, categoryId, id],
    );
    return row;
  },

  removeDocsById: async (id) => {
    const [row] = await db.query("DELETE FROM documents WHERE id = ?", [id]);

    return row;
  },

  getAllArchive: async () => {
    const [row] = await db.query(
      "SELECT d.*,c.status, c.name as categoryName FROM documents as d INNER JOIN categories as c ON c.id = d.category_id WHERE d.status = 'archived'",
    );

    return row;
  },

  restoreById: async (id) => {
    const [row] = await db.query(
      "UPDATE documents SET status = 'active' WHERE id = ?",
      [id],
    );

    return row;
  },

  getDocsWhereCategoryActive: async (id) => {
    const [row] = await db.query(
      `SELECT d.id, d.status AS document_status,
          c.status AS category_status
   FROM documents d
   INNER JOIN categories c ON c.id = d.category_id
   WHERE d.id = ?`,
      [id],
    );

    return row;
  },

  archiveById: async (id) => {
    const [row] = await db.query(
      "UPDATE documents SET status = 'archived' WHERE id = ?",
      [id],
    );

    return row;
  },

  pinById: async (id) => {
    const [row] = await db.query(
      "UPDATE documents SET status = 'pinned' WHERE id = ?",
      [id],
    );

    return row;
  },

  unpinById: async (id) => {
    const [row] = await db.query(
      "UPDATE documents SET status = 'active' WHERE id = ?",
      [id],
    );

    return row;
  },

  restoreAllByCategoryId: async (id) => {
    const [row] = await db.query(
      "UPDATE documents SET status = 'active' WHERE category_id = ? AND status = 'archived'",
      [id],
    );

    return row;
  },

  deleteAllByCategoryId: async (id) => {
    const [row] = await db.query(
      "DELETE FROM documents WHERE category_id = ? AND status = 'archived'",
      [id],
    );

    return row;
  },
};

module.exports = documentModel;
