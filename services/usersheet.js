const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('../config.json');
// spreadsheet key is the long id in the sheets URL
// local 1DLP-KXGv0_ykWUM07Gxl1iqQ2M3WCAs6SVn8anpOQxg
// prod 1_lL70ZFhUBwXw7h-otL9NMVfxqHWFeJRtTaU1Vuejg8

// catchy jp user 1A8mN8TNV41pfzwvcYOKW8QdeqxwCBJT_zsgkczqEMqw
// catchy jp admin 1VPzFoGkIRKmjaTxXYPX8v4LTTwTwoeVYFxOFslZZpys
// correct-format-admin 1-BH24rSD7C9WJ4tWu-7feO9PEL9k_mpKW7pqlcQtDoU
// correct-format-user 1dOqmzfmLqhGFzpp-DlL596DdUCwmKEJ2vz_jmz6safY



const userAddList = async (body, name, user) => {
  const doc = new GoogleSpreadsheet(user);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[name];
  const larryRow = await sheet.addRow(body);
  return true
}

const userEditList = async (data, name, user) => {
  try {
    const doc = new GoogleSpreadsheet(user);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[name];
    const rows = await sheet.getRows();
    rows[data.id]['Tracking no.'] = data["Tracking no."]
    rows[data.id]['สถานะการจ่ายเงิน'] = data["สถานะการจ่ายเงิน"]
    rows[data.id]['สถานะสินค้า'] = data["สถานะสินค้า"]
    await rows[data["id"]].save();
    return true

  } catch (err) {
    console.log(err)
  }

  // const sheet = await doc.addSheet({ headerValues: ['@Twitter', 'email'] });
  // const rows = await sheet.getRows();
}

const userCreateList = async () => {
  const doc = new GoogleSpreadsheet('1A8mN8TNV41pfzwvcYOKW8QdeqxwCBJT_zsgkczqEMqw');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = await doc.addSheet({
    headerValues: [
      '@Twitter', 'Tracking no.', 'สถานะการจ่ายเงิน', 'รายการ', 'จำนวน'
      , "การจัดส่ง", 'สถานะสินค้า']
  });
}

module.exports = { userAddList, userEditList, userCreateList }