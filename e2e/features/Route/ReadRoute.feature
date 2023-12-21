Feature: Read a route
  In order to use the app
  As a user
  I want to read a route

  Scenario: Read a route as root user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Given I log in as "root" with password "password"
    Given I go to "List" option in menu "Route"
    When I try to click on detail on first card
    Then Delete first route


  Scenario: Read a route as normal user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I go to "List" option in menu "Route"
    When I click on detail on first card
    Then I confirm that i see the route title "testRoute"
    Then Delete first route

  Scenario: Read a route as not logged user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Then I try to go to "Route" option in menu

