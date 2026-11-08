# SafeStep system tests (Gherkin + Cucumber + Selenium)

End-to-end tests that drive the Angular application in a real Chrome browser against a real backend. Scenarios are
written in Gherkin (`src/test/resources/features`) and executed by Cucumber on the JUnit Platform; Selenium WebDriver
performs the browser actions. Selenium Manager downloads the matching ChromeDriver automatically.

## Prerequisites

- JDK 21 or newer, Maven 3.9+ and Google Chrome.
- A disposable PostgreSQL database, a backend that uses it and a frontend that points to that backend. The `e2e`
  Angular configuration targets the isolated test backend on `http://127.0.0.1:8093`, so the tests never touch the
  development database.

```bash
# 1. Disposable database (any PostgreSQL works; the backend creates its tables)
docker run -d --name safestep-e2e-db -e POSTGRES_USER=e2e -e POSTGRES_PASSWORD=e2e \
  -e POSTGRES_DB=safestep_e2e -p 55433:5432 postgres:18-alpine

# 2. Backend on port 8093 with a seeded administrator (from safestept-backend: mvn -DskipTests package)
DATABASE_URL=localhost DATABASE_PORT=55433 DATABASE_NAME=safestep_e2e DATABASE_USER=e2e DATABASE_PASSWORD=e2e \
PORT=8093 SAFESTEP_ADMIN_USERNAME=apitest-admin SAFESTEP_ADMIN_PASSWORD='ApiTestAdmin123!' \
SAFESTEP_CORS_ALLOWED_ORIGINS=http://localhost:4300 java -jar target/safestep-platform-1.0.0.jar

# 3. Frontend served with the e2e configuration
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
| `simulation-rewards.feature` | US15, US16 | a player answers every question of a simulation correctly and earns its full SafeCoins reward |
| `coupon-redemption.feature` | US42, US59 | a new player sees the coupons but cannot afford them; a player turns the SafeCoins of a simulation into a coupon |
| `administration.feature` | US57, US58, US60 | administrator reaches the panel, regular player is turned away, a coupon created by the administrator reaches the players and is withdrawn |

Every scenario registers its own player with a random e-mail and every administrator coupon has a random title, so the
suite can run repeatedly on a persistent database.
