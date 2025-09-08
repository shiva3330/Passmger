const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
const port = 3000
dotenv.config()

const url = process.env.MONGO_URI;
const client = new MongoClient(url)
client.connect()

const app = express()
app.use(bodyparser.json())
app.use(cors())

const dbName = process.env.DB_NAME;

app.get('/', async (req, res) => {
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray()
  res.json(findResult)
  res.send("server side")
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password)
  res.send({success:true, result:findResult})
})

app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password)
  res.send({success:true, result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
