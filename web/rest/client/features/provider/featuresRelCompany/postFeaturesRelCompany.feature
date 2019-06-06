Feature: Create features rel companies
  In order to manage features rel companies
  As an super admin
  I need to be able to create them through the API.

  @createSchema
  Scenario: Create a feature rel company
    Given I add Company Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "POST" request to "/features_rel_companies" with body:
    """
      {
          "company": 1,
          "feature": 9
      }
    """
    Then the response status code should be 405
