const express = require('express')
const http = require('http')
const body = require('body-parser')
const cors = require('cors')
const db = require('./app/models')

var app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors())
app.use(body.json())
app.use(body.urlencoded({extended: true}))
try {
  await db.sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and re-sync db.')
})

app.get('/', (req, res) => {
  res.send({message: 'Welcome to bezkoder application.'})
})

const PORT = process.env.PORT || '4000'
var server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server Is Ready On PORT ${PORT} !!`)
})
