
<div align="center">
  <h1>NPR Cypress Tests</h1>
</div>

This project contains automated end-to-end tests for key user flows on [NPR.org](https://www.npr.org), built using [Cypress](https://www.cypress.io/).

## 📋 Covered Scenarios

### ✅ Donation Flow
- Switching between **Donate to NPR** and **Local Station**
- Switching between **Monthly** and **One-time** and validating amount options
- Filling out the donation form with randomly generated data (via `@faker-js/faker`)
- Handling Stripe iframe fields *(in progress)*

### ✅ Homepage Menu
- Verifying visibility of main top bar menu items: News, Culture, Music, Podcasts & Shows
- Hovering to display and check submenu items and categories

---

## 🧪 Getting Started

### 🔧 Install dependencies

```bash
npm install
```

### ▶️ Run Cypress in interactive mode

```bash
npm run cypress:open
```

### 📦 Run Cypress in headless mode

```bash
npm run cypress:run
```

---

## ⚙️ Configuration Notes

- `chromeWebSecurity: false` is set in `cypress.config.js` to allow Cypress to interact with Stripe iframe fields and handle cross-origin limitations.
- In `support/e2e.js`, uncaught frontend exceptions (like `ReportAdPopup` errors from ads) are caught and logged to avoid false test failures while working with a public production site.

---

## 📁 Project Structure

```
npr-cypress-tests/
│
├── cypress/
│   ├── e2e/
│   │   ├── donation/
│   │   │   └── donationFlow.cy.js
│   │   ├── homepage/
│   │   │   └── topBarMenu_search.cy.js
│   └── support/
│       ├── e2e.js
│       └── commands.js
│
├── cypress.config.js
├── package.json
└── README.md
```

---

## 🙋‍♀️ Author

**Indira Biyakhmetova**  
Quality Assurance Engineer — Manual & Automation  
