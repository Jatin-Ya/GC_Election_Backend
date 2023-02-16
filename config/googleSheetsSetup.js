const { google, Auth } = require("googleapis");
const config = require("../utils/config");
const { path } = require("../app");

const auth = new Auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = config.SPREADSHEET_ID;

let googleSheets = null;
let emailsList = {
    CS: [],
    CE: [],
    ECE: [],
    MSC: [],
    MTECH: [],
    ME: [],
    EE: [],
    PHD: [],
};

const hostelsList = ["CS", "CE", "ECE", "MSC", "MTECH", "ME", "EE", "PHD"]; //["BHR", "RHR", "SHR", "GHR", "MHR"];

const initializeGoogleSheetsClient = async () => {
    console.log("initializeGoogleSheetsClient");

    const client = await auth.getClient();

    googleSheets = google.sheets({ version: "v4", auth: client });
};

const getAllEmails = async () => {
    if (!googleSheets) {
        await initializeGoogleSheetsClient();
    }

    hostelsList.forEach(async (hostel) => {
        const response = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: `${hostel}!C:C`,
        });

        const emails = [];
        console.log(
            `Fetched ${response.data.values.length} entries from ${hostel}`
        );

        for (let i = 1; i < response.data.values.length; ++i) {
            emails.push(response.data.values[i][0]);
        }

        emailsList[hostel] = emails;


    });
};

const getEmailsOfAHostel = async (hostel) => {
    // if (emailsList[hostel].length > 0) return emailsList[hostel];

    if (!googleSheets) {
        await initializeGoogleSheetsClient();
    }

    const response = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: `${hostel}!C:C`,
    });

    const emails = [];

    for (let i = 1; i < response.data.values.length; ++i) {
        emails.push(response.data.values[i][0]);
    }

    emailsList[hostel] = emails;
    console.log(emailsList);

    return emailsList[hostel];
};

module.exports = {
    getEmailsOfAHostel,
    initializeGoogleSheetsClient,
    getAllEmails,
};
