@API
Feature: API tests example
  As a test engineer, I want be able to create scenarios that will communicate to API

  @automated
  Scenario: Anonymous user should not be able to create a feature request
    When the anonymous user sends POST '/repos/${{ OWNER }}/${{ REPO }}/issues'
      """
      {
        "title": "[Feature] request ${{ RANDOM_NUMBER }}",
        "body": "Feature description"
      }
      """
    Then response with 404 code received

  @automated
  Scenario: Anonymous user should be able to get list of repository issues
    When the anonymous user sends GET '/repos/${{ OWNER }}/${{ REPO }}/issues'
    Then response with 200 code received
    And response body include list of issues
