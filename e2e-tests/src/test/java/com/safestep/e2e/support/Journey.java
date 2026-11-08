package com.safestep.e2e.support;

/**
 * Facts that one scenario collects while it walks through several pages, such as the SafeCoins earned in a
 * simulation or the coupon that was redeemed, so that later steps can check them.
 */
public class Journey {

  private int simulationReward;
  private int earnedCoins;
  private String couponTitle;
  private int couponCost;
  private int balanceBeforeRedeeming;

  public int simulationReward() {
    return simulationReward;
  }

  public void simulationReward(int simulationReward) {
    this.simulationReward = simulationReward;
  }

  public int earnedCoins() {
    return earnedCoins;
  }

  public void earnedCoins(int earnedCoins) {
    this.earnedCoins = earnedCoins;
  }

  public String couponTitle() {
    return couponTitle;
  }

  public void couponTitle(String couponTitle) {
    this.couponTitle = couponTitle;
  }

  public int couponCost() {
    return couponCost;
  }

  public void couponCost(int couponCost) {
    this.couponCost = couponCost;
  }

  public int balanceBeforeRedeeming() {
    return balanceBeforeRedeeming;
  }

  public void balanceBeforeRedeeming(int balanceBeforeRedeeming) {
    this.balanceBeforeRedeeming = balanceBeforeRedeeming;
  }
}
