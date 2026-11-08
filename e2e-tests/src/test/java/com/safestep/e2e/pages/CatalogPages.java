package com.safestep.e2e.pages;

import org.openqa.selenium.By;

/** Locators of the pages that only need to be read: simulations, store, coupon redemption and admin panel. */
public final class CatalogPages {

  public static final By SIMULATION_CARD = By.cssSelector(".simulation-grid .simulation-card:not(.continue-card)");
  public static final By FILTER_PILL = By.cssSelector(".filter-rail .filter-pill");
  public static final By ACTIVE_FILTER_PILL = By.cssSelector(".filter-rail .filter-pill.active");

  public static final By PRODUCT_CARD = By.cssSelector(".product-grid .product-card");

  public static final By COINS_BADGE = By.cssSelector(".coins-badge span");
  public static final By REDEEMABLE_COUPON = By.cssSelector("section > .coupon-grid .coupon-card");
  public static final By REDEEM_BUTTON = By.cssSelector("section > .coupon-grid .coupon-card mat-card-actions button");
  public static final By REDEEMED_EMPTY_MESSAGE = By.cssSelector("mat-tab-body .coupon-empty");

  public static final By ADMIN_CARD = By.cssSelector(".admin-dashboard .card-link");

  private CatalogPages() {
  }
}
