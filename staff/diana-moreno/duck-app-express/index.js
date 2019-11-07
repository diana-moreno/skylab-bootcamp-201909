const express = require('express')
const View = require('./components/view')
const Login = require('./components/login')
const Register = require('./components/register')
const RegisterSucess = require('./components/register-success')

const querystring = require('querystring')
const registerUser = require('./logic/register-user')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ register: '/register' }) }))
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

/*
        ${RegisterSucess()}*/

app.listen(port, () => console.log(`server running on port ${port}`))

