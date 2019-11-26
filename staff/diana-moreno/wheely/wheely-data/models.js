const { model } = require('mongoose')
const { user, practice, student, instructor } = require('./schemas')

module.exports = {
    User: model('User', user),
    Student: model('Student', student),
    Instructor: model('Instructor', instructor),
/*    Admin: model('Admin', admin),*/
    Practice: model('Practice', practice),
}