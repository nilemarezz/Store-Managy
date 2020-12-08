const express = require('express');
const app = express()
const config = require('./config.json')
const { getListByTitle, getSummaryValue, addList } = require('./services/adminsheet')
var bodyParser = require('body-parser')
const port = process.env.port || 5000
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

app.get("/summary/:title", async (req, res) => {
  try {
    const rows = await getSummaryValue(req.params.title)
    res.json({ result: true, data: rows })
  } catch (err) {
    res.json({ result: false })
    console.log(err)
  }
})

app.post("/add", async (req, res) => {
  try {
    await addList(req.body, "12_20")
    res.json({ result: true })
  } catch (err) {
    res.json({ result: false })
    console.log(err)
  }
})

app.listen(port, () => {
  console.log('Server start at port' + port)
})