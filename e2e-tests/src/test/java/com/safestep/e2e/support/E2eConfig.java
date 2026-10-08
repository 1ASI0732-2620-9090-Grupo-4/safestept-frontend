package com.safestep.e2e.support;

/** Runtime configuration of the system tests, overridable with -D system properties. */
public final class E2eConfig {

  public static final String PLAYER_PASSWORD = "SecurePass123!";

  private E2eConfig() {
  }

  public static String baseUrl() {
    return System.getProperty("e2e.baseUrl", "http://localhost:4300");
  }

  public static boolean headless() {
    return Boolean.parseBoolean(System.getProperty("e2e.headless", "true"));
  }

  public static String adminUsername() {
    return System.getProperty("e2e.admin.username", "apitest-admin");
  }

  public static String adminPassword() {
    return System.getProperty("e2e.admin.password", "ApiTestAdmin123!");
  }
}
