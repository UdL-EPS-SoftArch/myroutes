import {When, Then} from 'cypress-cucumber-preprocessor/steps';

When('I click on edit on first card', () => {
  cy.get('.btn-outline-success').first().click();
});

When('I click on detail on first card', () => {
  cy.get('.btn-outline-primary').first().click();
});

Then('I modify the route title: {string}, description: {string}',(title,description) => {
  cy.wait(300);
  cy.get('#title').clear().type(title);
  cy.get('#description').clear().type(description);
  cy.get('#submit').click();
});

Then('I try to modify the route title: {string}, description: {string}',(title,description) => {
  cy.wait(300);
  cy.get('#title').clear().type(title);
  cy.get('#description').clear().type(description);
  cy.get('#submit').should('be.disabled');
});

Then('Validate modified result values. title: {string} and description: {string}',(title,description) =>{
  cy.get('#Title').contains(title);
  cy.get('#Description').contains(description);
});

Then('I try to select edit on first element', (element) => {
  cy.get('.btn-outline-success').should('not.exist');
});

Then('I try to select detail on first element', (element) => {
  cy.get('.btn-outline-primary').should('not.exist');
});

Then


