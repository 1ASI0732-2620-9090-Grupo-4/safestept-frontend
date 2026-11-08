package com.safestep.e2e.pages;

import org.openqa.selenium.By;

/** Locators of the simulation player: the questions, the finish button and the result panel. */
public final class SimulationPages {

  public static final By INFO_CHIP = By.cssSelector(".info-grid .chip");
  public static final By START_LINK = By.cssSelector("a[href^='/app/simulations/']");

  public static final By STEP_CARD = By.cssSelector(".step-list article.step-card");
  public static final By OPTION = By.cssSelector(".options button");
  public static final By CORRECT_OPTION = By.cssSelector(".options button.correct");
  public static final By FINISH_BUTTON = By.cssSelector(".finish-area button.btn-primary");

  public static final By RESULT_PANEL = By.cssSelector(".result-panel");
  public static final By ACCURACY = By.cssSelector(".result-panel .score-inner strong");
  public static final By EARNED_COINS = By.cssSelector(".result-panel .coin-step.earned strong");

  public static final By COUPON_CARD = By.cssSelector("section > .coupon-grid .coupon-card");
  public static final By COUPON_TITLE = By.cssSelector("h3");
  public static final By COUPON_COST = By.cssSelector(".coupon-cost");
  public static final By REDEEMED_COUPON_TITLE = By.cssSelector("mat-tab-body .coupon-card.redeemed h3");

  public static final By COUPON_FORM_INPUT = By.cssSelector(".form-grid input");
  public static final By COUPON_SAVE = By.cssSelector("mat-card-actions button");
  public static final By COUPON_ROW = By.cssSelector("table tr.mat-mdc-row");
  public static final By COUPON_DELETE = By.cssSelector("button[color='warn']");

  private SimulationPages() {
  }
}
