/// <reference types="cypress" />

describe('Login Api Test', () => {
  
  it('login com sucesso', () => {
    cy.request({
      url: 'https://api.realworld.io/api/users/login',
      method: 'POST',
      status: 200,
      body: {
        user: {
          email: 'matheus.santos.ciencia@gmail.com',
          password: '880112'
        }
      }
  
    }).then(response => {
      console.log(response)
      expect(response.status).to.eq(200)
      
    })
   
  })


  it('login com email ou senha errado', () => {
    cy.request({
      url: 'https://api.realworld.io/api/users/login',
      failOnStatusCode: false,
      method: 'POST',
      status: 403,
      statusText: 'Forbidden',
      body: {
        user: {
          email: 'matheus.santos.cienciaa@gmail.com',
          password: '880112'
        }
      }
  
    }).then(response => {
      console.log(response)
      expect(response.status).to.eq(403)
      expect(response.body.errors["email or password"][0]).to.have.eq('is invalid')

    })
  })
  it('Quando eu informo o login com somente o email, entao o login nao deve ser efetuado', () => {
       
    cy.request({
      url: 'https://api.realworld.io/api/users/login',
      failOnStatusCode: false,
      method: 'POST',
      status: 500,
      body:{
        "errors": {
          "password": [
            "can't be blank"
          ]
        }
      }
  
    }).then(response => {
      console.log(response)
      expect(response.status).to.eq(500)
      expect(response.body).to.have.eq("Cannot read properties of undefined (reading 'email')")
      

    })

   });


   it('Quando eu informo o login com somente o a senha, entao o login nao deve ser efetuado', () => {
    cy.request({
      url: 'https://api.realworld.io/api/users/login',
      failOnStatusCode: false,
      method: 'POST',
      status: 500,
      statusText: 'Forbidden',
      body:{
        "errors": {
          "email": [
            "can't be blank"
          ]
        }
      }
  
    }).then(response => {
      console.log(response)
      expect(response.status).to.eq(500)
      expect(response.body).to.have.eq("Cannot read properties of undefined (reading 'email')")
      expect(response.statusText).to.have.eq("Internal Server Error")

    })


  });


});
