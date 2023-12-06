Feature: Create a new route
  In order to use the app
  As a user
  I want to create a new route

  Scenario: Create a new route
    Given I'm in the homepage logged in as user with username "demo" and password "password"
    When I click on the "Route" menu option
    And I fill the form with
      | FIELD       | VALUE         |
      | title       | testRoute     |
      | description | That's a test route to make e2e tests |
    And Select type "Running" from the dropdown of types
    And I click the "Submit" button
    Then I've created a new route with creation user "demo", title "testRoute", description "That's a test route to make e2e tests" and type "Running"

