const express = require('express')
const mongoose = require('mongoose')
const personsRouter = require('./routes/persons')

const app = express()

app.use(express.json())

const url = process.env.MONGODB_URI || 'mongodb+srv://engmohamedesam0_db_user:YOUR_PASSWORD@cluster0.qocr7e1.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch(err => {
  console.error('error connecting to MongoDB:', err.message)
})

app.use('/api/persons', personsRouter)

app.get('/info', (req, res) => {
  const time = new Date()
  const mongoose = require('mongoose')
  mongoose.model('Person').countDocuments({}).then(count => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${time}</p>
    `)
  })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})