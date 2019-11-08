const express = require('express')
const { Landing, View, Register, Login, Search, Feedback } = require('./components')
const { registerUser, authenticateUser, retrieveUser, searchDucks} = require('./logic')

//const querystring = require('querystring')



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

app.post('/register', bodyParser, (req, res) => {


        const { body: {name, surname, email, password} } = req

        try {
            registerUser(name, surname, email, password)
            
            .then(res.redirect('/login'))
            .catch(res.send(View({ body: Feedback() })))
                   
        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login'}) }))
})

app.post('/login', bodyParser, (req, res) => {

        const { body: {email, password } } = req

        try {
            authenticateUser(email, password,(error, credentials) => {
                if (error) return res.send('TODO error handling')
                const { id, token } = credentials
    
                sessions[id] = token
    
                res.setHeader('set-cookie', `id=${id}`)
    
                res.redirect('/search')
            })

        } catch (error) {
            res.send(View({ body: Feedback() }))
        }
    })

app.get('/search', (req, res) => {
    try {        
        const  { cookies: { id } }  = req 

        if (!id) return res.redirect('/')

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
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req

    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')

})

app.listen(port, () => console.log(`server running on port ${port}`))

 