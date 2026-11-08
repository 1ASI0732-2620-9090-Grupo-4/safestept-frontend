package com.safestep.e2e.pages;

import com.safestep.e2e.support.Browser;
import org.openqa.selenium.By;

/** Login and registration form served at /auth. */
public class AuthPage {

  private static final By LOGIN_TAB = By.cssSelector(".mode-switch button:nth-child(1)");
  private static final By REGISTER_TAB = By.cssSelector(".mode-switch button:nth-child(2)");
  private static final By SUBMIT = By.cssSelector("form button[type='submit']");
  public static final By ERROR = By.cssSelector("mat-card-content p.error");
  public static final By SUCCESS = By.cssSelector("mat-card-content p.success");
  public static final By FIELD_ERROR = By.cssSelector("mat-error");

  private final Browser browser;

  public AuthPage(Browser browser) {
    this.browser = browser;
  }

  public void open() {
    browser.open("/auth");
    browser.waitVisible(LOGIN_TAB);
  }

  public void showRegistration() {
    browser.waitClickable(REGISTER_TAB).click();
    browser.waitVisible(field("firstName"));
  }

  public void register(String firstName, String lastName, String email, String password, String confirmation) {
    type("firstName", firstName);
    type("lastName", lastName);
    type("email", email);
    type("password", password);
    type("confirmPassword", confirmation);
    submit();
  }

  public void signIn(String username, String password) {
    type("username", username);
    type("password", password);
    submit();
  }

  public String prefilledUsername() {
    return browser.waitVisible(field("username")).getDomProperty("value");
  }

  private void type(String control, String value) {
    var input = browser.waitVisible(field(control));
    input.clear();
    input.sendKeys(value);
  }

  private void submit() {
    browser.waitClickable(SUBMIT).click();
  }

  private static By field(String control) {
    return By.cssSelector("input[formcontrolname='" + control + "']");
  }
}
