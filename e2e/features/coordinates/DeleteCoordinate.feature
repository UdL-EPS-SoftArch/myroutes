Feature: Delete Coordinate
  In order to use the app
  As admin
  I want to delete a coordinate

  Scenario: Delete a new coordinate
    Given I'm in the homepage logged in as an admin
    And I go to the coordinate list page
    And I click on add coordinte button
    And I fill the form with
      | FIELD      | VALUE            |
      | coordinate | 41.40338,2.17403 |
    And I click the "Create" button
    And I am redirected to the coordinate detail page
    When I click the "Delete" button
    Then I am redirected to the coordinate delete page
    And I click the "Delete" button
    Then I am redirected to the coordinate list page

