/*************************** COMPOS *********************/
const {Landing, Login, Register, Search, Results, View} = require ('./components')


/************************* LOGIC ************************/
const {authenticateUser, retrieveUser, registerUser, searchDucks} = require ('./logic')

/************************* MIDDLEWARE ************************/
const bodyParser = require ('./utils/middleware/body-parser')
const cookiesParser = require ('./utils/middleware/cookies-parser')

/********************** MISC **************************/
const express = require('express')
const { argv: [, , port = 8080] } = process
const app = express()
app.use(express.static('public'))
const sessions = {}

app.get('/', (req, res)=>{
    res.send(View ({body: Landing({login: '/login', register: '/register'})}))
})

app.get('/register', (req, res)=> {
    res.send(View ({ body: Register({ path: '/register'})}))
})

app.post('/register', bodyParser, (req,res) => {
    const {body : { name, surname, email, password } } = req

    try {
        registerUser (name, surname, email, password)
            .then (() => res.redirect('/'))
            .catch (({message}) => res.send(View({body: Register({path: '/register', error: message})})))

    } catch ({message}) {
        res.send(View({body: Register({path: '/register', error: message})}))
    }
})

app.get('/login', (req, res)=> {
    res.send(View ({ body: Login({ path: '/login'})}))
})

app.post('/login', bodyParser, (req, res) => {
    const {body : {email, password}} = req
    try {
        authenticateUser (email, password)
        .then (({id,token})=> {
            sessions[id] = token
            res.setHeader('set-cookie', `id=${id}`)
            res.redirect('./search')
        })
        .catch (({message}) => res.send(View({body: Login({path: '/login', error: message})})))
            
    } catch ({message}) {
        res.send(View({body: Login({path: '/login', error: message})}))
    }
})

app.get('/search', cookiesParser, (req, res)=>{
    try {
        const { cookies: { id }, query : { query } } = req
        if (!id) return res.redirect('/')
        const token = sessions[id]
        if (!token) return res.redirect('/')

        let name
        
        retrieveUser (id, token)
            .then (user => {
                name = user.name
                    
                if (!query) return res.send(View({ body: Search({ logout: '/logout', name: name, path: '/search'}) }))
                return searchDucks(id , token, query) 
                    .then (ducks => res.send(View({body: Search ({ logout: '/logout', name: name, path: '/search', results: ducks, favPath: '/fav' })})))
            })
            .catch (({message}) => res.send(View({body: Search ({ logout: '/logout', name: name, path: '/search', error: message })})))          
    } catch ({message}) { 
        res.send(View({body: Search ({ logout: '/logout', name: name, path: '/search', error: message })}))
    }

})

app.get('/logout', cookiesParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    
    const { cookies: { id } } = req
    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.get('/results', (req, res)=> {
    res.send(View({ body: Results() }))
})

app.listen(port, ()=> console.log (`>> Server running at port :${port} <<`))