require("dotenv").config();

const {
  createUserTable,
  insertUser,
  fetchAllUser,
} = require("./concepts/basic-queries.js");

async function testBasicsQuery() {
  try {
    // await createUserTable();
    // await insertUser("John Doe", "johndoe@example.com");
    // await insertUser("Aditya Sn", "aditya@example.com");
    // await insertUser("tarvis", "travis@example.com");
    // await insertUser("sahil", "sahil@example.com");
    // await insertUser("ayush", "ayush@example.com");
    const users = await fetchAllUser();
    console.log(users);
    // console.log("Users inserted");
    console.log("All user fetched");
  } catch (error) {
    console.error(error);
  }
}

async function runAllQueries() {
  await testBasicsQuery();
}

runAllQueries();
