import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

function setElementValue(element:string, value:string) {
  cy.get(element).type(value).blur();
}

function selectNavigationBar(navigationElement:string, navigationItem:string){
  cy.get('.nav-link').contains(navigationElement).click();
  cy.get('.nav-item.dropdown.show').find('.dropdown-item').contains(navigationItem).click();
}


Given('I\'ve a route created with title {string}', (routeTitle) => {
  selectNavigationBar('Route','Create');
  setElementValue('#title', routeTitle);
  setElementValue('#description', 'Description');
  cy.get('#type').select('Running');
  cy.get('#submit').click();
  cy.wait(1000);
});

Given('I go to {string} option in menu {string}', ( subElement, option) => {
  selectNavigationBar(option,subElement);
});

Given('I logout',() => {
  cy.get('.nav-link').contains('Logout').click();
});

When('I click on delete on first card', () => {
  cy.get('.btn-outline-danger').first().click();
});

///Todo: Fix this step
Then('I confirm the delete', () => {
  cy.get('#deleteBtn').click();
});

Then('I try to click on delete on first card', () => {
  cy.get('.btn').contains('Delete').should('not.exist');
});

Then('I try to go to {string} option in menu', (element) => {
  cy.get('.nav-link').contains(element).should('not.exist');
});




function login(username:string, password:string) {
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type(username).blur();
  cy.get('#password').type(password).blur();
  cy.get('button').contains('Submit').click();
}

Then('Delete first route', () => {
  cy.get('.nav-link').contains('Logout').click();
  login('root', 'password');
  selectNavigationBar('Route','List');
  cy.get('.btn-outline-danger').first().click();
  cy.get('#deleteBtn').click();
});




