Feature: Create Coordinate
  In order to use the app
  As admin
  I want to create a coordinate

  Scenario: Create a new coordinate
    Given I'm in the homepage logged in as an admin
    When I go to the coordinate list page
    And I click on add coordinte button
    And I fill the form with
      | FIELD            | VALUE          |
      | coordinate   |   41.40338,2.17403  |
    And I click the "Create" button
    Then I am redirected to the coordinate list page
