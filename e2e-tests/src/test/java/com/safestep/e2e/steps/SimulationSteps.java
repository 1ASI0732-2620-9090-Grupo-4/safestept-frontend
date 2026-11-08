package com.safestep.e2e.steps;

import static org.assertj.core.api.Assertions.assertThat;

import com.safestep.e2e.pages.AppShellPage;
import com.safestep.e2e.pages.CatalogPages;
import com.safestep.e2e.pages.SimulationPages;
import com.safestep.e2e.support.Browser;
import com.safestep.e2e.support.Journey;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import java.util.List;
import org.openqa.selenium.WebElement;

/** Plays a simulation in the browser and checks the reward that the result panel announces. */
public class SimulationSteps {

  private static final String ACCURACY_TEXT = "100%";

  private final Browser browser;
  private final Journey journey;
  private final AppShellPage shell;

  public SimulationSteps(Browser browser, Journey journey) {
    this.browser = browser;
    this.journey = journey;
    this.shell = new AppShellPage(browser);
  }

  @When("the player completes a simulation worth at least {int} SafeCoins answering every question correctly")
  public void thePlayerCompletesASimulation(int minimumReward) {
    shell.goToSimulations();
    openFirstSimulationWorthAtLeast(minimumReward);
    answerEveryQuestionCorrectly();
    browser.click(browser.waitClickable(SimulationPages.FINISH_BUTTON));
    browser.waitVisible(SimulationPages.RESULT_PANEL);
    journey.earnedCoins(digitsOf(browser.waitVisible(SimulationPages.EARNED_COINS).getText()));
  }

  @Then("the result panel shows an accuracy of 100 percent")
  public void theResultPanelShowsFullAccuracy() {
    assertThat(browser.waitVisible(SimulationPages.ACCURACY).getText()).isEqualTo(ACCURACY_TEXT);
  }

  @Then("the player earned the full reward of that simulation")
  public void thePlayerEarnedTheFullReward() {
    assertThat(journey.earnedCoins()).isPositive().isEqualTo(journey.simulationReward());
  }

  private void openFirstSimulationWorthAtLeast(int minimumReward) {
    List<WebElement> cards = browser.waitAll(CatalogPages.SIMULATION_CARD);
    for (WebElement card : cards) {
      // The fourth chip of the card is "+<coins> SafeCoins".
      int reward = digitsOf(card.findElements(SimulationPages.INFO_CHIP).get(3).getText());
      if (reward >= minimumReward) {
        journey.simulationReward(reward);
        browser.click(card.findElement(SimulationPages.START_LINK));
        return;
      }
    }
    throw new AssertionError("No simulation rewards at least " + minimumReward + " SafeCoins");
  }

  private void answerEveryQuestionCorrectly() {
    int questions = browser.waitAll(SimulationPages.STEP_CARD).size();
    for (int index = 0; index < questions; index++) {
      WebElement question = browser.driver().findElements(SimulationPages.STEP_CARD).get(index);
      // Picking any option reveals which one is correct; then the correct one is picked.
      browser.click(question.findElements(SimulationPages.OPTION).get(0));
      browser.click(browser.driver().findElements(SimulationPages.STEP_CARD).get(index)
          .findElement(SimulationPages.CORRECT_OPTION));
    }
  }

  private static int digitsOf(String text) {
    return Integer.parseInt(text.replaceAll("\\D", ""));
  }
}
