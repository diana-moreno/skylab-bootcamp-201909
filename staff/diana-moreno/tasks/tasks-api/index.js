require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const users = require('./data/users')()
const { registerUser, authenticateUser, retrieveUser } = require('./logic')
const { ConflictError, CredentialsError, NotFoundError } = require('./utils/errors')
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = jwt // error personalizado que viene en el paquete jwt del token

const api = express()

const jsonBodyParser = bodyParser.json() // transforma los chunks en json

// PORT viene de un fichero a parte al igual que secret. Si port no viene del fichero, usaremos el port pasado por process, y sino el por defecto que es el 8080
const { argv: [, , port = 8080], env: { SECRET, PORT = port || 8080 } } = process

api.post('/users', jsonBodyParser, (req, res) => {
  // el body se crea con el body parser, sino no existiría el body
  const { body: { name, surname, email, username, password } } = req

  try {
    registerUser(name, surname, email, username, password)
      .then(() => res.status(201).end()) // end porque no queremos enviar nada más que el error que viene por defecto
      .catch(error => { // error asíncrono
        const { message } = error

        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) { // error.message
    // error síncrono. El usuario ha metido un dato incorrecto
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
//'/users/:id' // id viene recogido del token
api.get('/users', (req, res) => {
  const { headers: { authorization } } = req

  try {
    if (!authorization) throw new CredentialsError('no token provided')
    const [, token] = authorization.split(' ') // vienen unos carácteres delante
    const { sub: id } = jwt.verify(token, SECRET)

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

    if(error instanceof CredentialsError || error instanceof JsonWebTokenError)
      return res.status(401).json({ message })

    res.status(400).json({ message })
  }
})

users.load() // cuando levanta el servidor
  .then(() => api.listen(port, () => console.log(`${name} ${version} up and running on port ${port}`)))
