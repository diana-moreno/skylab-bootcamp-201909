const { Router } = require('express')
const { toggleSchedule } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wheely-utils')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.patch('/toggle', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
    const { id, body: { instructorId, indexDay, hour } } = req
    toogleSchedule(id, instructorId, indexDay, hour)
      .then((instructor) => res.json({ instructor }))
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

/*
router.get('/', tokenVerifier, (req, res) => {
  try {
    const { id } = req
    retrieveSchedule(id)
      .then((calendar) => res.json({ calendar }))
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