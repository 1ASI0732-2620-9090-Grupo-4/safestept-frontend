# SafeStep system tests (Gherkin + Cucumber + Selenium)

End-to-end tests that drive the Angular application in a real Chrome browser. Scenarios are written in
Gherkin (`src/test/resources/features`) and executed by Cucumber on the JUnit Platform; Selenium WebDriver
performs the browser actions. Selenium Manager downloads the matching ChromeDriver automatically.

## Prerequisites

- JDK 21 or newer, Maven 3.9+ and Google Chrome.
- A running backend and a frontend that points to it. The `e2e` Angular configuration targets the isolated test
  backend on `http://127.0.0.1:8093` so the tests never touch the development database:

```bash
# backend (isolated database, seeded administrator)
SAFESTEP_ADMIN_USERNAME=apitest-admin SAFESTEP_ADMIN_PASSWORD='ApiTestAdmin123!' ... java -jar app.jar --server.port=8093

# frontend served with the e2e configuration
npx ng serve --configuration e2e --port 4300
```

## Run

```bash
mvn test -De2e.baseUrl=http://localhost:4300 \
         -De2e.admin.username=apitest-admin -De2e.admin.password='ApiTestAdmin123!'
```

Add `-De2e.headless=false` to watch the browser. Reports are written to `target/cucumber-reports/`
(`system-tests.html` embeds a screenshot of every scenario).

## Scenarios

| Feature | User stories | Scenarios |
| --- | --- | --- |
| `authentication.feature` | US01, US02 | route protection, registration, password mismatch, sign-in, wrong password, sign-out |
| `catalogs.feature` | US30, US31 | simulations catalogue, simulation filters, store catalogue |
| `coupon-redemption.feature` | US42, US59 | a new player sees the coupons but cannot afford them |
| `administration.feature` | US57, US58 | administrator reaches the panel, regular player is turned away |

Every scenario registers its own player with a random e-mail, so the suite can run repeatedly on a persistent database.
