package com.safestep.e2e.steps;

import com.safestep.e2e.support.Browser;
import io.cucumber.java.After;
import io.cucumber.java.Scenario;

/** Attaches a screenshot of the final state to every scenario and always closes the browser. */
public class Hooks {

  private final Browser browser;

  public Hooks(Browser browser) {
    this.browser = browser;
  }

  @After
  public void captureEvidenceAndQuit(Scenario scenario) {
    try {
      if (browser.started()) {
        scenario.attach(browser.screenshot(), "image/png", scenario.getName());
      }
    } finally {
      browser.quit();
    }
  }
}
