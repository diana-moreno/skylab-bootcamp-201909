const express = require('express')
const { View, Login, Register, RegisterSuccess, Search, ResultsItem, Result, Detail } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks, retrieveDuck, toggleFavDuck, retrieveFavDucks } = require('./logic')
const { bodyParser, cookieParser } = require('./utils/middlewares')
const arrayShuffle = require('./utils/array-shuffle')

const { argv: [, , port = 8080] } = process

const sessions = {}

let query, name
//let random = false

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

  try {
    authenticateUser(username, password)
      .then(credentials => {
        random = true
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

app.post('/search', (req, res) => {
  res.redirect('/search')
})


app.get('/search', cookieParser, (req, res) => {
  try {
    const { cookies: { id } } = req
    const session = sessions[id]
    session.lastPath = '/search'
    const { token, lastPath } = session
    // se guarda la query en la req para mantenerla a volver para atrás en el detalle.
    if(!req.query.query && session.query) req.query.query = session.query
    let { query: { query } } = req

    if (!session || !token || !id) return res.redirect('/login')
    let name

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

        //if(!query) query = ''
        session.query = query

        return searchDucks(id, token, query) // return es necesario si queremos ahorrarnos un catch y dejar que se recoja el valor en el siguiente catch.

/*
No se pueden mostrar random con favoritos!!! al refrescar la pantalla, se pierden!!
         .then(ducks => query === '' && random ? arrayShuffle(ducks).splice(0, 8) : ducks)
          .then(ducks => {
            random = false // solo muestra patos random cuando se logea, nunca  más
            return ducks
          })*/

          .then(ducks => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', results: ducks, favPath: '/fav', detailPath: '/ducks', favoritePath: '/favorites' }) })))
      })
      .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message, favoritePath: '/favorites' }) })))
  } catch ({ message }) {
    res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message, favoritePath: '/favorites' }) }))
  }
})


app.post('/logout', cookieParser, (req, res) => {
  res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

  const { cookies: { id } } = req
  if (!id) return res.redirect('/login')
  delete sessions[id]

  res.redirect('/login')
})

app.get('/favorites', (req, res) => {
  res.redirect('/favorites')
})

app.post('/favorites', cookieParser, (req, res) => {
  try {
    const { cookies: { id } } = req
    const session = sessions[id]
    session.lastPath = '/favorites'
    const { token, lastPath } = session

    if (!id || !session || !token) return res.redirect('/login')

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

      return retrieveFavDucks(id, token)
        .then(ducks => res.send(View({ body: Search({ path: '/search', name, logout: '/logout', favorites: ducks, detailPath: '/ducks', favPath: '/favFavorites', favDetailPath: '/favDetail', lastPath, favoritePath: '/favorites' }) })))
      })
  } catch {

  }
})


app.post('/fav', cookieParser, bodyParser, (req, res) => {
  try {
    const { cookies: { id }, body: { id: duckId } } = req
    const session = sessions[id]
    const { token, query } = session

    if (!id || !session || !token) return res.redirect('/login')

    toggleFavDuck(id, token, duckId)
        .then(() => {
          query && res.redirect(`/search?q=${query}`)
        })
        .catch(({ message }) => {
            res.send('TODO error handling')
        })

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

  } catch (error) {
    res.send('kaput')
  }
})

app.post('/favFavorites', cookieParser, bodyParser, (req, res) => {
  try {
    const { cookies: { id }, body: { id: duckId } } = req
    const session = sessions[id]
    const { token, query } = session

    if (!id || !session || !token) return res.redirect('/login')

    toggleFavDuck(id, token, duckId)
        .then(() => res.redirect(`/favorites`))
        .catch(({ message }) => {
            res.send('TODO error handling')
        })

  } catch (error) {
    res.send('kaput')
  }
})

app.get('/ducks/:id', cookieParser, (req, res) => {
  try {
    const { params: { id: duckId }, cookies: { id }, query: { query }  } = req
//cómo se ha guardado en params?
    const session = sessions[id]
    const { token, lastPath } = session
    let name

    if (!id || !session || !token) return res.redirect('/login')

    retrieveUser(id, token)
      .then(userData => {
        name = userData.name

        return retrieveDuck(id, token, duckId)
          .then(duck => res.send(View({ body: Search({ path: '/search', name, logout: '/logout', item: duck, favPath: '/fav', favDetailPath: '/favDetail', lastPath, favoritePath: '/favorites' }) })))
      })
      .catch(({ message }) => res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message, favoritePath: '/favorites' }) })))
  } catch ({ message }) {
    res.send(View({ body: Search({ path: '/search', query, name, logout: '/logout', error: message, favoritePath: '/favorites' }) }))
  }
})


app.listen(port, () => console.log(`server running on port ${port}`))
