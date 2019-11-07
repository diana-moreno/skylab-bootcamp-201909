const express = require('express')
const querystring = require('querystring')

const View = require('./components/view')
const Login = require('./components/login')
const Register = require('./components/register')
const RegisterSucess = require('./components/register-success')
const Search = require('./components/search')

const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')
const searchDucks = require('./logic/search-ducks')

const { argv: [, , port = 8080] } = process

const sessions = {}

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
  res.send(View({ body: Login({ path: '/login', register: '/register' }) }))
})

app.get('/register', (req, res) => {
  res.send(View({ body: Register({ login: '/login' }) }))
})

app.post('/register', (req, res) => {
  let content = ''

  req.on('data', chunk => content += chunk)

  req.on('end', () => {
    const { name, surname, email, password } = querystring.parse(content)

    try {
      registerUser(name, surname, email, password, error => {
        if (error) res.send(error.message)
        else res.send(View({ body: RegisterSucess({ login: '/login' }) }))
      })
    } catch (error) {
      res.send(error.message)
    }
  })
})

app.post('/login', (req, res) => {
  let content = ''
  req.on('data', chunk => content += chunk)

  req.on('end', () => {
    const { username, password } = querystring.parse(content)

    try {
      authenticateUser(username, password, (error, credentials) => {
        if (error) return res.send(error.message)

        const { id, token } = credentials
        sessions[id] = token
        res.setHeader('set-cookie', `id=${id}`)
        res.redirect('/search')
      })
    } catch (error) {
      res.send(error.message)
    }
  })
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