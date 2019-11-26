const { Router } = require('express')
const bodyParser = require('body-parser')
const { registerUser, authenticateUser, retrieveUser, deleteUser, editUser/*, createTask, listTasks, modifyTask, removeTask*/ } = require('./logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('./helpers/token-verifier')(SECRET)
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wheely-utils')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/users', jsonBodyParser, (req, res) => {
  const { body: { name, surname, email, password, role } } = req

  try {
    registerUser(name, surname, email, password, role)
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

/*
router.post('/users', jsonBodyParser, async (req, res) => {
  const { body: { name, surname, email, password, role } } = req

  try {
    await registerUser(name, surname, email, password, role)
    res.status(201).end()
  } catch (error) {
    const { message } = error

    if (error instanceof ConflictError)
      return res.status(409).json({ message })
    res.status(400).json({ message })
  }
})
*/


router.post('/auth', jsonBodyParser, (req, res) => {
  const { body: { email, password } } = req

  try {
    authenticateUser(email, password)
      .then(id => {
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
        //revisar como se convierte id en token!
        res.json({ token })
      })
      .catch(error => {
        const { message } = error

        if (error instanceof CredentialsError)
          return res.status(401).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

router.get('/users', tokenVerifier, (req, res) => {
  //tokenVerifier añade el id que reciben del token en header en req?
  try {
    const { id } = req

    retrieveUser(id)
      .then(user => res.json({ user }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch (error) {
    const { message } = error

    res.status(400).json({ message })
  }
})

router.delete('/users', tokenVerifier, (req, res) => {
  try {
    const { id } = req

    deleteUser(id)
      .then(() => res.end())
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

router.patch('/users', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
    const { id, body: { name, surname, email } } = req

    editUser(id, name, surname, email)
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

module.exports = router