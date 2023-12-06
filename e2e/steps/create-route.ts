import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';
import { goToHomepage, login, logout, clickMenuOption } from "../../cypress/support/commands";

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
