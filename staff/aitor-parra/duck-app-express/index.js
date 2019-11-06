const express = require('express')
const Landing = require('./components/landing')
const View = require('./components/view')
const Register = require('./components/register')
const Login = require('./components/login')
const Feedback = require('./components/feedback')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const retrieveUser = require('./logic/retrieve-user')
const authenticateUser = require('./logic/authenticate-user')


const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register' }), body: Login({ login: '/login' }) })) // TODO
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register() }))
})

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => { content += chunk })

    req.on('end', () => {

        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, (error => {
                if (error) { res.send(View({ body: Feedback() })) }
                else { res.send(View({ body: Login() })) }
            }))

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login() }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => { content += chunk })

    req.on('end', () => {
        const { email, password } = querystring.parse(content)

        try {
            retrieveUser(email, password, (error => {
                if (error) res.send(Feedback())
                else authenticateUser(id, token, (error) => {
                    if (error) res.send(Feedback())
                    else res.send('login success!')
                })
            }))

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    }
    )
})


app.listen(port, () => console.log(`server running on port ${port}`))

