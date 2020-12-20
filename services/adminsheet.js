const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config');

const getListByTitle = async (name, file) => {
  const doc = new GoogleSpreadsheet(file);
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
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

const addList = async (body, name, admin) => {
  const doc = new GoogleSpreadsheet(admin);
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
  await doc.loadInfo();

  // month
  const sheetMonth = doc.sheetsByTitle[name];
  const addMonth = await sheetMonth.addRow(body);
  // raw
  const sheetRaw = doc.sheetsByTitle["raw"];
  const addRaw = await sheetRaw.addRow(body);
  return true
}

const editList = async (data, name, admin) => {
  try {
    const doc = new GoogleSpreadsheet(admin);
    await doc.useServiceAccountAuth({
      client_email: creds.client_id,
      private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[name];
    const rows = await sheet.getRows();
    rows[data.id]['Tracking no.'] = data["Tracking no."]
    rows[data.id]['สถานะการจ่ายเงิน'] = data["สถานะการจ่ายเงิน"]
    rows[data.id]['สถานะสินค้า'] = data["สถานะสินค้า"]
    rows[data.id]['ที่อยู่'] = data["ที่อยู่"]
    rows[data.id]['ต้นทุน'] = data["ต้นทุน"]
    await rows[data["id"]].save();
    return true

  } catch (err) {
    console.log(err)
  }
}

const deleteList = async (id, admin, user, name) => {
  try {
    const doc = new GoogleSpreadsheet(admin);
    await doc.useServiceAccountAuth({
      client_email: creds.client_id,
      private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[name];
    const rows = await sheet.getRows();
    await rows[id].delete()
    return true
  } catch (err) {
    console.log(err)
  }
}

const createList = async () => {
  const doc = new GoogleSpreadsheet('1VPzFoGkIRKmjaTxXYPX8v4LTTwTwoeVYFxOFslZZpys');
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
  await doc.loadInfo();
  const sheet = await doc.addSheet({
    headerValues: [
      '@Twitter', 'Tracking no.', 'สถานะการจ่ายเงิน', 'รายการ', 'จำนวน'
      , "การจัดส่ง", 'สถานะสินค้า', "ที่อยู่", "ยอดที่โอน", "Note", "ต้นทุน", "ราคาขาย", "ค่าส่งที่เก็บ", "ค่าส่งจริง", "กำไร"]
  });
}

const addRaw = async (body) => {
  const doc = new GoogleSpreadsheet('1VPzFoGkIRKmjaTxXYPX8v4LTTwTwoeVYFxOFslZZpys');
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["raw"];
  const id = await sheet.addRow(body);
  return id._rowNumber
}

const getSummaryAccount = async (admin) => {
  const doc = new GoogleSpreadsheet(admin);
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
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

const getSummaryMonth = async (admin) => {
  const doc = new GoogleSpreadsheet(admin);
  await doc.useServiceAccountAuth({
    client_email: creds.client_id,
    private_key: creds.private_key.replace(new RegExp("\\\\n", "\g"), "\n"),
  });
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

module.exports = { getListByTitle, addList, editList, createList, addRaw, getSummaryAccount, getSummaryMonth, deleteList }