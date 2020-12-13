const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config.json');
// catchy jp user 1A8mN8TNV41pfzwvcYOKW8QdeqxwCBJT_zsgkczqEMqw
// catchy jp admin 1VPzFoGkIRKmjaTxXYPX8v4LTTwTwoeVYFxOFslZZpys
// correct-format-admin 1-BH24rSD7C9WJ4tWu-7feO9PEL9k_mpKW7pqlcQtDoU
// correct-format-user 1dOqmzfmLqhGFzpp-DlL596DdUCwmKEJ2vz_jmz6safY
const doc = new GoogleSpreadsheet('1VPzFoGkIRKmjaTxXYPX8v4LTTwTwoeVYFxOFslZZpys');

const getListByTitle = async (name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const rows = await sheet.getRows();
  const data = []
  for (let i = 0; i < rows.length; i++) {
    data.push({
      "id": i,
      "@Twitter": rows[i]["@Twitter"],
      "Tracking no.": rows[i]["Tracking no."],
      "สถานะการจ่ายเงิน": rows[i]["สถานะการจ่ายเงิน"],
      "รายการ": rows[i]["รายการ"],
      "จำนวน": rows[i]["จำนวน"],
      "การจัดส่ง": rows[i]["การจัดส่ง"],
      "สถานะสินค้า": rows[i]["สถานะสินค้า"],
      "ที่อยู่": rows[i]["ที่อยู่"],
      "ยอดที่โอน": rows[i]["ยอดที่โอน"],
      "Note": rows[i]["Note"],
      "ต้นทุน": rows[i]["ต้นทุน"],
      "ราคาขาย": rows[i]["ราคาขาย"],
      "ค่าส่งที่เก็บ": rows[i]["ค่าส่งที่เก็บ"],
      "ค่าส่งจริง": rows[i]["ค่าส่งจริง"],
      "กำไร": rows[i]["กำไร"],
      "sheet": name
    })
  }
  return data
}

const addList = async (body, name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();

  // month
  const sheetMonth = doc.sheetsByTitle[name];
  const addMonth = await sheetMonth.addRow(body);
  const rowsMonth = await sheetMonth.getRows();
  const monthId = addMonth._rowNumber
  rowsMonth[monthId - 2]["กำไร"] = `=SUM(I${monthId}-K${monthId}-N${monthId})`
  await rowsMonth[monthId - 2].save();
  // raw
  const sheetRaw = doc.sheetsByTitle["raw"];
  const addRaw = await sheetRaw.addRow(body);
  const rowsRaw = await sheetRaw.getRows();
  const rawId = addRaw._rowNumber
  rowsRaw[rawId - 2]["กำไร"] = `=SUM(I${rawId}-K${rawId}-N${rawId})`
  await rowsRaw[rawId - 2].save();
  return true
}
// const updateProfit = async (id, rawId, name) => {
//   await doc.useServiceAccountAuth(creds);
//   await doc.loadInfo();
//   const sheetMonth = doc.sheetsByTitle[name];
//   const rowsMonth = await sheetMonth.getRows();
//   rowsMonth[id - 2]["กำไร"] = `=SUM(I${id}-K${id}-N${id})`
//   await rowsMonth[id - 2].save();

//   const sheetRaw = doc.sheetsByTitle["raw"];
//   const rowsRaw = await sheetRaw.getRows();
//   rowsRaw[rawId - 2]["กำไร"] = `=SUM(I${rawId}-K${rawId}-N${rawId})`
//   await rowsRaw[rawId - 2].save();

//   return true
//   // const sheetRaw = doc.sheetsByTitle["raw"];
//   // const rowsRaw = await sheetRaw.getRows();
//   // rowsRaw[id]["กำไร"] = `=SUM(I${id}-K${id}-N${id})`

// }
const editList = async (data, name) => {
  try {
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[name];
    const rows = await sheet.getRows();
    rows[data.id]['Tracking no.'] = data["Tracking no."]
    rows[data.id]['สถานะการจ่ายเงิน'] = data["สถานะการจ่ายเงิน"]
    rows[data.id]['สถานะสินค้า'] = data["สถานะสินค้า"]
    rows[data.id]['ที่อยู่'] = data["ที่อยู่"]
    await rows[data["id"]].save();
    return true

  } catch (err) {
    console.log(err)
  }
}

const createList = async () => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = await doc.addSheet({
    headerValues: [
      '@Twitter', 'Tracking no.', 'สถานะการจ่ายเงิน', 'รายการ', 'จำนวน'
      , "การจัดส่ง", 'สถานะสินค้า', "ที่อยู่", "ยอดที่โอน", "Note", "ต้นทุน", "ราคาขาย", "ค่าส่งที่เก็บ", "ค่าส่งจริง", "กำไร"]
  });
}

const addRaw = async (body) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["raw"];
  const id = await sheet.addRow(body);
  return id._rowNumber
}

const getSummaryAccount = async () => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["all_summary"];
  const rows = await sheet.getRows();
  const data = []
  for (let i = 0; i < rows.length; i++) {
    data.push({
      "@Twitter": rows[i]["@Twitter"],
      "จำนวน": parseInt(rows[i]["จำนวน"]),
      "ยอดที่โอน": parseInt(rows[i]["ยอดที่โอน"]),
      "กำไร": parseInt(rows[i]["กำไร"]),
    })
  }
  return data
}

const getSummaryMonth = async () => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["month_summary"];
  const rows = await sheet.getRows();
  const data = []
  for (let i = 0; i < rows.length; i++) {
    data.push({
      "เดือน": rows[i]["เดือน"],
      "จำนวน": parseInt(rows[i]["จำนวน"]),
      "ยอดที่โอน": parseInt(rows[i]["ยอดที่โอน"]),
      "กำไร": parseInt(rows[i]["กำไร"]),
      "ต้นทุน": parseInt(rows[i]["ต้นทุน"])
    })
  }
  return data
}

module.exports = { getListByTitle, addList, editList, createList, addRaw, getSummaryAccount, getSummaryMonth }