/// <reference types="cypress" />

var Chance = require('chance');
var Chance = new Chance ();

describe('Login e2e Test', () => {

  beforeEach(() => {
    cy.visit('/login')

  });
  it('Quando eu informar os dados corretos, o login deve ser efetuado', () => {
    cy.get('input[type=email]').type('matheus.santos.ciencia@gmail.com');
    cy.get('input[type=password]').type('880112');
    cy.get('button[type=submit]').click();
  });

it('Quando eu informar os dados incorretos, o login não deve ser efetuado', () => {
  cy.get('input[type=email]').type(Chance.email());
  cy.get('input[type=password]').type(chance.last());
  cy.get('button[type=submit]').click();
  cy.contains('email or password is invalid').should('be.visible')
});

it('Quando eu informar somente o email, o login não deve ser efetuado', () => {
  cy.get('input[type=email]').type(Chance.email());
  cy.get('button[type=submit]').click();
  cy.contains("password can't be blank").should('be.visible')
});

it('Quando eu informar somente a senha, o login não deve ser efetuado', () => {
  cy.get('input[type=password]').type(chance.last());
  cy.get('button[type=submit]').click();
  cy.contains("email can't be blank").should('be.visible')
});

});