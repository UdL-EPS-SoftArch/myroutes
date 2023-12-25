import { DataTable } from '@cucumber/cucumber';
import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';


/*

  Scenario: Create a new coordinate
    Given I'm in the homepage logged in as an admin
    When I go to the coordinate list page
    And I click on add coordinte button
    And I fill the form with
      | FIELD            | VALUE          |
      | coordinate   |   41.40338,2.17403  |
    And I click the "Submit" button
    Then I am redirected to the coordinate list page

*/

Given(/^I'm in the homepage logged in as an admin$/, function () {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('root').blur();
  cy.get('#password').type('password').blur();
  cy.get('button').contains('Submit').click();
});
When(/^I go to the coordinate list page$/, function () {
  cy.get('.nav-link').contains('Coordinate').click();
  cy.get('.dropdown-item.coordinateListNavbar').click();
});
When(/^I click on add coordinte button$/, function () {
  cy.get('.createCoordinateBtn').click();
});
Then(/^I am redirected to the coordinate list page$/, function () {
  cy.url().should('match', /\/coordinates\/\d+/);
});
/*Then(/^Submit button should be disabled$/, function () {
  cy.get('button').contains('Submit').should('be.disabled');
});*/
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
When(/^I click the add common name button$/, function () {
  cy.get('#add-commonName').click();
});
