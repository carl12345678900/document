const db = require("../config/db");

const categoryModel = {
  add: async (category) => {
    const [row] = await db.query("INSERT INTO categories (name) VALUES (?)", [
      category,
    ]);

    return row;
  },

  getAll: async () => {
    const [row] = await db.query(
      "SELECT * FROM categories WHERE status = 'active' ORDER BY id ASC",
    );

    return row;
  },

  getById: async (id) => {
    const [row] = await db.query("SELECT name FROM categories WHERE id = ?", [
      id,
    ]);

    return row;
  },

  updateById: async (id, name) => {
    const [row] = await db.query(
      "UPDATE categories SET name = ? WHERE id = ?",
      [name, id],
    );

    return row;
  },

  removeById: async (id) => {
    const [row] = await db.query("DELETE FROM categories WHERE id = ?", [id]);

    return row;
  },

  getAllArchive: async () => {
    const [row] = await db.query(
      "SELECT * FROM categories WHERE status = 'archived'",
    );

    return row;
  },

  restoreById: async (id) => {
    const [row] = await db.query(
      "UPDATE categories SET status = 'active' WHERE id = ?",
      [id],
    );
    console.log(row);

    return row;
  },

  archiveById: async (id) => {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      await connection.query(
        `UPDATE categories
     SET status = 'archived'
     WHERE id = ?`,
        [id],
      );

      await connection.query(
        `UPDATE documents
     SET status = 'archived'
     WHERE category_id = ?`,
        [id],
      );

      await connection.commit();

      return;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  removeDocsById: async (id) => {
    const [row] = await db.query(
      "DELETE FROM documents WHERE category_id = ?",
      [id],
    );

    return row;
  },

  hasDocs: async (id) => {
    const [rows] = await db.query(
      `
    SELECT EXISTS (
      SELECT 1
      FROM documents
      WHERE category_id = ?
    ) AS hasDocuments
    `,
      [id],
    );

    return Boolean(rows[0].hasDocuments);
  },
};

module.exports = categoryModel;
