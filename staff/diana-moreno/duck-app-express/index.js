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

let credentials

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
      authenticateUser(username, password, (error, _credentials) => {
        if (error) return res.send(error.message)

        credentials = _credentials
        res.redirect('/search')
      })
    } catch (error) {
      res.send(error.message)
    }
  })
})

app.get('/search', (req, res) => {

  // console.log(req)
  const { query: { query: query } } = req

  try {
    const { id, token } = credentials

    retrieveUser(id, token, (error, userData) => {
      if (error) return res.send(error.message)
      const { name } = userData

      if (!query) res.send(View({ body: Search({ path: '/search', name }) }))
      else {
        try {
          searchDucks(id, token, query, (error, ducks) => {
            if (error) return res.send(error.message)

            console.log(ducks)

            res.send(View({ body: `${Search({ path: '/search', query, name })} ` })) // TODO ${Results({items: ducks})}
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



app.listen(port, () => console.log(`server running on port ${port}`))