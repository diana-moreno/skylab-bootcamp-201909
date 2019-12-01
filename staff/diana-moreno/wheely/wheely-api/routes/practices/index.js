const { Router } = require('express')
const { createPractice, cancelPractice, listPractices, updatePractices, writeFeedback } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wheely-utils')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
  const { id, body: { instructorId, date } } = req
    createPractice(instructorId, id, date)
      .then((practice) => res.json({ practice }))
      .catch(error => {
        const { message } = error

        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.delete('/', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
  const { id, body: { instructorId, practiceId } } = req
    cancelPractice(instructorId, id, practiceId)
      .then(() => res.status(201).end())
      .catch(error => {
        const { message } = error

        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.patch('/', (req, res) => {
  try {
    updatePractices()
      .then(() => res.end() )
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
  const { id, body: { query } } = req

    listPractices(id, query)
      .then(users => res.json({ users }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.put('/feedback', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
    const { id, body: { studentId, practiceId, feedback, valoration } } = req

    writeFeedback(id, studentId, practiceId, feedback, valoration)
      .then(practice => res.json({ practice }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

module.exports = router