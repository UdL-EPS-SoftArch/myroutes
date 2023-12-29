import {DataTable} from '@cucumber/cucumber';
import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

Given(/^I'm in the homepage logged in as an admin$/, function () {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('root').blur();
  cy.get('#password').type('password').blur();
  cy.get('button').contains('Submit').click();
});
When(/^I go to the coordinate detail page$/, function () {
  cy.get('.nav-link').contains('Coordinate').click();
  cy.get('.dropdown-item.coordinateListNavbar').click();
});
When(/^I click on add coordinte button$/, function () {
  cy.get('.createCoordinateBtn').click();
});
Then(/^Create button should be disabled$/, function () {
  cy.get('button').contains('Create').should('be.disabled');
});
Given(/^I'm in the homepage logged in as an user$/, function () {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('demo').blur();
  cy.get('#password').type('password').blur();
  cy.get('button').contains('Submit').click();
});
Then(/^I should not see the seed create button$/, function () {
  cy.get('#createSeed').should('not.exist');
});
When(/^I fill the form with$/, function (table: DataTable) {
  table.rows().forEach((pair: string[]) =>
    cy
      .get('#' + pair[0])
      .type(pair[1])
      .blur()
  );
});
