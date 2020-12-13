const express = require('express');
const app = express()
const config = require('./config.json')
const { getListByTitle, addList, editList, createList, addRaw, getSummaryAccount, getSummaryMonth } = require('./services/adminsheet')
const { userCreateList, userAddList, userEditList } = require('./services/usersheet')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors');
const port = process.env.PORT || 5000
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date'));
app.use(cors());
app.use(bodyParser.json())

app.get("/list/:title", async (req, res) => {
  try {
    const rows = await getListByTitle(req.params.title)
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
    const data = { ...req.body, "กำไร": "0" };
    await addList(data, date_format)
    await userAddList(data, date_format)
    res.json({ result: true })
  } catch (err) {
    console.log(err)
    res.json({ result: false })
  }
})

app.put("/edit", async (req, res) => {
  try {
    const sheet = req.body.sheet
    await editList(req.body, sheet)
    await userEditList(req.body, sheet)
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

app.get("/summary/data", async (req, res) => {
  try {
    const dataMonth = await getSummaryMonth()
    let allAmount = 0
    let allPrice = 0
    let allcost = 0

    for (let i = 0; i < dataMonth.length; i++) {
      allAmount = allAmount + parseInt(dataMonth[i]["จำนวน"])
      allPrice = allPrice + parseInt(dataMonth[i]["ยอดที่โอน"])
      allcost = allcost + parseInt(dataMonth[i]["ต้นทุน"])
    }
    const dataAccount = await getSummaryAccount()
    const dataAccount2 = await getSummaryAccount()
    const sortprice = dataAccount.sort(dynamicSort("ยอดที่โอน")).splice(0, 3)
    const sortAmount = dataAccount2.sort(dynamicSort("จำนวน")).splice(0, 3)
    console.log(sortAmount)
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

app.get("/summary/toprank", async (req, res) => {
  const dataAccount = await getSummaryAccount()
  res.json({
    result: true, data: formatSummaryAccount(dataAccount)
  })
})
// const formatSummaryAccount = async (data) => {
//   const sortByAmount = await data.sort(function (a, b) {
//     return b['จำนวน'] - a['จำนวน'];
//   })
//   const sortByPrice = await data.sort(function (a, b) {
//     return b['ยอดที่โอน'] - a['ยอดที่โอน'];
//   })
//   return await {
//     sortByPrice: sortByPrice.splice(0, 3),
//     sortByAmount: sortByAmount.splice(0, 3)
//   }
// }
app.listen(port, () => {
  console.log('Server start at port' + port)
})