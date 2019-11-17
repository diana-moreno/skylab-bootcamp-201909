require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const users = require('./data/users')()
const tasks = require('./data/tasks')()
const { registerUser, authenticateUser, retrieveUser, modifyTask, createTask, listTasks, removeTask } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('./utils/errors')
const jwt = require('jsonwebtoken')
// PORT viene de un fichero a parte al igual que secret. Si port no viene del fichero, usaremos el port pasado por process, y sino el por defecto que es el 8080
const { argv: [, , port = 8080], env: { SECRET, PORT = port || 8080, DB_URL } } = process
const tokenVerifier = require('./utils/token/token-verifier')(SECRET)
const database = require('./utils/database')
const api = express()
const jsonBodyParser = bodyParser.json() // transforma los chunks en json


// cuando se registra
api.post('/users', jsonBodyParser, (req, res) => {
  // el body se crea con el body parser, sino no existiría el body
  const { body: { name, surname, email, username, password } } = req

  try {
    registerUser(name, surname, email, username, password)
      .then(() => res.status(201).end()) // end porque no queremos enviar nada más
      .catch(error => { // error asíncrono
        const { message } = error

        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) { // error.message
    // error síncrono. El usuario ha introducido un dato incorrecto
    res.status(400).json({ message })
  }
})

api.post('/auth', jsonBodyParser, (req, res) => {
  const { body: { username, password } } = req

  try {
    authenticateUser(username, password)
      .then(id => {
        // estamos creando el token pasándole los datos que queremos, que son sub: id, el secreto y cuando caduca.
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

        //res.json es lo mismo que res.send(JSON.parse({ token }))
        res.json({ token })
      })
      .catch(error => {
        const { message } = error
        // cuando authenticate no va bien
        if (error instanceof CredentialsError)
          return res.status(401).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
    // error síncrono. El usuario ha metido un dato incorrecto
  }
})

//'/users/:id' // id ahora viene recogido del token
api.get('/users', tokenVerifier, (req, res) => {

  try {
    const { id } = req

    retrieveUser(id)
      .then(user => res.json({ user })) /// no entiendo este destructuring user.user???????
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch (error) {
    const { message } = error

    if (error instanceof CredentialsError || error instanceof JsonWebTokenError)
      return res.status(401).json({ message })

    res.status(400).json({ message })
  }
})

//token se le pasa por headers en authentication de Postman
api.post('/tasks', tokenVerifier, jsonBodyParser, (req, res) => {
  try {
    const { id, body: { title, description, status } } = req

    createTask(id, title, description, status)
      .then(id => res.status(201).json({ id }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.get('/tasks', tokenVerifier, (req, res) => {
  try {
    const { id } = req

    listTasks(id)
      .then(tasks => res.json(tasks))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.patch('/tasks/:idTask', tokenVerifier, jsonBodyParser, (req, res) => {
  try {
    const { id, params: { idTask }, body: { title, description, status } } = req
    modifyTask(id, idTask, title, description, status)
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

api.delete('/tasks/:idTask', tokenVerifier, (req, res) => {
  try {
    const { id, params: { idTask } } = req

    removeTask(id, idTask)
      .then(id => res.end()) // res.end() ya lleva implícito un status 200
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

database(DB_URL)
  .connect()
  .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))
