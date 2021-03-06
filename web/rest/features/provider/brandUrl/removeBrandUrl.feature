Feature: Manage brand urls
  In order to manage brand urls
  As an super admin
  I need to be able to delete them through the API.

  @createSchema
  Scenario: Remove a brand url
    Given I add Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "DELETE" request to "/brand_urls/3"
     Then the response status code should be 204
