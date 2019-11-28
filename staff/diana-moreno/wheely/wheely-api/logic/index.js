module.exports = {
    authenticateUser: require('./authenticate-user'),
    registerUser: require('./register-user'),
    retrieveUser: require('./retrieve-user'),
    deleteUser: require('./delete-user'),
    editUser: require('./edit-user'),
    bookPractice: require('./book-practice'),
    retrievePendingPractices: require('./retrieve-pending-practices'),
    retrieveDonePractices: require('./retrieve-done-practices'),
    retrieveCancelledPractices: require('./retrieve-cancelled-practices')
/*
    createTask: require('./create-task'),
    listTasks: require('./list-tasks'),
    modifyTask: require('./modify-task'),
    removeTask: require('./remove-task')
*/
}
