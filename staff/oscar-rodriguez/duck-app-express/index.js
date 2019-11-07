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
                if (error) return res.send(error.message)
                res.redirect('/')
            })
        } catch (error) {
            res.send(error.message)
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
                if (error) return res.send(error.message)

                const {id,token} = CredentialsContainer
                sessions[id] = token

                res.setHeader('set-cookie', `id=${id}`)
                res.redirect('./search')
            })
        } catch (error) {
            res.send(error.message)
        }
    })
})

app.get('/search', (req, res)=>{
    try {
        const { headers: { cookie } } = req
        if (!cookie) return res.redirect('/')

        const [, id] = cookie.split('id=')

        const token = sessions[id]

        if (!token) return res.redirect('/')

        
        retrieveUser (id, token, (error, user) => {
            if (error) return res.send (error.message)
            
            const { name } = user
            
            const { query : { q: query }} = req

            if (!query) res.send(View({ body: Search({name: username, path: '/search'}) }))
            else {
                try {
        
                } catch (error) {}
        
            }
        })
    } catch (error) { res.send (error.message)}

})

app.get('/results', (req, res)=> {
    res.send(View({ body: Results() }))
})

app.listen(port, ()=> console.log (`>> Server running at port :${port} <<`))