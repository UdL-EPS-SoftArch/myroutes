import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import {selectNavigationBar} from "./delete-route";
import {error} from "@angular/compiler-cli/src/transformers/util";

Given('I\'m in the homepage logged in as user with username {string} and password {string}', (username,password) => {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
  //goToHomepage();
  //login(username,password);
});

Given('I\'m in the homepage', () => {
  cy.visit('http://localhost:4200');
});

When('I click on the {string} menu option with class {string}', (option,class_) => {
  //clickMenuOption(option);
  cy.get(class_).contains(option).click();
});

And('I click on the {string} menu option', (option) => {
  selectNavigationBar(option,'Create');
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


Then('I try to click on the {string} menu option with class {string}', (option,class_) => {
  describe('Exception Handling In Cypress', () => {
    it('Navigate to webpage', () => {
      Cypress.on('fail', (error, runnable) => {
        if (!error.message.includes('Timed out retrying after 4000ms')) {
          throw error
        }
      });
      cy.get(class_).contains(option).click();
    });
  });
});


Then('I try to click on {string} element', (element) => {
  cy.get(element).should('not.exist');
});


function checkElementText(element:string, text:string) {
  cy.get(element)
    .invoke('text')
    .should('contains', text);
}
