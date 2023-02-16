require("dotenv").config();

let PORT = process.env.PORT;
let NODE_ENV = process.env.NODE_ENV;
let MONGODB_URI = process.env.MONGODB_URI;
let CLIENT_ID = process.env.CLIENT_ID;
let SPREADSHEET_ID = process.env.SPREADSHEET_ID;
// let SESSION_SECRET = process.env.SESSION_SECRET;
let HOSTEL = process.env.HOSTEL;
let WARDEN_EMAIL = process.env.WARDEN_EMAIL;
let ADMIN_EMAILS = [
  "warden@iitbbs.ac.in",
  "chiefwarden@iitbbs.ac.in",
  "warden.bhr@iitbbs.ac.in",
  "warden.mhr@iitbbs.ac.in",
  "warden.rhr@iitbbs.ac.in",
  "warden.shr@iitbbs.ac.in",
  "warden.ghr@iitbbs.ac.in",
  "asstwarden.bhr@iitbbs.ac.in",
  "asstwarden.mhr@iitbbs.ac.in",
  "asstwarden.rhr@iitbbs.ac.in",
  "asstwarden.shr@iitbbs.ac.in",
  "asstwarden.ghr@iitbbs.ac.in",
  "vpresident.sg@iitbbs.ac.in",
];

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV,
  CLIENT_ID,
  SPREADSHEET_ID,
  // SESSION_SECRET,
  // HOSTEL,
  WARDEN_EMAIL,
  ADMIN_EMAILS,
};
