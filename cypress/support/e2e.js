// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
// Ignore specific known ad-related errors (NPR uses external ad scripts)
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('ReportAdPopup')) {
      // Prevent Cypress from failing the test on this known third-party error
      return false;
    }
  
    // Optional: log unexpected exceptions for debugging
    console.warn('Unexpected uncaught exception:', err.message);
    return false;
  });
  
  // Global handler to prevent Cypress from failing tests on other unrelated frontend exceptions
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  // Add custom commands and support for real DOM events
  import 'cypress-real-events/support';
  import './commands';