const db = require("../../database/db.js");

async function createUserTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_At TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`;

  try {
    await db.query(createTableQuery);
    console.log("User table created");
  } catch (error) {
    console.log(error);
    console.log("Error while creating the table");
  }
}

//insert a new record
async function insertUser(username, email) {
  const insertQuery = `
    INSERT INTO users (username,email)
    VALUES($1,$2)
    RETURNING *`;

  try {
    const res = await db.query(insertQuery, [username, email]);
    console.log("User inserted succesully", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}

//to get all the users

async function fetchAllUser() {
  const fetchQuery = `
    SELECT * FROM users`;
  try {
    const result = await db.query(fetchQuery);
    return result.rows;
  } catch (e) {
    console.log(e);
  }
}

module.exports = { createUserTable, insertUser, fetchAllUser };
