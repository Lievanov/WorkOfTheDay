const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const db = require('./db')

const app = express()
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to Work of the Day API!

    An "Authorization" header is required to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

  </pre>
  `
  res.send(help)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.get('/workouts', (req, res) => {
  res.send(db.get(req.token))
})

app.post('/workouts', bodyParser.json(), (req, res) => {
  const { name, laps, rest } = req.body
  if (name && laps && rest ) {
    res.send(db.add(req.token, req.body))
  } else {
    res.status(403).send({
      error: 'Please provide a name'
    })
  }
})

app.put('/workouts/:id', bodyParser.json(), (req, res) => {
  const {name, laps, rest } = req.body
  if(name && laps && rest){
    res.send(db.update(req.token, req.body))
  } else {
    res.status(403).send({ error: 'please provide a name'})
  }
})

app.post('/logs/:id/:logId/:status', bodyParser.json(), (req, res) => {
  if (req.body) {
    res.send(db.addLog(req.token, req.body, req.params.logId, req.params.status))
  } else {
    res.status(403).send({
      error: 'Please provide an ID'
    })
  }
})

app.listen(config.port, () => {
  console.log('WoD Server listening on port %s, Ctrl+C to stop', config.port)
})
