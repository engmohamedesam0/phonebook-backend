const router = require('express').Router()
const Person = require('../models/person')

router.get('/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

router.get('/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ error: 'person not found' })
    }
  })
})

router.delete('/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  })
})

router.post('/', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  Person.findOne({ name: body.name }).then(existing => {
    if (existing) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save().then(saved => {
      res.json(saved)
    })
  })
})

module.exports = router