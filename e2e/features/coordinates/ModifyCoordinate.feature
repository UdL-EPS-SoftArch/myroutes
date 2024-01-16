Feature: Modify Coordinate
  In order to use the app
  As admin
  I want to modify a coordinate

  Scenario: Modify a new coordinate
    Given I'm in the homepage logged in as an admin
    And I go to the coordinate list page
    And I click on add coordinte button
    And I fill the form with
      | FIELD      | VALUE            |
      | coordinate | 41.40338,2.17403 |
    And I click the "Create" button
    And I am redirected to the coordinate detail page
    And I click the "Edit" button
    And I am redirected to the coordinate edit page
    When I clear and fill the form with
      | FIELD      | VALUE            |
      | coordinate | 42.40338,3.17403 |
    And I click the "Update" button
    Then I am redirected to the coordinate detail page
