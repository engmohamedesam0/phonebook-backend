const express = require('express')
const app = express()
app.use(express.json())


let persons = [
  { id: '1', name: 'mohamed esam', number: '0123456789' },
  { id: '2', name: 'Abdo ', number: '01140139574' },
  { id: '3', name: 'mahmoud', number: '01140139574' },
  { id: '4', name: 'osama', number: '01140139574' },
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// to get info
app.get('/info', (req, res) => {
  const time = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${time}</p>
  `)
})

// to get id
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'person not found' })
  }
})


// to delete person 
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  if (!person) {
    return res.status(404).json({ error: 'person not found' })
  }

  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

// to make sure right num and name
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})