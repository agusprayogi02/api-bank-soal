const express = require('express')
const http = require('http')
const body = require('body-parser')
const cors = require('cors')

var app = express()

var corsOptions = {
  origin: 'http://localhost:8081',
}

app.use(cors())
app.use(body.json())
app.use(body.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send({message: 'Welcome to bezkoder application.'})
})

const PORT = process.env.PORT || '4000'
var server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server Is Ready On PORT ${PORT} !!`)
})
