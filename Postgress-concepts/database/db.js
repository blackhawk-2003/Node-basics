const { Pool } = require("pg");

//create a new pool instance to manage database connections

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);

    //execute the time
    const duration = Date.now() - start;
    console.log(
      `Executed Query:, ${text}. Duration:${duration}ms ${{
        rows: result.rowCount,
      }}`
    );
    return result;
  } catch (error) {
    console.error("Error executing query:", error);
    //rethrow the error to exit the process
    throw error;
  }
}
module.exports = { query };
