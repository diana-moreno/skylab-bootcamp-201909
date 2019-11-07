/********************* UTILS ************************/
const express = require('express')
const querystring = require('querystring')

/*************************** COMPOS *********************/
const View = require ('./components/view')
const Landing = require('./components/landing')
const Register = require('./components/register')
const Login = require('./components/login')
const Feedback = require('./components/feedback')
const Results = require('./components/results')
const Search = require ('./components/search')

/************************* LOGIC ************************/
const registerUser = require ('./logic/register-user')
const authenticateUser = require ('./logic/authenticate-user')
const retrieveUser = require ('./logic/retrieve-user')
const search = require ('./logic/search-ducks')

/********************** MISC **************************/
const { argv: [, , port = 8080] } = process
const app = express()
let id, token, username

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.send(View ({body: Landing({login: '/login', register: '/register'})}))
})

app.get('/register', (req, res)=> {
    res.send(View ({ body: Register({ path: '/register'})}))
})

app.post('/register', (req,res)=> {
    let content = ''
    req.on('data', chunk => { content += chunk})

    req.on('end', () => {
        const {name, surname, email, password} = querystring.parse(content)

        try {
            registerUser (name, surname, email, password, error => {
                if (error) return res.send(error)
                res.redirect('/')
            })
        } catch (error) {
            res.send(error)
        }
    })
})

app.get('/login', (req, res)=> {
    res.send(View ({ body: Login({ path: '/login'})}))
})

app.post('/login', (req,res)=> {
    let content = ''
    req.on('data', chunk => { content += chunk})

    req.on('end', () => {
        const {email, password} = querystring.parse(content)

        try {
            authenticateUser (email, password, (error, result) => {
                if (error) return res.send(error)
                id = result.id
                token = result.token
                try {
                    retrieveUser (id, token, (error,result)=>{
                        username = result.data.name
                        res.redirect('./search')
                    })
                } catch (error) {res.send(error)}
            })
        } catch (error) {
            res.send(error)
        }
    })
})

app.get('/search', (req, res)=>{

    const { query : { q }} = req
    if (!q) res.send(View({ body: Search({name: username, path: '/search'}) }))
    else 
})

app.get('/results', (req, res)=> {
    res.send(View({ body: Results() }))
})

app.listen(port, ()=> console.log (`>> Server running at port :${port} <<`))