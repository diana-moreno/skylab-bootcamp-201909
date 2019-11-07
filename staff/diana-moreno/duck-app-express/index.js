const express = require('express')
const { View, Login, Register, RegisterSuccess, Search } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks } = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')
const querystring = require('querystring')

const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
  res.send(View({ body: Login({ path: '/login', register: '/register' }) }))
})

app.get('/register', (req, res) => {
  res.send(View({ body: Register({ path: '/register', login: '/login' }) }))
})

app.get('/register-success', (req, res) => {
  res.send(View({ body: RegisterSuccess({ login: '/login' }) }))
})

app.post('/register', bodyParser, (req, res) => {
  const { body: { name, surname, email, password } } = req

  try {
    registerUser(name, surname, email, password)
      .then(() => res.redirect('/register-success'))
      .catch(({ message }) => res.send(View({ body: Register({ path: '/register', login: '/login', error: message }) })))
  } catch (error) {
      res.send(View({ body: Register({ path: '/register', error: error.message }) }))
  }
})

app.post('/login', bodyParser, (req, res) => {
  const { body: { username, password } } = req

  try {
    authenticateUser(username, password, (error, credentials) => {
      if (error) return res.send(error.message) //TODO

      const { id, token } = credentials
      sessions[id] = token
      res.setHeader('set-cookie', `id=${id}`)
      res.redirect('/search')
    })
  } catch (error) {
    res.send(error.message) //TODO
  }
})

app.get('/search', (req, res) => {
  try {
    const { headers: { cookie } } = req
    if (!cookie) return res.redirect('/login')

    const [, id] = cookie.split('id=')
    const token = sessions[id]
    if (!token) return res.redirect('/login')

    retrieveUser(id, token, (error, userData) => {
      if (error) return res.send(error.message)

      const { name } = userData
      const { query: { query: query } } = req

      if (!query) res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))
      else {
        try {
          searchDucks(id, token, query, (error, ducks) => {
            if (error) return res.send(error.message)

            console.log(ducks)

            res.send(View({ body: `${Search({ path: '/search', query, name, logout: '/logout' })} ` })) // TODO ${Results({items: ducks})}
          })
        } catch (error) {
          res.send(error.message)

        }
      }
    })
  } catch (error) {
    res.send(error.message)
  }
})

app.post('/logout', (req, res) => {
  console.log('fuera')
  res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')
  res.redirect('/login')
})


app.listen(port, () => console.log(`server running on port ${port}`))
