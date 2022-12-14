import {buttonSelector} from "../../selectors/buttonSelector";
import projectUrls from '../../urls/urls'
describe("Automation for dummy QA website", () => {
  const {buttonUrl} = projectUrls;
  it("should successfully click the buttons provided on the website", () => {
    cy.siteNavigate();

    cy.get(buttonSelector.buttonElement).each((item) => {
      if (item.text() === "Buttons") {
        cy.wrap(item).click();
      }
    });
      cy.url().should("equal", buttonUrl);

      cy.get(buttonSelector.dbClick).dblclick()
      expect(cy.get(buttonSelector.dbClickMsg).should('be.visible'))

      cy.get(buttonSelector.rightClick).rightclick()
      expect(cy.get(buttonSelector.rightClickMsg).should('be.visible'))

      cy.get(buttonSelector.dynamicClick).eq(2).click()
      expect(cy.get(buttonSelector.dynamicClickMsg).should('be.visible'))
  });
});
