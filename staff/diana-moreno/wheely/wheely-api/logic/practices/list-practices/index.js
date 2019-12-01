const { validate, errors: { NotFoundError, ConflictError } } = require('wheely-utils')
const { ObjectId, models: { User, Practice, Instructor } } = require('wheely-data')

module.exports = function(userId, query) {
  // sincronous validate
  validate.string(userId)
  validate.string.notVoid('userId', userId)
  if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

  if(query) {
    validate.string(query)
    validate.string.notVoid('query', query)
  }

  return (async () => {
    //check if the user exists
    let student = await User.findOne({ _id: userId, role: 'student' })
    let instructor = await User.findOne({ _id: userId, role: 'instructor' })
    let admin = await User.findOne({ _id: userId, role: 'admin' })
    if (admin) {
      throw new ConflictError(`admin has no practices`)
    }
    if (!student && !instructor && !admin) {
      throw new NotFoundError(`user with id ${userId} not found`)
    }

    let param
    if (instructor) {
      param = ['feedback', 'done', 'pending'].includes(query)
        ? { "status": query }
        : {}
      param = { "instructorId": ObjectId(userId), ...param }
    } else if (student) {
      const mapping = {
        'pending': { "status": 'pending' },
        'progression': { "status": 'done' },
        'done': { "status": {$in: ['done', 'feedback']}},
        [undefined]: {},
      }
      param = mapping[query]
      param = { "studentId": ObjectId(userId), ...param }
    } else {
      throw new NotFoundError(
      `no results found for user with id ${userId} and query ${query}`)
    }
    const practices = await Practice.find(param)
        .populate('instructorId')
        .populate('studentId')
        .lean()
    return practices

    // return different practices array depending on the query selected by the user (permission control)
    // if (instructor && query === 'feedback') {
    //   practices = await Practice
    //     .find({ "instructorId": ObjectId(userId), "status": 'feedback' })
    // } else if (instructor && query === undefined) {
    //   practices = await Practice
    //     .find({ "instructorId": ObjectId(userId) })
    // } else if (instructor && query === 'pending') {
    //   practices = await Practice
    //     .find({ "instructorId": ObjectId(userId), "status": 'pending' })
    // } else if(instructor && query === 'done') {
    //   practices = await Practice
    //     .find({ "instructorId": ObjectId(userId), "status": 'done' })
    // } else if(student && query === 'pending') {
    //   practices = await Practice
    //     .find({ "studentId": ObjectId(userId), "status": 'pending' })
    // } else if(student && query === 'done') {
    //   practices = await Practice
    //     .find({ "studentId": ObjectId(userId), "status": {$in: ['done', 'feedback']} })
    // } else if(student && query === 'progression') {
    //   // find all practices with written feedback
    //   practices = await Practice
    //     .find({ "studentId": ObjectId(userId), "status": 'done' })
    // } else if(student && query === undefined) {
    //   practices = await Practice
    //     .find({ "studentId": ObjectId(userId) })
    // } else {
    // throw new NotFoundError(
    //   `no results found for user with id ${userId} and query ${query}`)
    // }
    // return practices
    //     .populate('instructorId')
    //     .populate('studentId')
    //     .lean()
  })()
}
