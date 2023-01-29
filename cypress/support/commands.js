// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// -------------------------------------------------------------------------------------------------------------------------------------------------
// Navigate to Site command
import "cypress-file-upload";
require("cy-verify-downloads").addCustomCommand();


import projectUrls from '../urls/urls';
import { textSelectors } from "../selectors/textboxSelectors"
Cypress.Commands.add('siteNavigate', () => {
    const {homeUrl, elementsUrl} = projectUrls
      cy.visit("/");
      cy.url().should("equal", homeUrl);
      cy.get(textSelectors.card).each((item) => {
        if (item.text() === "Elements") {
          cy.wrap(item).click();
        }
      });
      cy.url().should("equal", elementsUrl);
})

Cypress.Commands.add('formsNavigate', () => {
    const {homeUrl, formsUrl} = projectUrls
      cy.visit("/");
      cy.url().should("equal", homeUrl);
      cy.get(textSelectors.card).each((item) => {
        if (item.text() === "Forms") {
          cy.wrap(item).click();
        }
      });
      cy.url().should("equal", formsUrl);
})

Cypress.Commands.add('alertsNavigate', () => {
    const {homeUrl, browserWindowUrl} = projectUrls
      cy.visit("/");
      cy.url().should("equal", homeUrl);
      cy.get(textSelectors.card).each((item) => {
        if (item.text() === "Alerts, Frame & Windows") {
          cy.wrap(item).click();
        }
      });
      cy.url().should("equal", browserWindowUrl);
})

