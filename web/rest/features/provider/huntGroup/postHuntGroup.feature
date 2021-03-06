Feature: Create hunt groups
  In order to manage hunt groups
  As an super admin
  I need to be able to create them through the API.

  @createSchema
  Scenario: Create a hunt group
    Given I add Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "POST" request to "/hunt_groups" with body:
    """
      {
          "name": "newHuntGroup",
          "description": "none",
          "strategy": "random",
          "ringAllTimeout": null,
          "noAnswerTargetType": "extension",
          "noAnswerNumberValue": null,
          "id": 1,
          "company": 2,
          "noAnswerLocution": null,
          "noAnswerExtension": 1,
          "noAnswerVoiceMailUser": null,
          "noAnswerNumberCountry": null
      }
    """
    Then the response status code should be 201
     And the response should be in JSON
     And the header "Content-Type" should be equal to "application/json; charset=utf-8"
     And the JSON should be equal to:
    """
      {
          "name": "newHuntGroup",
          "strategy": "random",
          "id": 2
      }
    """

  Scenario: Retrieve created hunt group
    Given I add Authorization header
     When I add "Accept" header equal to "application/json"
      And I send a "GET" request to "hunt_groups/2"
     Then the response status code should be 200
      And the response should be in JSON
      And the header "Content-Type" should be equal to "application/json; charset=utf-8"
      And the JSON should be like:
    """
      {
          "name": "newHuntGroup",
          "description": "none",
          "strategy": "random",
          "ringAllTimeout": 0,
          "noAnswerTargetType": "extension",
          "noAnswerNumberValue": null,
          "preventMissedCalls": 1,
          "id": 2,
          "company": "~",
          "noAnswerLocution": null,
          "noAnswerExtension": {
              "number": "101",
              "routeType": "user",
              "numberValue": null,
              "friendValue": null,
              "id": 1,
              "company": 1,
              "ivr": null,
              "huntGroup": null,
              "conferenceRoom": null,
              "user": 1,
              "queue": null,
              "conditionalRoute": null,
              "numberCountry": null
          },
          "noAnswerVoiceMailUser": null,
          "noAnswerNumberCountry": null
      }
    """
