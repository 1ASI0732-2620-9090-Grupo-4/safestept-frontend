@system @administration
Feature: Administration panel access
  Only administrators can reach the administration panel

  Scenario: An administrator reaches the administration panel
    Given an administrator who is signed in
    Then the administration entry is available in the navigation
    When the administrator opens the administration panel
    Then the administration panel shows 6 management cards

  Scenario: A regular player cannot reach the administration panel
    Given a registered player who is signed in
    Then the administration entry is not available in the navigation
    When the player opens the administration panel address directly
    Then the player is sent back to the dashboard
