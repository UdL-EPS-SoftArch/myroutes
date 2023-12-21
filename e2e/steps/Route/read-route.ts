import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import {login, selectNavigationBar} from './delete-route';

Then('I try to click on detail on first card', () => {
  cy.get('.btn').contains('Detail').should('not.exist');
});

Then('I confirm that i see the route title {string}', (title) => {
  cy.get('#Title').contains(title);
});

Then('Delete first route', () => {
  login('root', 'password');
  selectNavigationBar('Route','List');
  cy.get('.btn-outline-danger').first().click();
  cy.get('#deleteBtn').click();
});



