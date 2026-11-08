@system @authentication @US01 @US02
Feature: Authentication in the web application
  As a visitor I want to create an account and sign in
  so that I can start training with the first aid simulations

  Scenario: A visitor without session is redirected to the login form
    Given a visitor who is not signed in
    When the visitor opens the dashboard address directly
    Then the login form is displayed

  Scenario: A visitor creates an account
    Given a visitor who is not signed in
    When the visitor registers a new account with valid data
    Then the account is created and the login form is prefilled with the e-mail

  Scenario: A visitor cannot register with two different passwords
    Given a visitor who is not signed in
    When the visitor registers with two different passwords
    Then a validation error is shown and no account is created

  Scenario: A registered player signs in
    Given a registered player who is not signed in
    When the player signs in with the correct credentials
    Then the player lands on the dashboard

  Scenario: A wrong password is rejected
    Given a registered player who is not signed in
    When the player signs in with a wrong password
    Then an authentication error is shown and the player stays on the login page

  Scenario: A signed in player signs out
    Given a registered player who is signed in
    When the player signs out
    Then the login form is displayed
