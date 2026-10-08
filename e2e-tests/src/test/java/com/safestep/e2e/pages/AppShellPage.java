package com.safestep.e2e.pages;

import com.safestep.e2e.support.Browser;
import org.openqa.selenium.By;

/** Frame shared by every page behind the login: sidebar navigation and top bar. */
public class AppShellPage {

  public static final By DASHBOARD_HERO = By.cssSelector(".hero-panel");
  public static final By USER_CHIP = By.cssSelector("a.user-chip");
  public static final By ADMIN_NAV_LINK = By.cssSelector("mat-nav-list a[href='/app/admin']");
  public static final By STORE_NAV_LINK = By.cssSelector("mat-nav-list a[href='/app/store']");
  public static final By SIMULATIONS_NAV_LINK = By.cssSelector("mat-nav-list a[href='/app/simulations']");
  private static final By LOGOUT = By.cssSelector("mat-toolbar button[aria-label='Cerrar sesion']");

  private final Browser browser;

  public AppShellPage(Browser browser) {
    this.browser = browser;
  }

  public void signOut() {
    browser.waitClickable(LOGOUT).click();
  }

  public void goToSimulations() {
    browser.waitClickable(SIMULATIONS_NAV_LINK).click();
    browser.waitForPath("/app/simulations");
  }

  public void goToStore() {
    browser.waitClickable(STORE_NAV_LINK).click();
    browser.waitForPath("/app/store");
  }
}
