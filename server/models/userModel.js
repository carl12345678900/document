const db = require("../config/db");

const createUser = async (username, email, password) => {
  const sql = "INSERT INTO users (username, email,password) VALUES (?, ?, ?)";

  const [result] = await db.query(sql, [username, email, password]);

  return result;
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  const [row] = await db.query(sql, [email]);

  return row[0];
};

const saveRefreshToken = async (refreshToken, email) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE email = ?";

  const [row] = await db.query(sql, [refreshToken, email]);

  return row[0];
};

const saveRefreshTokenById = async (refreshToken, id) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";

  const [row] = await db.query(sql, [refreshToken, id]);

  return row[0];
};

const removeToken = async (id, refreshToken = null) => {
  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";

  const [row] = await db.query(sql, [refreshToken, id]);

  return row;
};

const searchEmail = async (email) => {
  const [row] = await db.query("SELECT id, email FROM users WHERE email = ?", [
    email,
  ]);

  return row;
};

const updateToken = async (token, expires, id) => {
  const [row] = await db.query(
    "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?",
    [token, expires, id],
  );

  return row;
};

const findUserByResetToken = async (token) => {
  const [result] = await db.query(
    `SELECT id
     FROM users
     WHERE reset_token = ?
     AND reset_token_expires > NOW()`,
    [token],
  );

  return result[0];
};

const updatePassword = async (userId, hashedPassword) => {
  await db.query(
    `UPDATE users
     SET password = ?,
         reset_token = NULL,
         reset_token_expires = NULL
     WHERE id = ?`,
    [hashedPassword, userId],
  );
};

module.exports = {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  saveRefreshTokenById,
  removeToken,
  searchEmail,
  updateToken,
  findUserByResetToken,
  updatePassword,
};
