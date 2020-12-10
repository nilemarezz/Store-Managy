const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config.json');
// spreadsheet key is the long id in the sheets URL
// local 1DLP-KXGv0_ykWUM07Gxl1iqQ2M3WCAs6SVn8anpOQxg
// prod 1_lL70ZFhUBwXw7h-otL9NMVfxqHWFeJRtTaU1Vuejg8
// correct-format-admin 1-BH24rSD7C9WJ4tWu-7feO9PEL9k_mpKW7pqlcQtDoU
// correct-format-user 1dOqmzfmLqhGFzpp-DlL596DdUCwmKEJ2vz_jmz6safY
const doc = new GoogleSpreadsheet('1-BH24rSD7C9WJ4tWu-7feO9PEL9k_mpKW7pqlcQtDoU');

const getListByTitle = async (name) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const rows = await sheet.getRows();
  console.log(rows[17]["@Twitter"])
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
  const sheet = doc.sheetsByTitle[name];
  await sheet.addRow(body);
  return true
}

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
  // const rows = await sheet.getRows();
  // console.log(rows[3]["@Twitter"])
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

module.exports = { getListByTitle, addList, editList, createList }