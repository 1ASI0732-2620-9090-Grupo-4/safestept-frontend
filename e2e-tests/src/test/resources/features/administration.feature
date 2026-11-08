@system @administration @US57 @US58 @US60
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

  Scenario: A coupon created by the administrator reaches the players and can be withdrawn
    Given a registered player who is not signed in
    And an administrator who is signed in
    When the administrator creates a coupon costing 50 SafeCoins
    Then the coupon appears in the administrator's coupon table
    When the administrator signs out
    And the player signs in with the correct credentials
    Then the redemption page offers the coupon that the administrator created
    When the player signs out
    And the administrator signs in
    And the administrator deletes that coupon
    Then the coupon is no longer in the coupon table
