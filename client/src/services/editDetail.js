import { variable } from '../masterdata'

const editDetail = async (value) => {
  const data = {
    id: value[variable.id.value],
    "ที่อยู่": value[variable.address.value],
    "Tracking no.": value[variable.trackingNo.value],
    "sheet": value[variable.sheet.value],
    "สถานะการจ่ายเงิน": value[variable.paymentStatus.value],
    "สถานะสินค้า": value[variable.productStatus.value],
    "ต้นทุน": value[variable.cost.value]
  }
  const res = await fetch(`https://nodemanagy.herokuapp.com/edit?admin=${process.env.REACT_APP_ADMIN_SHEET_CN}&user=${process.env.REACT_APP_ADMIN_SHEET_CN}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const isSuccess = await res.json()
  if (isSuccess.result) {
    return true
  } else {
    return false
  }
}

export default editDetail