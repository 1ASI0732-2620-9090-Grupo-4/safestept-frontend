@system @coupons @US42 @US59
Feature: Coupon redemption page
  As a player I want to see which coupons I can buy with SafeCoins

  Scenario: A new player cannot afford any coupon
    Given a registered player who is signed in
    When the player opens the coupon redemption page
    Then the balance shown is 0 SafeCoins
    And at least one coupon is offered and none of them can be redeemed
    And the player has no coupons of their own yet

  Scenario: A player turns the SafeCoins of a simulation into a coupon
    Given a registered player who is signed in
    When the player completes a simulation worth at least 150 SafeCoins answering every question correctly
    And the player opens the coupon redemption page
    Then the balance shown equals the SafeCoins earned
    When the player redeems the first coupon they can afford
    Then the balance drops by the cost of that coupon
    And that coupon is listed among the player's available coupons
