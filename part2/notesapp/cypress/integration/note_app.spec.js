/* eslint-disable no-undef */
describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app Full Stack Open MOOC, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('wrong credentials')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('show all').click()
      cy.contains('a note created by cypress')
    })

    describe('and sever notes exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('first note')
        cy.contains('save').click()

        cy.contains('new note').click()
        cy.get('input').type('second note')
        cy.contains('save').click()

        cy.contains('new note').click()
        cy.get('input').type('third note')
        cy.contains('save').click()

        cy.contains('show all').click()
      })

      it('can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})