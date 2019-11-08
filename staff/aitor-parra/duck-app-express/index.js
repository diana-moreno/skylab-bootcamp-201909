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
const searchDucks = require('./logic/search-ducks')


const { argv: [, , port = 8080] } = process

const app = express()

const sessions = {}

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
                else {

                    const { id, token } = credentials

                    sessions[id] = token

                    res.setHeader('set-cookie', `id=${id}`)

                    res.redirect('/search')

                }

            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })
})

 
app.get('/search', (req, res) => {
    try {

        const { headers: { cookie } } = req 

        if (!cookie) return res.redirect('/')

        const [, id] = cookie.split('id=')

        const token = sessions[id]

        if (!token) return res.redirect('/')

        retrieveUser(id, token, (error, user) => {
            if(error) return res.send(View({ body: Feedback() }))

            const { name } = user

            const { query: { q: query } } = req

            if(!error) res.send(View({ body: Search({ path: '/search', name, logout: '/logout' }) }))

            else { 
                try {
                    searchDucks(id, token, query, (error, ducks) => {
                        if(error) return res.send('gestionar error')

                        console.log(ducks)

                        res.send(View({ body: `${ Search({ path: 'search', query, name, logout: '/logout' })}` }))
                        
                    })  
                } catch (error) {

                }

            } 


        })

    } catch (error) {
        // TODO handling
        res.send('un gran error')
    }

})

app.post('/logout', (req, res) => {
    let content = ''

    req.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    res.redirect('/')
})


app.listen(port, () => console.log(`server running on port ${port}`))

 