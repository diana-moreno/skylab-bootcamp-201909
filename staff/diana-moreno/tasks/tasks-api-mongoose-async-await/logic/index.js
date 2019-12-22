module.exports = {
    authenticateUser: require('./users/authenticate-user'),
    registerUser: require('./users/register-user'),
    retrieveUser: require('./users/retrieve-user'),
    createTask: require('./tasks/create-task'),
    listTasks: require('./tasks/list-tasks'),
    modifyTask: require('./tasks/modify-task'),
    removeTask: require('./tasks/remove-task'),
    retrieveTask: require('./tasks/retrieve-task')
}