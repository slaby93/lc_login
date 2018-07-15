/* globals cy */
describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#email').as('emailInput');
    cy.get('#password').as('passwordInput');
    cy.get('#rememberMe').as('rememberMeCheckbox');
    cy.contains('Sign In').as('submitButton');
  });

  it('is logging as proper user with remember me checked reloads and loggs out', () => {
    cy.get('@submitButton').should('be.disabled');
    cy.get('@emailInput').type('test@test.pl');
    cy.get('@passwordInput').type('Password1');
    cy.get('@rememberMeCheckbox').check();
    cy.get('@submitButton').should('be.enabled');
    cy.get('@submitButton').click();
    cy.url().should('contain', 'dashboard');
    cy.reload();
    cy.url().should('contain', 'dashboard');
    cy.contains('Logout').as('logoutButton');
    cy.get('@logoutButton').click();
    cy.url().should('not.contain', 'dashboard');
  });

  it('is logging as proper user without remember me checked and reloads', () => {
    cy.get('@emailInput').type('test@test.pl');
    cy.get('@passwordInput').type('Password1');
    cy.get('@submitButton').click();
    cy.url().should('contain', 'dashboard');
    cy.reload();
    cy.url().should('not.contain', 'dashboard');
  });

  it('is inputting incorrect data and checks submit button', () => {
    cy.get('@emailInput').type('test@');
    cy.get('@passwordInput').type('passwordone');
    cy.get('@submitButton').should('be.disabled');
  });

  describe('inputs', () => {
    describe('email input', () => {
      it('inputs empty email to field', () => {
        cy.get('@emailInput').click().blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Field is required');
      });
      it('inputs email with malformed format', () => {
        cy.get('@emailInput').type('test@').blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Email has invalid format');
      });
    });

    describe('password input', () => {
      it('inputs empty password to field and check errors', () => {
        cy.get('@passwordInput').click().blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Field is required');
      });
      it('inputs password without uppercase and check errors', () => {
        cy.get('@passwordInput').type('password1').blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Provide uppercase character');
      });
      it('inputs password without lowercase and check errors', () => {
        cy.get('@passwordInput').type('PASSWORD1').blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Provide lowercase characte');
      });
      it('inputs password without number case  and check errors', () => {
        cy.get('@passwordInput').type('PasswordOne').blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Provide number character');
      });
      it('inputs password too short and check errors', () => {
        cy.get('@passwordInput').type('Pass1').blur();
        cy.get('[data-automation-id="LoginForm"]').contains('Password is too short');
      });
    });
  });
});
