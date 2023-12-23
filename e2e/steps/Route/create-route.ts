import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('I\'m in the homepage logged in as user with username {string} and password {string}', (username,password) => {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
  //goToHomepage();
  //login(username,password);
});

When('I click on the {string} menu option', (option) => {
  //clickMenuOption(option);
  cy.get('.nav-link').contains(option).click();
  cy.get('#createRoute').click();
});

And('Select type {string} from the dropdown of types', (type) => {
    cy.get('#type').select(type);
});

Then('I\'ve created a new route with creation user {string}, title {string}, description {string} and type {string}',(username,title,description,type) => {
  checkElementText('#CreatedBy', username);
  checkElementText('#Title', title);
  checkElementText('#Description', description);
  checkElementText('#Type', type);
});

function checkElementText(element:string, text:string) {
  cy.get(element)
    .invoke('text')
    .should('contains', text);
}
