const express = require('express');
const app = express()
require('dotenv').config({ path: __dirname + '/.env' })
const { getListByTitle, addList, editList, createList, addRaw, getSummaryAccount, getSummaryMonth, deleteList, addFromUser } = require('./services/adminsheet')
const { userCreateList, userAddList, userEditList, deleteListUser, userAddForm } = require('./services/usersheet')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors');
const port = process.env.PORT || 5000
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date'));
app.use(cors());
app.use(bodyParser.json())


app.get("/list", async (req, res) => {
  try {
    const rows = await getListByTitle(req.query.sheet, req.query.admin)
    res.json({ result: true, data: rows })
  } catch (err) {
    res.json({ result: false })
    console.log(err)
  }
})

app.post("/add", async (req, res) => {
  try {
    const date = new Date()
    const date_format = `${date.getMonth() + 1}_${date.getFullYear().toString()}`
    await addList(req.body, date_format, req.query.admin)
    await userAddList(req.body, date_format, req.query.user)
    res.json({ result: true })
  } catch (err) {
    console.log(err)
    res.json({ result: false })
  }
})

app.put("/edit", async (req, res) => {
  try {
    const sheet = req.body.sheet
    await editList(req.body, sheet, req.query.admin)
    await userEditList(req.body, sheet, req.query.user)
    res.json({ result: true })
  } catch (err) {
    res.json({ result: false })
  }
})

app.post("/create", async (req, res) => {
  try {
    await createList()
    await userCreateList()
  } catch (err) {
    console.log(err)
  }
})

app.delete("/delete", async (req, res) => {
  console.log('delete')
  try {
    await deleteList(req.query.id, req.query.admin, req.query.user, req.query.sheet)
    await deleteListUser(req.query.id, req.query.admin, req.query.user, req.query.sheet)
    res.json({ result: true })
  } catch (err) {
    res.json({ result: false })
    console.log(err)
  }
})

app.post("/addFormUser", async (req, res) => {
  try {
    const data = []
    for (let i = 0; i < req.body.product.length; i++) {
      const adding = req.body.payStatus === "มัดจำ" ? 2 : 1
      data.push({
        "@Twitter": req.body.twitter,
        "รายการ": req.body.product[i].productName,
        "จำนวน": req.body.product[i].productAmount,
        "การจัดส่ง": req.body.logist === "type1" ? "ลทบ." : "EMS",
        "สถานะการจ่ายเงิน": req.body.payStatus,
        "ยอดที่โอน": parseInt(req.body.product[i].productPrice) * parseInt(req.body.product[i].productAmount) + (i === 0 ? parseInt(req.body.logistPrice) : 0),
        "Note": req.body.note === '' ? '-' : req.body.note,
        "ที่อยู่": req.body.address,
        "ราคาขาย": (parseInt(req.body.product[i].productPrice)) * adding * parseInt(req.body.product[i].productAmount),
        "ค่าส่งที่เก็บ": i === 0 ? req.body.logistPrice : 0,
        "สถานะสินค้า": 'รอกด',
        "Tracking no.": '-',
        "ต้นทุน": 0
      }
      )
    }
    console.log(data)
    const date = new Date()
    const date_format = `${date.getMonth() + 1}_${date.getFullYear().toString()}`
    await addFromUser(data, date_format, req.query.admin)
    await userAddForm(data, date_format, req.query.user)
    res.json({ result: false })
  } catch (err) {
    console.log(err)
    res.json({ result: false })
  }
})

app.get("/summary/data", async (req, res) => {
  try {
    const dataMonth = await getSummaryMonth(req.query.admin)
    let allAmount = 0
    let allPrice = 0
    let allcost = 0

    for (let i = 0; i < dataMonth.length; i++) {
      allAmount = allAmount + parseInt(dataMonth[i]["จำนวน"])
      allPrice = allPrice + parseInt(dataMonth[i]["ยอดที่โอน"])
      allcost = allcost + parseInt(dataMonth[i]["ต้นทุน"])
    }
    const dataAccount = await getSummaryAccount(req.query.admin)
    const dataAccount2 = await getSummaryAccount(req.query.admin)
    const sortprice = dataAccount.sort(dynamicSort("ยอดที่โอน")).splice(0, 3)
    const sortAmount = dataAccount2.sort(dynamicSort("จำนวน")).splice(0, 3)
    const resData = {
      toprank: {
        sortByAmount: [...sortAmount],
        sortByPrice: [...sortprice]
      },
      filterByMonth: [{ "เดือน": 'ทั้งหมด', "จำนวน": allAmount, "ยอดที่โอน": allPrice, "ต้นทุน": allcost, "กำไร": allPrice - allcost }, ...dataMonth],
    }


    res.json({
      result: true, data: resData
    })
  } catch (err) {
    console.log(err)
    res.json({
      result: false
    })
  }
})
const dynamicSort = (property) => {
  var sortOrder = -1;
  if (property[0] === "-") {
    sortOrder = 1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers, 
     * and you may want to customize it to your needs
     */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

app.listen(port, () => {
  console.log('Server start at port' + port)
})