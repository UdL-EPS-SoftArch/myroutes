import {Given, When} from 'cypress-cucumber-preprocessor/steps';
import {DataTable} from "@cucumber/cucumber";

Given(/^I am redirected to the coordinate edit page$/, function () {
  cy.url().should('match', /\/coordinates\/\d+\/edit/);

});

When('I clear and fill the form with', (table: DataTable) => {
  cy.wait(1000);
  table.rows().forEach(function (pair: string[]) {
    cy.get('#' + pair[0]).clear();
    cy.get('#' + pair[0]).type(pair[1]).blur();
  });
});
