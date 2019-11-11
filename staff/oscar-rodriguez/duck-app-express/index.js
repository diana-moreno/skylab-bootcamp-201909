/*************************** COMPOS *********************/
const { Landing, Login, Register, Search, Detail, View, UserPage } = require('./components')


/************************* LOGIC ************************/
const { authenticateUser, retrieveUser, registerUser, searchDucks, retrieveDuck, toggleFavDuck, retrieveFavDucks } = require('./logic')

/************************* MIDDLEWARE ************************/
const bodyParser = require('./utils/middleware/body-parser')
const cookiesParser = require('./utils/middleware/cookies-parser')

/********************** MISC **************************/
const express = require('express')
const { argv: [, , port = 8080] } = process
const app = express()
app.use(express.static('public'))
const sessions = {}

app.get('/', (req, res) => {
    res.send(View({ body: Landing({ login: '/login', register: '/register' }) }))
})

app.get('/register', (req, res) => {
    res.send(View({ body: Register({ path: '/register' }) }))
})

app.post('/register', bodyParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        registerUser(name, surname, email, password)
            .then(() => res.redirect('/'))
            .catch(({ message }) => res.send(View({ body: Register({ path: '/register', error: message }) })))

    } catch ({ message }) {
        res.send(View({ body: Register({ path: '/register', error: message }) }))
    }
})

app.get('/login', (req, res) => {
    res.send(View({ body: Login({ path: '/login' }) }))
})

app.post('/login', bodyParser, (req, res) => {
    const { body: { email, password } } = req
    try {
        authenticateUser(email, password)
            .then(({ id, token }) => {
                sessions[id] = { token }
                res.setHeader('set-cookie', `id=${id}`)
                res.redirect('./search')
            })
            .catch(({ message }) => res.send(View({ body: Login({ path: '/login', error: message }) })))

    } catch ({ message }) {
        res.send(View({ body: Login({ path: '/login', error: message }) }))
    }
})

app.get('/search', cookiesParser, (req, res) => {
    try {
        const { cookies: { id }, query: { query } } = req
        if (!id) return res.redirect('/')

        const session = sessions[id]
        if (!session) return res.redirect('/')

        const { token } = session
        if (!token) return res.redirect('/')

        let name

        retrieveUser(id, token)
            .then(user => {
                name = user.name

                if (!query) return res.send(View({ body: Search({ logout: '/logout', name, query, path: '/search' }) }))
                session.query = query
                session.view = 'search'
                return searchDucks(id, token, query)
                    .then(ducks => res.send(View({ body: Search({ logout: '/logout', name, query, path: '/search', results: ducks, favPath: '/fav', detailPath: '/ducks' }) })))
            })
            .catch(({ message }) => res.send(View({ body: Search({ logout: '/logout', name, query, path: '/search', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ logout: '/logout', name, query, path: '/search', error: message }) }))
    }

})

app.get('/logout', cookiesParser, (req, res) => {
    res.setHeader('set-cookie', 'id=""; expires=Thu, 01 Jan 1970 00:00:00 GMT')

    const { cookies: { id } } = req
    if (!id) return res.redirect('/')

    delete sessions[id]

    res.redirect('/')
})

app.post('/fav', cookiesParser, bodyParser, (req, res) => {
    try {
        const { cookies: { id }, body: { id: duckId } } = req
        if (!id) return res.redirect('/')

        const session = sessions[id]
        if (!session) return res.redirect('/')

        const { query, token, view } = session
        if (!token) return res.redirect('/')

        toggleFavDuck(id, token, duckId)
            .then(() => {
                let backPath
                switch (view) {
                    case 'detail': backPath = `/ducks/${duckId}`; break;
                    case 'search': backPath = `/search?query=${query}`; break;
                    case 'userpage': backPath = `/userpage`; break;
                    default: backPath = '/'
                }
                res.redirect(backPath)
            })
            .catch(({ message }) => res.send(View({ body: Search({ logout: '/logout', query, path: '/search', error: message }) })))
    } catch ({ message }) {
        res.send(View({ body: Search({ logout: '/logout', query, path: '/search', error: message }) }))
    }
})


app.get('/ducks/:id', cookiesParser, (req, res) => {

    try {
        const { params: { id: duckId }, cookies: { id } } = req
        if (!id) return res.redirect('/')

        const session = sessions[id]
        if (!session) return res.redirect('/')

        const { token, query } = session
        if (!token) return res.redirect('/')

        
        retrieveDuck(id, token, duckId)
        .then(duck => {
                let backPath = session.view === 'search' ? `/search?query=${query}` : '/userpage'
                session.view = 'detail'
                res.send(View({ body: Detail({ duck, goBack: backPath, favPath: '/fav' }) }))
            })
            .catch(({ message }) => {
                res.send(View({ body: Search({ logout: '/logout', query, path: '/search', error: message }) }))
            })

    } catch ({ message }) {
        res.send(View({ body: Search({ logout: '/logout', query, path: '/search', error: message }) }))
    }
})

app.get('/userpage', cookiesParser, (req, res) => {

    try {
        const { cookies: { id } } = req
        if (!id) return res.redirect('/')

        const session = sessions[id]
        if (!session) return res.redirect('/')

        const { token } = session
        if (!token) return res.redirect('/')

        retrieveUser(id, token)
            .then(user => {
                session.view = 'userpage'
                return retrieveFavDucks(id, token)
                    .then(ducks => res.send(View({ body: UserPage({ logout: '/logout', user, results: ducks, favPath: '/fav', detailPath: '/ducks', goBack: '/search' }) })))
            })
            .catch(({ message }) => {
                res.send(View({ body: Search({ logout: '/logout', path: '/search', error: message }) }))
            })
    } catch ({ message }) {
        res.send(View({ body: Search({ logout: '/logout', path: '/search', error: message }) }))
    }

})

app.listen(port, () => console.log(`>> Server running at port :${port} <<`))