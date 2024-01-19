import {Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

Given(/^I'm in the homepage logged in as an admin$/, function () {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('root').blur();
  cy.get('#password').type('password').blur();
  cy.get('button').contains('Submit').click();
});
Given(/^I go to the coordinate list page$/, function () {
  cy.get('.nav-link').contains('Coordinate').click();
  cy.get('.dropdown-item.coordinateListNavbar').click();
});
Given(/^I click on add coordinte button$/, function () {
  cy.get('.createCoordinateBtn').click();
});
Given(/^I am redirected to the coordinate detail page$/, function () {
  cy.url().should('match', /\/coordinates\/\d+/);
});
When(/^I am redirected to the coordinate delete page$/, function () {
  cy.url().should('match', /\/coordinates\/\d+\/delete/);
});

Then(/^I am redirected to the coordinate list page$/, function () {
  cy.url().should('match', /\/coordinates/);
});
