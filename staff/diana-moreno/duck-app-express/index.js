const express = require('express')
const { View, Login, Register, RegisterSuccess, Search, ResultsItem, Result, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, retrieveDuck, toggleFavDuck } = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')

const { argv: [, , port = 8080] } = process

const sessions = {}

let query, name

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
        sessions[id] = { token }
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
    const { cookies: { id } } = req
    const session = sessions[id]
    const { token } = session
    // se guarda la query en la req para mantenerla a volver para atrás en el detalle.
    if(!req.query.query && session.query) req.query.query = session.query
    const { query: { query } } = req

    if (!session || !token || !id) return res.redirect('/login')
    let name

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

        if (!query) return res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) })) //return???

        session.query = query

        return searchDucks(id, token, query) // return es necesario si queremos ahorrarnos un catch y dejar que se recoja el valor en el siguiente catch.
         /* .then(ducks => console.log(ducks)) con el console.log se pierde el rastro de ducks porque no se devuelven*/
          .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detailPath: '/ducks' }) })))
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
    const session = sessions[id]
    const { token, query } = session

    if (!id || !session || !token) return res.redirect('/login')

    toggleFavDuck(id, token, duckId)
        .then(() => res.redirect(`/search?q=${query}`))
        .catch(({ message }) => {
            res.send('TODO error handling')
        })

    //res.send(`make fav duck ${duckId}`)
  } catch (error) {
    res.send('kaput')
  }
})

app.post('/favDetail', cookieParser, bodyParser, (req, res) => {
  try {
    const { cookies: { id }, body: { id: duckId } } = req
    const session = sessions[id]
    const { token, query } = session

    if (!id || !session || !token) return res.redirect('/login')

    toggleFavDuck(id, token, duckId)
        .then(() => res.redirect(`/ducks/${duckId}`))
        .catch(({ message }) => {
            res.send('TODO error handling')
        })

    //res.send(`make fav duck ${duckId}`)
  } catch (error) {
    res.send('kaput')
  }
})

app.get('/ducks/:id', cookieParser, (req, res) => {
  try {
    const { params: { id: duckId }, cookies: { id }, query: { query }  } = req
//cómo se ha guardado en params?
    const session = sessions[id]
    const { token } = session
    let name

    if (!id || !session || !token) return res.redirect('/login')

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

        return retrieveDuck(id, token, duckId)
          .then(duck => res.send(View({ body: Search({ path: '/search', name, logout: '/logout', item: duck, favPath: '/fav', favDetailPath: '/favDetail' }) })))
      })
      .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) })))
  } catch ({ message }) {
    res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message }) }))
  }
})


app.listen(port, () => console.log(`server running on port ${port}`))
