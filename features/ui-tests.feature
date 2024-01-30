@UI
Feature: UI tests example
  As a test engineer, I want be able to create scenarios that will run in a browser

  @automated
  Scenario: User should be able to navigate to documentation from main page
    Given the user is on the root page
    When the user clicks on Get started button
    Then the user is redirected to Installation | Playwright page

  @automated @debug
  Scenario: User should be able to search by documentation
    Given the user is on the root page
    When the user search for 'Getting started - VS Code'
    Then the user is redirected to Getting started - VS Code page
