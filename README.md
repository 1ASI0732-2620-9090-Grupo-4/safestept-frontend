# SafeStep Frontend

Frontend Angular de SafeStep, organizado por bounded contexts y conectado al backend Spring Boot de SafeStep.

## Stack

- Node.js
- npm
- Angular 21
- Angular Material
- RxJS
- ngx-translate
- Stripe Checkout through the backend

## Bounded Contexts

- `identity-access`: login, registro, sesion JWT y perfil actual.
- `medical-simulation`: catalogo de simulaciones e intentos.
- `gamification`: XP, SafeCoins, misiones, badges y ranking.
- `ecommerce`: productos, carrito, ordenes y pago con Stripe Checkout.
- `statistics`: progreso, estadisticas y certificados.
- `shared`: shell, dashboard, guards, componentes y utilidades compartidas.

## Run Locally

### 1. Requirements

Install and verify:

- Node.js
- npm
- Angular CLI

```powershell
node -v
npm -v
ng version
```

If Angular CLI is not installed globally:

```powershell
npm install -g @angular/cli
```

### 2. Install Dependencies

Open PowerShell in the `safestep-frontend` folder:

```powershell
cd C:\path\to\TrabajoFinalOpenSource\safestep-frontend
npm install
```

### 3. Start The Backend First

The frontend expects the SafeStep backend at:

```text
http://localhost:8092/api/v1
```

Before starting Angular, run the backend from the `safestep-backend` folder:

```powershell
mvn spring-boot:run
```

Swagger should be available at:

```text
http://localhost:8092/swagger-ui/index.html
```

### 4. Start The Frontend

```powershell
npm run start
```

Then open:

```text
http://localhost:4200
```

The Angular dev server reloads automatically when source files change.

## Environment Configuration

The backend URL is configured in:

```text
src/environments/environment.ts
src/environments/environment.development.ts
```

Current local value:

```ts
platformProviderApiBaseUrl: 'http://localhost:8092/api/v1'
```

If the backend is deployed, replace that value with the deployed API URL.

## Authentication

The app uses real backend IAM:

- `POST /authentication/sign-up`
- `POST /authentication/sign-in`
- `POST /authentication/logout`
- `GET /profiles/me`
- `PUT /profiles/me`

After login, the frontend stores:

```text
safestep.accessToken
safestep.refreshToken
safestep.user
```

Protected requests send:

```text
Authorization: Bearer <token>
```

If the backend returns `401`, the frontend clears the session and redirects to `/auth`.

## Stripe Checkout

Payments are handled through the backend. The frontend does not use a Stripe public key directly and does not calculate trusted payment totals.

Payment flow:

1. User adds products to the cart.
2. User confirms checkout.
3. Frontend creates an order in the backend.
4. Frontend requests a Stripe Checkout session.
5. Backend returns `sessionUrl`.
6. Frontend redirects the browser to Stripe Checkout.
7. Stripe webhook confirms the real payment in the backend.

For local payment testing, the backend must have Stripe environment variables configured and Stripe CLI running:

```powershell
stripe listen --forward-to localhost:8092/api/v1/commerce/payments/stripe/webhook
```

## Mock API

The old JSON Server mock data is still included for reference and compatibility with the course structure:

```powershell
npm run server
```

The main application flow now uses the Spring Boot backend, so JSON Server is not required for normal development.

## Build

```powershell
npm run build
```

The compiled files are generated in:

```text
dist/
```

## Tests

```powershell
npm run test
```

## Useful Commands

```powershell
npm install
npm run start
npm run build
npm run test
npm run server
```

## Stop The Frontend

When Angular is running in the current terminal, press:

```text
Ctrl + C
```
