Feature: Edit a route
  In order to use the app
  As a user
  I want to edit a route

  Scenario: Check not allowed empty title on route edit
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I go to "List" option in menu "Route"
    When I click on edit on first card
    Then I try to modify the route title: " ", description: "Modified description for the modified route"
    Then Delete first route

  Scenario: Edit a route as normal user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I go to "List" option in menu "Route"
    When I click on edit on first card
    Then I modify the route title: "ModifiedRoute", description: "Modified description for the modified route"
    Then Validate modified result values. title: "ModifiedRoute" and description: "Modified description for the modified route"
    Then Delete first route

  Scenario: Edit a route as normal user by detail
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I go to "List" option in menu "Route"
    When I click on detail on first card
    When I click on edit on first card
    Then I modify the route title: "ModifiedRoute", description: "Modified description for the modified route"
    Then Validate modified result values. title: "ModifiedRoute" and description: "Modified description for the modified route"
    Then Delete first route

  Scenario: Edit a route as normal user after creation
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    When I click on edit on first card
    Then I modify the route title: "ModifiedRoute", description: "Modified description for the modified route"
    Then Validate modified result values. title: "ModifiedRoute" and description: "Modified description for the modified route"
    Then Delete first route

  Scenario: Edit a route as root user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Given I log in as "root" with password "password"
    Given I go to "List" option in menu "Route"
    Then I try to select edit on first element
    Then Delete first route

  Scenario: Edit a route as root user by detail
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Given I log in as "root" with password "password"
    Given I go to "List" option in menu "Route"
    Then I try to select detail on first element
    Then Delete first route

  Scenario: Edit a route as not logged user
    Given I'm in the homepage
    Given I log in as "demo" with password "password"
    Given I've a route created with title "testRoute"
    Given I logout
    Then I try to go to "Route" option in menu
    Given I log in as "root" with password "password"
    Then Delete first route




