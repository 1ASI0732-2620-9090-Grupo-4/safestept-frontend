package com.safestep.e2e.steps;

import static org.assertj.core.api.Assertions.assertThat;

import com.safestep.e2e.pages.CatalogPages;
import com.safestep.e2e.pages.SimulationPages;
import com.safestep.e2e.support.Browser;
import com.safestep.e2e.support.Journey;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/** Redeems coupons as a player and manages them as an administrator. */
public class CouponSteps {

  private static final Duration TIMEOUT = Duration.ofSeconds(15);

  private final Browser browser;
  private final Journey journey;

  public CouponSteps(Browser browser, Journey journey) {
    this.browser = browser;
    this.journey = journey;
  }

  @Then("the balance shown equals the SafeCoins earned")
  public void theBalanceShownEqualsTheSafeCoinsEarned() {
    assertThat(balance()).isPositive().isEqualTo(journey.earnedCoins());
  }

  @When("the player redeems the first coupon they can afford")
  public void thePlayerRedeemsTheFirstCouponTheyCanAfford() {
    browser.waitAll(SimulationPages.COUPON_CARD);
    for (WebElement card : browser.driver().findElements(SimulationPages.COUPON_CARD)) {
      WebElement button = card.findElement(CatalogPages.REDEEM_BUTTON_IN_CARD);
      if (button.isEnabled()) {
        journey.couponTitle(card.findElement(SimulationPages.COUPON_TITLE).getText());
        journey.couponCost(digitsOf(card.findElement(SimulationPages.COUPON_COST).getText()));
        journey.balanceBeforeRedeeming(balance());
        browser.click(button);
        return;
      }
    }
    throw new AssertionError("The player cannot afford any coupon");
  }

  @Then("the balance drops by the cost of that coupon")
  public void theBalanceDropsByTheCostOfThatCoupon() {
    int expected = journey.balanceBeforeRedeeming() - journey.couponCost();
    new WebDriverWait(browser.driver(), TIMEOUT).until(driver -> balance() == expected);
    assertThat(balance()).isEqualTo(expected);
  }

  @Then("that coupon is listed among the player's available coupons")
  public void thatCouponIsListedAmongThePlayersAvailableCoupons() {
    new WebDriverWait(browser.driver(), TIMEOUT).until(
        ExpectedConditions.numberOfElementsToBeMoreThan(SimulationPages.REDEEMED_COUPON_TITLE, 0));
    var titles = browser.driver().findElements(SimulationPages.REDEEMED_COUPON_TITLE).stream()
        .map(WebElement::getText).collect(Collectors.toList());
    assertThat(titles).contains(journey.couponTitle());
  }

  @When("the administrator creates a coupon costing {int} SafeCoins")
  public void theAdministratorCreatesACoupon(int cost) {
    String suffix = UUID.randomUUID().toString().substring(0, 6);
    journey.couponTitle("E2E coupon " + suffix);
    browser.open("/app/store/admin/coupons/new");
    var inputs = browser.waitAll(SimulationPages.COUPON_FORM_INPUT);
    // Form order: id, title, discount percentage, cost in SafeCoins.
    type(inputs.get(0), "e2e-" + suffix);
    type(inputs.get(1), journey.couponTitle());
    type(inputs.get(2), "7");
    type(inputs.get(3), String.valueOf(cost));
    browser.waitClickable(SimulationPages.COUPON_SAVE).click();
    browser.waitForPath("/app/store/admin/coupons");
  }

  @Then("the coupon appears in the administrator's coupon table")
  public void theCouponAppearsInTheAdministratorsCouponTable() {
    assertThat(rowOfTheCoupon()).isNotNull();
  }

  @When("the administrator deletes that coupon")
  public void theAdministratorDeletesThatCoupon() {
    browser.open("/app/store/admin/coupons");
    browser.click(rowOfTheCoupon().findElement(SimulationPages.COUPON_DELETE));
  }

  @Then("the coupon is no longer in the coupon table")
  public void theCouponIsNoLongerInTheCouponTable() {
    new WebDriverWait(browser.driver(), TIMEOUT).until(driver -> findRowOfTheCoupon() == null);
    assertThat(findRowOfTheCoupon()).isNull();
  }

  @Then("the redemption page offers the coupon that the administrator created")
  public void theRedemptionPageOffersTheCoupon() {
    browser.open("/app/store/coupons");
    browser.waitVisible(CatalogPages.COINS_BADGE);
    new WebDriverWait(browser.driver(), TIMEOUT).until(driver -> offeredTitles().contains(journey.couponTitle()));
    assertThat(offeredTitles()).contains(journey.couponTitle());
  }

  private WebElement rowOfTheCoupon() {
    new WebDriverWait(browser.driver(), TIMEOUT).until(driver -> findRowOfTheCoupon() != null);
    return findRowOfTheCoupon();
  }

  private WebElement findRowOfTheCoupon() {
    for (WebElement row : browser.driver().findElements(SimulationPages.COUPON_ROW)) {
      try {
        if (row.getText().contains(journey.couponTitle())) {
          return row;
        }
      } catch (StaleElementReferenceException rowRemovedWhileReading) {
        // The table is re-rendering; the next poll sees the new rows.
      }
    }
    return null;
  }

  private List<String> offeredTitles() {
    return browser.driver().findElements(SimulationPages.COUPON_CARD).stream()
        .map(card -> card.findElement(SimulationPages.COUPON_TITLE).getText())
        .collect(Collectors.toList());
  }

  private int balance() {
    return digitsOf(browser.waitVisible(CatalogPages.COINS_BADGE).getText().split(" ")[0]);
  }

  private static void type(WebElement input, String value) {
    input.clear();
    input.sendKeys(value);
  }

  private static int digitsOf(String text) {
    return Integer.parseInt(text.replaceAll("\\D", ""));
  }
}
