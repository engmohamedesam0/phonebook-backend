const router = require('express').Router()
const Person = require('../models/person')

router.get('/', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  Person.findOne({ name: body.name }).then(existing => {
    if (existing) {
      Person.findByIdAndUpdate(
        existing._id,
        { number: body.number },
        { new: true, runValidators: true, context: 'query' }
      ).then(updated => {
        res.json(updated)
      }).catch(err => next(err))
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person.save().then(saved => {
        res.json(saved)
      }).catch(err => next(err))
    }
  }).catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  const body = req.body

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  Person.findByIdAndUpdate(
    req.params.id,
    { number: body.number },
    { new: true, runValidators: true, context: 'query' }
  ).then(updated => {
    if (updated) {
      res.json(updated)
    } else {
      res.status(404).json({ error: 'person not found' })
    }
  }).catch(err => next(err))
})

module.exports = router