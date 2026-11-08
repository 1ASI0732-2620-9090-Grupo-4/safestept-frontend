@system @catalog @US30 @US31
Feature: Browsing the simulations catalogue and the store
  As a player I want to browse the available simulations and products

  Background:
    Given a registered player who is signed in

  Scenario: The simulations catalogue lists the available simulations
    When the player opens the simulations catalogue
    Then the catalogue lists at least 3 simulations
    And the first filter is selected by default

  Scenario: Choosing a filter highlights it
    When the player opens the simulations catalogue
    And the player picks the second simulation filter
    Then that filter is highlighted as the active one

  Scenario: The store lists the products
    When the player opens the store
    Then the store lists at least 3 products
