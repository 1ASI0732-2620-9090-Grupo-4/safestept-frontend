package com.safestep.e2e.support;

import java.time.Duration;
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

/** Owns the Chrome instance of one scenario and offers the waiting helpers used by the page objects. */
public class Browser {

  private static final Duration TIMEOUT = Duration.ofSeconds(15);

  private WebDriver driver;

  public WebDriver driver() {
    if (driver == null) {
      var options = new ChromeOptions();
      if (E2eConfig.headless()) {
        options.addArguments("--headless=new");
      }
      options.addArguments("--window-size=1440,900", "--lang=es", "--no-sandbox",
          "--disable-gpu", "--disable-search-engine-choice-screen");
      driver = new ChromeDriver(options);
    }
    return driver;
  }

  public void open(String path) {
    driver().get(E2eConfig.baseUrl() + path);
  }

  public WebElement waitVisible(By locator) {
    return explicitWait().until(ExpectedConditions.visibilityOfElementLocated(locator));
  }

  public WebElement waitClickable(By locator) {
    return explicitWait().until(ExpectedConditions.elementToBeClickable(locator));
  }

  public List<WebElement> waitAll(By locator) {
    return explicitWait().until(ExpectedConditions.numberOfElementsToBeMoreThan(locator, 0));
  }

  public boolean isPresent(By locator) {
    return !driver().findElements(locator).isEmpty();
  }

  public void waitForPath(String path) {
    explicitWait().until(ExpectedConditions.urlContains(path));
  }

  public String currentPath() {
    return java.net.URI.create(driver().getCurrentUrl()).getPath();
  }

  public byte[] screenshot() {
    return ((TakesScreenshot) driver()).getScreenshotAs(OutputType.BYTES);
  }

  public boolean started() {
    return driver != null;
  }

  public void quit() {
    if (driver != null) {
      driver.quit();
      driver = null;
    }
  }

  private WebDriverWait explicitWait() {
    return new WebDriverWait(driver(), TIMEOUT);
  }
}
