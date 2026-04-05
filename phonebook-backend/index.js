const express = require('express')
const mongoose = require('mongoose')
const personsRouter = require('./routes/persons')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()

const app = express()

app.use(express.json())

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch(err => {
  console.error('error connecting to MongoDB:', err.message)
})

app.use('/api/persons', personsRouter)

app.get('/info', (req, res, next) => {
  mongoose.model('Person').countDocuments({}).then(count => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `)
  }).catch(err => next(err))
})

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})