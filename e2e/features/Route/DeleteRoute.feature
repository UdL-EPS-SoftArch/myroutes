Feature: Delete a route
  In order to use the app
  As a user
  I want to delete a route

  Scenario: Delete a route as root user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Given I log in as "root" with password "password"
    Given I go to "List" option in menu "Route"
    When I click on delete on first card
    Then I confirm the delete


  Scenario: Delete a route as normal user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I go to "List" option in menu "Route"
    Then I try to click on delete on first card
    Then Logout and delete first route

  Scenario: Delete a route as not logged user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Then I try to go to "Route" option in menu
    Then Delete first route
