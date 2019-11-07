const express = require('express')
const View = require('./components/view')
const Login = require('./components/login')
const Register = require('./components/register')
const RegisterSucess = require('./components/register-success')
const Search = require('./components/search')

const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login', register: '/register' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register( { login: '/login'}) }))
})

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) res.send('error chungo!')
                else res.send(View({ body: RegisterSucess( { login: '/login'} ) }))
            })
        } catch(error) {
            // TODO handling
        }
    })
})

app.get('/search', (req, res) => {
    res.send(View({ body: Search() }))
})

app.post('/login', (req, res) => {
    let content = ''
    req.on('data', chunk => content += chunk)

    req.on('end', () => {
        const { username, password } = querystring.parse(content)

        try {
            authenticateUser(username, password, (error, credentials) => {
                if (error) return res.send('error chungo!') // TODO
                const { id, token } = credentials

                //res.redirect('/search')
                retrieveUser(id, token, (error, userData) => {
                    res.send(View({ body: Search({ name: userData.name }) }))
                })
            })
        } catch (error) {
            // TODO handling
        }
    })
})



app.listen(port, () => console.log(`server running on port ${port}`))

