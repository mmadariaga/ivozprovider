Feature: Update friends
  In order to manage friends
  As a brand admin
  I need to be able to update them through the API.

  @createSchema
  Scenario: Update a friend
    Given I add Brand Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "PUT" request to "/friends/1" with body:
      """
      {
          "name": "updatedTestFriend",
          "description": "",
          "transport": "udp",
          "ip": "1.2.3.4",
          "port": 5061,
          "password": "ZEF7t5n+b4",
          "priority": 1,
          "disallow": "all",
          "allow": "alaw",
          "directMediaMethod": "update",
          "calleridUpdateHeader": "pai",
          "updateCallerid": "yes",
          "fromDomain": "",
          "directConnectivity": "yes",
          "id": 1,
          "callAcl": null,
          "outgoingDdi": null,
          "language": null
      }
      """
     Then the response status code should be 200
      And the response should be in JSON
      And the header "Content-Type" should be equal to "application/json; charset=utf-8"
      And the JSON should be like:
      """
      {
          "name": "updatedTestFriend",
          "description": "",
          "transport": "udp",
          "ip": "1.2.3.4",
          "port": 5061,
          "password": "ZEF7t5n+b4",
          "priority": 1,
          "directConnectivity": "yes",
          "id": 1,
          "company": 1,
          "interCompany": null,
          "proxyUser": 1
      }
      """

  @createSchema
  Scenario: Update a friend to intervpx conectivity
    Given I add Brand Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "PUT" request to "/friends/1" with body:
      """
      {
          "name": "updatedTestFriend",
          "description": "",
          "transport": "udp",
          "ip": "1.2.3.4",
          "port": 5061,
          "password": "",
          "priority": 1,
          "disallow": "all",
          "allow": "alaw",
          "directMediaMethod": "update",
          "calleridUpdateHeader": "pai",
          "updateCallerid": "yes",
          "fromDomain": "",
          "directConnectivity": "intervpbx",
          "id": 1,
          "callAcl": null,
          "outgoingDdi": null,
          "language": null,
          "interCompany": 1
      }
      """
     Then the response status code should be 200
      And the response should be in JSON
      And the header "Content-Type" should be equal to "application/json; charset=utf-8"
      And the JSON should be like:
      """
      {
          "name": "InterCompany1_1",
          "description": "",
          "transport": "udp",
          "ip": null,
          "port": null,
          "password": null,
          "priority": 1,
          "directConnectivity": "intervpbx",
          "id": 1,
          "company": 1,
          "interCompany": 1
      }
      """

  @createSchema
  Scenario: Update a friend company must fail
    Given I add Brand Authorization header
     When I add "Content-Type" header equal to "application/json"
      And I add "Accept" header equal to "application/json"
      And I send a "PUT" request to "/friends/1" with body:
      """
      {
          "company": 2
      }
      """
     Then the response status code should be 400
