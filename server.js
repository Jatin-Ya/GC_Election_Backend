const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const config = require("./utils/config");
const mongoose = require("mongoose");
const {
  initializeGoogleSheetsClient,
  getAllEmails,
} = require("./config/googleSheetsSetup");
const server = http.createServer(app);

dotenv.config();

console.log("Starting app..");
console.log("Waiting for connection to MongoDB");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
    console.log("Starting webserver..");
    server.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
      // initializeGoogleSheetsClient();
      getAllEmails();
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to MongoDB server! Shutting down...");
    process.exit(1);
  });
