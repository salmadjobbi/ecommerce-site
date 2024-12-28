import pool from '../db.js';  // Use default import

// Fetch all users
export async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
}

// Fetch a single user by ID
export async function getUser(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Error fetching user by ID: ' + error.message);
  }
}

// Create a new user

// Create a new user
export async function createUser(name, email, phone, address) {
  const [result] = await pool.query(`
    INSERT INTO users (name, email, phone, address, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `, [name, email, phone, address]);

  const id = result.insertId;
  return { id, name, email, phone, address };
}

