const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(`<password>`, process.env.PASSWORD);
const port = process.env.PORT || 3000;

// console.log(DB);

const init = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("DB connection successful ✅");
    app.listen(process.env.PORT, () => {
      console.log(`Hello from the server from port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    console.log("ERROR");
  }
};

init();
