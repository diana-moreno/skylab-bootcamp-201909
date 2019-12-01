module.exports = {
  registerUser: require('./users/register-user'),
  authenticateUser: require('./users/authenticate-user'),
  retrieveUser: require('./users/retrieve-user'),
  deleteUser: require('./users/delete-user'),
  editUser: require('./users/edit-user'),
  listUsers: require('./users/list-users'),
  retrieveProgression: require('./practices/retrieve-progression'),
  createPractice: require('./practices/create-practice'),
  retrievePractices: require('./practices/retrieve-practices'),
  writeFeedback: require('./practices/write-feedback'),
  cancelPractice: require('./practices/cancel-practice'),
  updatePractices: require('./practices/update-practices'),
  toogleSchedule: require('./schedule/toogle-schedule'),
  retrieveAvailableSchedule: require('./schedule/retrieve-available-schedule')
}
