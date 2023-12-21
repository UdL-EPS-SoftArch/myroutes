import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';


Then('I try to click on detail on first card', () => {
  cy.get('.btn').contains('Detail').should('not.exist');
});

Then('I confirm that i see the route title {string}', (title) => {
  cy.get('#Title').contains(title);
});





