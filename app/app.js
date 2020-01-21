const express = require('express')
const app = express()
const port = 3000
const service = require('./match-service')

app.use(express.json());

app.get('/matches', (req, res) => res.send(service.list()))
app.post('/matches', (req, res) => {
  service.add(req.body)
  res.status(204).send({});
})

app.listen(port, () => console.log(`Scopely frontend challenge server running in port ${port}`))
