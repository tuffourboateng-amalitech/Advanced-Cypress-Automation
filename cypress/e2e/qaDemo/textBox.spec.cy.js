import { textSelectors } from "../../selectors/textboxSelectors";
import textboxData from "../../fixtures/textbox.json";
import projectUrls from '../../urls/urls';
describe("Automation for a dummy QA website", () => {

  const {nameInput, email, address, perm_address } = textboxData
  const {textboxUrl} = projectUrls
  
  it("should successfully enter details in the textboxes and submit", () => {
    // custom command
    cy.siteNavigate()

    cy.get(textSelectors.textboxElement).each((item) => {
      if (item.text() === "Text Box") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", textboxUrl);
    const userForm = cy.get(textSelectors.textForm);
    expect(userForm.should("exist"));

    cy.get(textSelectors.username).type(nameInput);
    cy.get(textSelectors.email).type(email);
    cy.get(textSelectors.currAddress).type(address);
    cy.get(textSelectors.permAddress).type(perm_address);
    cy.get(textSelectors.submitBtn).click()

    expect(cy.get(textSelectors.successModal).should('be.visible'))
  });
});
