package com.safestep.e2e.steps;

import static org.assertj.core.api.Assertions.assertThat;

import com.safestep.e2e.pages.AppShellPage;
import com.safestep.e2e.pages.AuthPage;
import com.safestep.e2e.support.Browser;
import com.safestep.e2e.support.E2eConfig;
import com.safestep.e2e.support.Player;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class AuthenticationSteps {

  private final Browser browser;
  private final Player player;
  private final AuthPage authPage;
  private final AppShellPage shell;

  public AuthenticationSteps(Browser browser, Player player) {
    this.browser = browser;
    this.player = player;
    this.authPage = new AuthPage(browser);
    this.shell = new AppShellPage(browser);
  }

  @Given("a visitor who is not signed in")
  public void aVisitorWhoIsNotSignedIn() {
    authPage.open();
  }

  @Given("a registered player who is signed in")
  public void aRegisteredPlayerWhoIsSignedIn() {
    registerThroughTheForm();
    signInAsPlayer();
  }

  @Given("an administrator who is signed in")
  public void anAdministratorWhoIsSignedIn() {
    authPage.open();
    authPage.signIn(E2eConfig.adminUsername(), E2eConfig.adminPassword());
    browser.waitVisible(AppShellPage.DASHBOARD_HERO);
  }

  @Given("a registered player who is not signed in")
  public void aRegisteredPlayerWhoIsNotSignedIn() {
    registerThroughTheForm();
  }

  @When("the visitor opens the dashboard address directly")
  public void theVisitorOpensTheDashboardAddressDirectly() {
    browser.open("/app/dashboard");
  }

  @When("the visitor registers a new account with valid data")
  public void theVisitorRegistersANewAccountWithValidData() {
    registerThroughTheForm();
  }

  @When("the visitor registers with two different passwords")
  public void theVisitorRegistersWithTwoDifferentPasswords() {
    authPage.open();
    authPage.showRegistration();
    authPage.register("Elena", "Quispe", player.email(), player.password(), player.password() + "x");
  }

  @When("the player signs in with the correct credentials")
  public void thePlayerSignsInWithTheCorrectCredentials() {
    signInAsPlayer();
  }

  @When("the player signs in with a wrong password")
  public void thePlayerSignsInWithAWrongPassword() {
    authPage.signIn(player.email(), "WrongPass999!");
  }

  @When("the player signs out")
  public void thePlayerSignsOut() {
    shell.signOut();
  }

  @Then("the login form is displayed")
  public void theLoginFormIsDisplayed() {
    browser.waitForPath("/auth");
    assertThat(browser.currentPath()).endsWith("/auth");
  }

  @Then("the account is created and the login form is prefilled with the e-mail")
  public void theAccountIsCreatedAndTheLoginFormIsPrefilled() {
    browser.waitVisible(AuthPage.SUCCESS);
    assertThat(authPage.prefilledUsername()).isEqualTo(player.email());
  }

  @Then("the player lands on the dashboard")
  public void thePlayerLandsOnTheDashboard() {
    browser.waitForPath("/app/dashboard");
    assertThat(browser.waitVisible(AppShellPage.DASHBOARD_HERO).isDisplayed()).isTrue();
    assertThat(browser.waitVisible(AppShellPage.USER_CHIP).getText()).isNotBlank();
  }

  @Then("an authentication error is shown and the player stays on the login page")
  public void anAuthenticationErrorIsShown() {
    assertThat(browser.waitVisible(AuthPage.ERROR).getText()).isNotBlank();
    assertThat(browser.currentPath()).endsWith("/auth");
  }

  @Then("a validation error is shown and no account is created")
  public void aValidationErrorIsShown() {
    assertThat(browser.waitVisible(AuthPage.FIELD_ERROR).isDisplayed()).isTrue();
    assertThat(browser.isPresent(AuthPage.SUCCESS)).isFalse();
    assertThat(browser.currentPath()).endsWith("/auth");
  }

  private void registerThroughTheForm() {
    authPage.open();
    authPage.showRegistration();
    authPage.register("Elena", "Quispe", player.email(), player.password(), player.password());
    browser.waitVisible(AuthPage.SUCCESS);
  }

  private void signInAsPlayer() {
    authPage.signIn(player.email(), player.password());
    browser.waitVisible(AppShellPage.DASHBOARD_HERO);
  }
}
