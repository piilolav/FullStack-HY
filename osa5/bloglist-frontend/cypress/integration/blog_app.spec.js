describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
      name: 'Testin Maniac',
      username: 'testdude',
      password: '1234shhh'
    }
    cy.request('POST','http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testdude')
      cy.get('#password').type('1234shhh')
      cy.get('#login-button').click()

      cy.contains('Testin Maniac logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testdude')
      cy.get('#password').type('I_am_wrong_pass')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testdude')
      cy.get('#password').type('1234shhh')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('This is me testing')
      cy.get('#author').type('Ron Niceguy')
      cy.get('#url').type('http://nomorenicenanny.com')
      cy.get('#create-button').click()

      cy.get('.success').contains('Blog This is me testing was added')
      cy.contains('This is me testing by: Ron Niceguy')
    })

    it('A blog can be liked', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('Another Blog')
      cy.get('#author').type('Ron Niceguy')
      cy.get('#url').type('http://nomorenicenanny.com')
      cy.get('#create-button').click()

      cy.contains('Another Blog by: Ron Niceguy')
        .contains('view')
        .click()
        .get('#like-button').click()

      cy.contains('1')

    })

    it('A blog can be removed by creator', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('Not here for long')
      cy.get('#author').type('Ron Niceguy')
      cy.get('#url').type('http://nomorenicenanny.com')
      cy.get('#create-button').click()

      cy.contains('Not here for long by: Ron Niceguy')
        .contains('view')
        .click()
        .get('#remove').click()

      cy.get('html').should('not.contain', 'Not here for long by: Ron Niceguy')

    })
  })



  describe('Blogs are ordered right way', function() {
    beforeEach(function() {
      cy.login({ username: 'testdude', password: '1234shhh' })
      cy.createBlog({ author: 'Ron Niceguy', title: 'testing', url: 'http://ronNice.com./testing' })
      cy.createBlog({ author: 'Ron Niceguy', title: 'testinglikecrazy', url: 'http://ronNice.com./testinglikecrazy' })
      cy.createBlog({ author: 'Ron Niceguy', title: 'nomoretesting', url: 'http://ronNice.com./nomoretesting' })

      cy.contains('testing').parent().parent().as('blog1')
      cy.contains('testinglikecrazy').parent().parent().as('blog2')
      cy.contains('nomoretesting').parent().parent().as('blog3')
    })


    it('Blogs are ordered by likes', function() {
    //tehty support komennot auttamaan.
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click(),

      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like1').click()
      cy.wait(300)
      cy.get('@like1').click()
      cy.wait(300)
      cy.get('@like1').click()
      cy.wait(300)
      cy.get('@like1').click()
      cy.wait(300)
      cy.get('@like3').click()
      cy.wait(300)
      cy.get('@like3').click()
      cy.wait(300)

      cy.get('.blogs').then(blog => {
        cy.wrap(blog[0]).contains('4')
        cy.wrap(blog[1]).contains('2')
        cy.wrap(blog[2]).contains('0')
      })


    })

  })


})


