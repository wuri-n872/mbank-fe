import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given ('I open login page', () => {
    cy.visit("/login")
})

When ('I fill username {string} and password {string}', (username, password) => {
    cy.get('#LoginForm_email').clear().type(username)
    cy.get('#LoginForm_password').clear().type(password)
})

When ('I click the login button', () => {
    cy.get('#LoginForm_submit').click()
})

Then ('I should see homepage', () => {
    cy.get('.transaction-menu').should('be.visible')
})

Then ('I should see invalid email message', () => {
    cy.get('.error-message').should('have.text', 'email must be a valid email')
})

Then ('I should see required message', () => {
    cy.get('.error-message').should('have.text', 'email is a required fieldpassword is a required field')
})

Then ('I should see login error message', () => {
    cy.get('#dummyErrorMessage').should('be.visible')
})