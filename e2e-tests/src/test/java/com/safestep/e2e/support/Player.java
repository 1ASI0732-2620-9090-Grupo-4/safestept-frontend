package com.safestep.e2e.support;

import java.util.UUID;

/** The player created by the scenario; a unique e-mail keeps the suite repeatable on a persistent database. */
public class Player {

  private final String email = "e2e-" + UUID.randomUUID().toString().substring(0, 8) + "@safestep.test";

  public String email() {
    return email;
  }

  public String password() {
    return E2eConfig.PLAYER_PASSWORD;
  }
}
