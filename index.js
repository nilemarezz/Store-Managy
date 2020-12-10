const express = require('express');
const app = express()
const config = require('./config.json')
const { getListByTitle, addList, editList, createList } = require('./services/adminsheet')
const { userCreateList, userAddList, userEditList } = require('./services/usersheet')
var bodyParser = require('body-parser')
var cors = require('cors');
const port = process.env.PORT || 5000
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
    const date_format = `${date.getMonth() + 1}_${date.getFullYear().toString().substring(2, 4)}`
    await addList(req.body, date_format)
    await userAddList(req.body, date_format)
    res.json({ result: true })
  } catch (err) {
    res.json({ result: false })
    console.log(err)
  }
})

app.put("/edit", async (req, res) => {
  const sheet = req.body.sheet
  await editList(req.body, sheet)
  await userEditList(req.body, sheet)
})

app.post("/create", async (req, res) => {
  await createList()
})

app.listen(port, () => {
  console.log('Server start at port' + port)
})