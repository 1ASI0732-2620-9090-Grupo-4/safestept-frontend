@system @simulations @US15 @US16
Feature: Completing a simulation
  As a player I want to finish a first aid simulation
  so that I earn the SafeCoins that the simulation promises

  Scenario: A player answers every question correctly and earns the full reward
    Given a registered player who is signed in
    When the player completes a simulation worth at least 150 SafeCoins answering every question correctly
    Then the result panel shows an accuracy of 100 percent
    And the player earned the full reward of that simulation
