const {google} = require('googleapis');
const serviceAccountKeyFile = "./helper/googleSheet/google-service-account-credentials.json";   // not uploaded on github for security purposes
const sheetId = process.env.sheetId
const tabName = 'Sheet1'  //by default
const range = 'A:E'


// example of CRUD operation on sheet 
// exports.main = async () => {
//   // Generating google sheet client
//   const googleSheetClient = await _getGoogleSheetClient();

//   // Reading Google Sheet from a specific range
//   const data = await _readGoogleSheet(googleSheetClient, sheetId, tabName, range);
//   console.log(data);

//   // Adding a new row to Google Sheet
//   const dataToBeInserted = [
//      ['11', 'rohith', 'Rohith', 'Sharma', 'Active'],
//      ['12', 'virat', 'Virat', 'Kohli', 'Active']
//   ]
//   await _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
// }

async function _getGoogleSheetClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();
  return google.sheets({
    version: 'v4',
    auth: authClient,
  });
}

async function _readGoogleSheet(googleSheetClient, sheetId, tabName, range) {
  const res = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });

  return res.data.values;
}

async function _writeGoogleSheet(googleSheetClient, sheetId, tabName, range, data) {
  await googleSheetClient.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  })
}


module.exports = {
  readGoogleSheet: _readGoogleSheet,
  writeGoogleSheet: _writeGoogleSheet,
  getGoogleSheetClient: _getGoogleSheetClient

};