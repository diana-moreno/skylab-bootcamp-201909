const { expect } = require('chai')
const call = require ('../../helpers/call')
const authenticateUser = require ('../authenticate-user')

describe('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(done => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        debugger

        call('POST', 'https://skylabcoders.herokuapp.com/api/user', undefined, { name, surname, username: email, password }, result => {
            if (result.error) done(new Error(result.error))
            else done()
        })
    })

    it('should succeed on correct credentials', done => {
        authenticateUser(email, password, (error, response) => {
            expect(error).not.to.exist

            expect(response).to.exist

            const { id, token } = response

            expect(id).to.exist
            expect(typeof id).to.equal('string')
            expect(id.length).to.be.greaterThan(0)

            expect(token).to.exist
            expect(typeof token).to.equal('string')
            expect(token.length).to.be.greaterThan(0)

            done()
        })
    })

    it('should fail on wrong credentials', done => {
        authenticateUser(`wrong${email}`, password, (error, response) => {
            expect(error).to.exist
            expect(response).not.to.exist
            done()
        })
    })
})