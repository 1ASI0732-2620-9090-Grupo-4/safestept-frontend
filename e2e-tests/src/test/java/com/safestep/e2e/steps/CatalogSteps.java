package com.safestep.e2e.steps;

import static org.assertj.core.api.Assertions.assertThat;

import com.safestep.e2e.pages.AppShellPage;
import com.safestep.e2e.pages.CatalogPages;
import com.safestep.e2e.support.Browser;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.util.List;
import org.openqa.selenium.WebElement;

public class CatalogSteps {

  private final Browser browser;
  private final AppShellPage shell;

  public CatalogSteps(Browser browser) {
    this.browser = browser;
    this.shell = new AppShellPage(browser);
  }

  @When("the player opens the simulations catalogue")
  public void thePlayerOpensTheSimulationsCatalogue() {
    shell.goToSimulations();
  }

  @When("the player opens the store")
  public void thePlayerOpensTheStore() {
    shell.goToStore();
  }

  @When("the player opens the coupon redemption page")
  public void thePlayerOpensTheCouponRedemptionPage() {
    browser.open("/app/store/coupons");
    browser.waitVisible(CatalogPages.COINS_BADGE);
  }

  @When("the player opens the administration panel address directly")
  public void thePlayerOpensTheAdministrationPanelAddressDirectly() {
    browser.open("/app/admin");
  }

  @When("the administrator opens the administration panel")
  public void theAdministratorOpensTheAdministrationPanel() {
    browser.waitClickable(AppShellPage.ADMIN_NAV_LINK).click();
    browser.waitForPath("/app/admin");
  }

  @Then("the catalogue lists at least {int} simulations")
  public void theCatalogueListsAtLeastSimulations(int minimum) {
    assertThat(browser.waitAll(CatalogPages.SIMULATION_CARD)).hasSizeGreaterThanOrEqualTo(minimum);
  }

  @Then("the first filter is selected by default")
  public void theFirstFilterIsSelectedByDefault() {
    assertThat(browser.waitAll(CatalogPages.FILTER_PILL)).hasSizeGreaterThan(1);
    assertThat(browser.waitVisible(CatalogPages.ACTIVE_FILTER_PILL).isDisplayed()).isTrue();
  }

  @When("the player picks the second simulation filter")
  public void thePlayerPicksTheSecondSimulationFilter() {
    browser.waitAll(CatalogPages.SIMULATION_CARD);
    List<WebElement> pills = browser.waitAll(CatalogPages.FILTER_PILL);
    pills.get(1).click();
  }

  @Then("that filter is highlighted as the active one")
  public void thatFilterIsHighlightedAsTheActiveOne() {
    var pills = browser.waitAll(CatalogPages.FILTER_PILL);
    assertThat(pills.get(1).getAttribute("class")).contains("active");
    assertThat(pills.get(0).getAttribute("class")).doesNotContain("active");
  }

  @Then("the store lists at least {int} products")
  public void theStoreListsAtLeastProducts(int minimum) {
    assertThat(browser.waitAll(CatalogPages.PRODUCT_CARD)).hasSizeGreaterThanOrEqualTo(minimum);
  }

  @Then("the balance shown is {int} SafeCoins")
  public void theBalanceShownIsSafeCoins(int coins) {
    assertThat(browser.waitVisible(CatalogPages.COINS_BADGE).getText()).startsWith(String.valueOf(coins));
  }

  @Then("at least one coupon is offered and none of them can be redeemed")
  public void atLeastOneCouponIsOfferedAndNoneCanBeRedeemed() {
    assertThat(browser.waitAll(CatalogPages.REDEEMABLE_COUPON)).isNotEmpty();
    var buttons = browser.driver().findElements(CatalogPages.REDEEM_BUTTON);
    assertThat(buttons).isNotEmpty().allMatch(button -> !button.isEnabled());
  }

  @Then("the player has no coupons of their own yet")
  public void thePlayerHasNoCouponsOfTheirOwnYet() {
    assertThat(browser.waitVisible(CatalogPages.REDEEMED_EMPTY_MESSAGE).isDisplayed()).isTrue();
  }

  @Then("the administration panel shows {int} management cards")
  public void theAdministrationPanelShowsManagementCards(int expected) {
    browser.waitForPath("/app/admin");
    assertThat(browser.waitAll(CatalogPages.ADMIN_CARD)).hasSize(expected);
  }

  @Then("the administration entry is available in the navigation")
  public void theAdministrationEntryIsAvailableInTheNavigation() {
    assertThat(browser.waitVisible(AppShellPage.ADMIN_NAV_LINK).isDisplayed()).isTrue();
  }

  @Then("the administration entry is not available in the navigation")
  public void theAdministrationEntryIsNotAvailableInTheNavigation() {
    browser.waitVisible(AppShellPage.STORE_NAV_LINK);
    assertThat(browser.isPresent(AppShellPage.ADMIN_NAV_LINK)).isFalse();
  }

  @Then("the player is sent back to the dashboard")
  public void thePlayerIsSentBackToTheDashboard() {
    browser.waitForPath("/app/dashboard");
    assertThat(browser.currentPath()).endsWith("/app/dashboard");
  }
}
