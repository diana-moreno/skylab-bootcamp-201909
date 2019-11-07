const express = require('express')
const Landing = require('./components/landing')
const View = require('./components/view')
const Register = require('./components/register')
const Login = require('./components/login')
const Search = require('./components/search')
const Feedback = require('./components/feedback')
const querystring = require('querystring')
const registerUser = require('./logic/register-user')
const authenticateUser = require('./logic/authenticate-user')
const retrieveUser = require('./logic/retrieve-user')


const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ register: '/register', login: '/login' }) })) // TODO
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', (req, res) => {
    let content = ''

    req.on('data', chunk => { content += chunk })

    req.on('end', () => {

        const { name, surname, email, password } = querystring.parse(content)

        try {
            registerUser(name, surname, email, password, error => {
                if (error) { res.send(View({ body: Feedback() })) }
                else res.redirect('/login') //res.send(View({ body: Login() }))
            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login'}) }))
})

app.post('/login', (req, res) => {
    let content = ''

    req.on('data', chunk => { content += chunk })

    req.on('end', () => {
        const { email, password } = querystring.parse(content)

        try {
            authenticateUser(email, password, (error, credentials) => {
                if (error) return res.send(Feedback())
                else res.redirect('NADA')
            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })
})

 
app.get('/search', (req, res) => {
    res.send(View({ body: Search({ path: '/search' })}))
})

app.post('search', (req, res) => {
    let content = ''

    req.on('data', chunk => { content += chunk })

    req.on('end', () => {


        
    })
})


app.listen(port, () => console.log(`server running on port ${port}`))

 