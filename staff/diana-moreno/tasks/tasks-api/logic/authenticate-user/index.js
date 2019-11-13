const validate = require('../../utils/validate')
const users = require('../../data/users')() // la instancia solo se habia llamado una vez
const { CredentialsError } = require('../../utils/errors')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return new Promise((resolve, reject) => {
        const user = users.data.find(user => user.username === username && user.password === password)

        // 404
        if (!user) return reject(new CredentialsError('wrong credentials'))

        user.lastAccess = new Date

        users.persist()
            .then(() => resolve(user.id)) // resuelve devolviendo el id
            .catch(reject) // pasa a index.js general // 500
    })
}