describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Alexandra T',
      username: 'alexat',
      password: 'alexatest'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('alexat')
      cy.get('#password').type('alexatest')
      cy.get('#login-btn').click()
  
      cy.get('.log-info').contains('Alexandra T logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('alexat')
      cy.get('#password').type('alexatest')
      cy.get('#login-btn').click()
  
      cy.get('.error-message').contains('Login failed')
      cy.get('html').should('not.contain', 'Alexandra T logged-in')
      cy.contains('Logout').click()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('alexat')
      cy.get('#password').type('alexatest')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function() {
      cy.get('.add-blog-btn').click()
      cy.get('#blog-title-input').type('A blog about cypress')
      cy.get('#blog-author-input').type('Cypress')
      cy.get('#blog-url-input').type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.contains('Save').click()
      cy.get('.blog-container').contains('A blog about cypress')
    })

    it('A user can like a blog', function() {
      cy.get('.add-blog-btn').click()
      cy.get('#blog-title-input').type('A blog about cypress')
      cy.get('#blog-author-input').type('Cypress')
      cy.get('#blog-url-input').type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.contains('Save').click()

      cy.contains('View').click()
      cy.get('.like-btn').click()
      cy.get('.upvotes-count').contains('1')
    })

    it('A user can delete a blog', function() {
      cy.get('.add-blog-btn').click()
      cy.get('#blog-title-input').type('A blog about cypress')
      cy.get('#blog-author-input').type('Cypress')
      cy.get('#blog-url-input').type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.contains('Save').click()

      cy.contains('View').click()
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'A blog about cypress')
    })
  })

  describe('When multiple blogs are added', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('alexat')
      cy.get('#password').type('alexatest')
      cy.get('#login-btn').click()
    })

    it('blogs are ordered based on the amount of likes', function() {
      cy.get('.add-blog-btn').click()
      cy.get('#blog-title-input').type('A blog about cypress')
      cy.get('#blog-author-input').type('Cypress')
      cy.get('#blog-url-input').type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.contains('Save').click()

      cy.get('#blog-title-input').type('Second test blog')
      cy.get('#blog-author-input').type('Alexa T')
      cy.get('#blog-url-input').type('test blog')
      cy.get('#blog-likes-input').type('0')
      cy.contains('Save').click()

      cy.get('.blogs-container').children().eq(1).contains('A blog about cypress')

      const $secondBlog = cy.contains('Second test blog').parent().parent()
      $secondBlog.contains('View').click()
      const $fullSecondBlog = cy.contains('Second test blog').parent().parent()
      $fullSecondBlog.get('.like-btn').last().click()

      cy.get('.blogs-container').children().eq(1).contains('Second test blog')
    })
  })
})