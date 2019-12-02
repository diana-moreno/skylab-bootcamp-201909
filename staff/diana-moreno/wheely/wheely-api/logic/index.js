module.exports = {
  registerUser: require('./users/register-user'),
  authenticateUser: require('./users/authenticate-user'),
  retrieveUser: require('./users/retrieve-user'),
  deleteUser: require('./users/delete-user'),
  editUser: require('./users/edit-user'),
  listUsers: require('./users/list-users'),
  addCredits: require('./users/add-credits'),
  createPractice: require('./practices/create-practice'),
  listPractices: require('./practices/list-practices'),
  writeFeedback: require('./practices/write-feedback'),
  cancelPractice: require('./practices/cancel-practice'),
  updatePractices: require('./practices/update-practices'),
  toggleSchedule: require('./schedule/toggle-schedule'),
}

/*  retrieveSchedule: require('./schedule/retrieve-schedule')*/
/*  retrieveProgression: require('./users/retrieve-progression'),*/