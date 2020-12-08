const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config.json');
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1_lL70ZFhUBwXw7h-otL9NMVfxqHWFeJRtTaU1Vuejg8');

const getListByTitle = async (name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const rows = await sheet.getRows();
  const data = []
  for (let i = 1; i < rows.length; i++) {
    data.push({
      "id": rows[i]._rowNumber,
      "@twitter": rows[i]._rawData[0],
      "Tracking no.": rows[i]._rawData[1],
      "สถานะ": rows[i]._rawData[2],
      "รายการ": rows[i]._rawData[3],
      "จำนวน": rows[i]._rawData[4],
      "ยอดที่โอน": rows[i]._rawData[5],
      "การจัดส่ง": rows[i]._rawData[6],
      "ที่อยู่": rows[i]._rawData[7],
      "note": rows[i]._rawData[8],
      "ต้นทุน": rows[i]._rawData[9],
      "ราคาขาย": rows[i]._rawData[10],
      "ค่าส่งที่เก็บ": rows[i]._rawData[11],
      "ค่าส่งจริง": rows[i]._rawData[12],
      "กำไร": rows[i]._rawData[13],
    })
  }
  return data
}

const getSummaryValue = async (name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const rows = await sheet.getRows();
  const value = rows[0]._sheet.headerValues
  const data = {
    "sheet_name": name,
    "จำนวน": value[4],
    "ยอกที่โอน": value[5],
    "ต้นทุน": value[9],
    "ราคาขาย": value[10],
    "ค่าส่งที่เก็บ": value[11],
    "กำไร": value[13],
  }
  return data
}

const addList = async (body, name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const larryRow = await sheet.addRow(['asdasdasd', 'asdasd']);
  return true
}

module.exports = { getListByTitle, getSummaryValue, addList }