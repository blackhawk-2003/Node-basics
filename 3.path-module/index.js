// path module provides utilities to work
//with file and directory path

const { log } = require("console");
const path = require("path");

console.log("Directory name: ", path.dirname(__filename));

console.log("File Name: ", path.basename(__filename));

console.log("File Extension name: ", path.extname(__filename));

const joinedPath = path.join("/user", "documents", "node", "projects");

console.log("Joined Path", joinedPath);

const resolvePath = path.resolve("user", "documents", "node", "projects");

console.log("Resolve path: ", resolvePath);

const normalizePath = path.normalize("/user/documents/../node/projects");

console.log("Normalize Path", normalizePath);
