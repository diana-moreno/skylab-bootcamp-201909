const { model } = require('mongoose')
const { user, practice } = require('./schemas')

module.exports = {
    User: model('User', user),
    Practice: model('Practice', practice)
}