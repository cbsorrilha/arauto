require('dotenv').config()
const {promisedDBConnection} = require('./db')
const express = require('express')
const package = require('./package.json')
const {createTable, getTables} = require('./services/tables')
const bodyParser = require('body-parser')
const {filterQueryToObject} = require('./helpers')
const app = express()
const port = process.env.PORT

async function main (app, port) {

  app.use(bodyParser.json())

  const db = await promisedDBConnection()

  app.get('/', (req, res) => {
    res.json({
      name: package.name,
      version: package.version,
    })
  })

  app.post('/tables', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    try {
      const table = await createTable(req.body)
      res.json({created: true, table })
    } catch (error) {
      res.status(403).json({ error: true, message: error })
    }

  })

  app.get('/tables', async (req, res) => {
    const { page = 1, limit = 10, filters = "" } = req.query;

    res.setHeader('Content-Type', 'application/json')
    try {
      const tables = await getTables({ page, limit, filters: filterQueryToObject(filters) })
      res.json(tables)
    } catch (error) {
      res.status(403).json({ error: true, message: error })
    }
  })
  
  app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })
}

main(app, port)

module.exports = main
