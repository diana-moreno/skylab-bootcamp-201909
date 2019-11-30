module.exports = {
    registerUser: require('.users/register-user'),
    authenticateUser: require('.users/authenticate-user'),
    retrieveUser: require('.users/retrieve-user'),
    deleteUser: require('.users/delete-user'),
    editUser: require('.users/edit-user'),
    listUsers: require('.users/list-users'),
    retrieveProgression: require('.users/retrieve-progression'),
    toogleSchedule: require('.users/toogle-schedule'),
    createPractice: require('.practices/create-practice'),
    retrievePractices: require('.practices/retrieve-practices'),
    writeFeedback: require('.practices/write-feedback'),
    cancelPractice: require('.practices/cancelPractice'),
    updatePractices: require('.practices/update-practices')
}
