import {radiobuttonSelector} from "../../selectors/radiobuttonSelector";
import projectUrls from "../../urls/urls";
describe("Automation for dummy QA website", () => {
  const { radiobuttonUrl } = projectUrls;
  it("should successfully check the radiobuttons provided on the website", () => {
    cy.siteNavigate();

     cy.get(radiobuttonSelector.radiobuttonElement).each((item) => {
       if (item.text() === "Radio Button") {
         cy.wrap(item).click();
       }
     });
        cy.url().should("equal", radiobuttonUrl);
        cy.get(radiobuttonSelector.yesRadioButton).eq(0).click({force: true})
        expect(
          cy
            .get(radiobuttonSelector.successPrompt)
            .should('be.visible')
            .should("have.css", "color", "rgb(40, 167, 69)")
        );

        cy.get(radiobuttonSelector.impressiveRadio).eq(1).click({force: true})
        expect(
          cy
            .get(radiobuttonSelector.successPrompt)
            .should('be.visible')
            .should("have.css", "color", "rgb(40, 167, 69)")
        );

        const disabledRadio = cy.get(radiobuttonSelector.disabledButton).eq(2).trigger('mouseover', {force: true})
        expect(disabledRadio.should('be.disabled'))
  });
});
