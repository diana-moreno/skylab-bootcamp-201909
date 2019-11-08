const express = require('express')
const { View, Login, Register, RegisterSuccess, Search, ResultsItem, Result } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks } = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

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
  } catch ({ message }) {
    res.send(View({ body: Register({ path: '/register', error: message }) }))
  }
})

app.post('/login', bodyParser, (req, res) => {
  const { body: { username, password } } = req

  /* callback version:
    try {
      authenticateUser(username, password, (error, credentials) => {
        if (error) return res.send(error.message) //TODO

        const { id, token } = credentials
        sessions[id] = token
        res.setHeader('set-cookie', `id=${id}`)
        res.redirect('/search')
      })
    } catch (error) {
        res.send(View({ body: Login({ path: '/login', error: error.message }) }))
    }*/

  try {
    authenticateUser(username, password)
      .then(credentials => {
        const { id, token } = credentials
        sessions[id] = token
        res.setHeader('set-cookie', `id=${id}`)
        res.redirect('/search')
      })
      .catch(({ message }) => {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
      })
  } catch ({ message }) {
    res.send(View({ body: Login({ path: '/login', error: message }) }))
  }
})

app.get('/search', cookieParser, (req, res) => {
  try {
    const { cookies: { id }, query: { query } } = req
    //req.headers.cookies
    if (!id) return res.redirect('/login')

    const token = sessions[id]
    if (!token) return res.redirect('/login')
    let name

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

        if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) })) //return???

        return searchDucks(id, token, query) // antes con las arrow se producía auto return, ahora no y hay que indicarlo manualmente
         /* .then(ducks => console.log(ducks))*/
          .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav' }) })))
      })
      .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
  } catch ({ message }) {
    res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
  }
})

app.post('/logout', cookieParser, (req, res) => {
  res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

  const { cookies: { id } } = req
  if (!id) return res.redirect('/login')
  delete sessions[id]

  res.redirect('/login')
})

app.post('/fav', cookieParser, bodyParser, (req, res) => {
  try {
    const { cookies: { id }, body: { id: duckId } } = req

    if (!id) return res.redirect('/login')
    const token = sessions[id]
    if (!token) return res.redirect('/login')

    res.send(`make fav duck ${duckId}`)
  } catch (error) {
    res.send('kaput')
  }
})


app.listen(port, () => console.log(`server running on port ${port}`))
