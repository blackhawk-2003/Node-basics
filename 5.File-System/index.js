//provides utilities functions to work with files

const fs = require("fs");

const path = require("path");

//provides utilities functions to work with paths

const dataFolder = path.join(__dirname, "data");
//To check if the folder exist if not then create the directory
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log(dataFolder, "data folder created");
}

const filePath = path.join(dataFolder, "example.txt");

//synchronous way of creating the file;

fs.writeFileSync(filePath, "Hello from the node js course");

console.log("File created successfully");

//To read the content of the file

const readContentFromFile = fs.readFileSync(filePath, "utf8");

console.log(readContentFromFile, "Content from the file");

//to append the already created file

fs.appendFileSync(filePath, "\n This is a new line added to that file");

console.log("New file content appended");

//async way of creating the file

const asyncFilePath = path.join(dataFolder, "async-example.txt");

fs.writeFile(asyncFilePath, "Hello async node js", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("File created successfully");
  }

  fs.readFile(asyncFilePath, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data, "Content from the file");
    }
    //to append the file asynchronouly

    fs.appendFile(asyncFilePath, "\n This is the new line added", (err) => {
      if (err) {
        throw err;
      } else {
        console.log("New line added to async file");
      }
      fs.readFile(asyncFilePath, "utf-8", (err, updatedData) => {
        if (err) {
          console.log(err);
        } else {
          console.log(updatedData, "Updated content from the file");
        }
      });
    });
  });
});

//So we have done everything in the file system and path module
//From creating it from sync to async manner
