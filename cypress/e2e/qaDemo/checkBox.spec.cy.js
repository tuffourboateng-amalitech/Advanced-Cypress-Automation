import { checkboxSelector } from "../../selectors/checkboxSelectors";
import projectUrls from "../../urls/urls";
describe("Automation for dummy QA website", () => {
    const {checkboxUrl} = projectUrls
  it("should successfully check the checkbox provided on the website", () => {
    cy.siteNavigate();

     cy.get(checkboxSelector.checkboxElement).each((item) => {
       if (item.text() === "Check Box") {
         cy.wrap(item).click();
       }
     });
      cy.url().should("equal", checkboxUrl);
     cy.get(checkboxSelector.toggleIcon).click()
     cy.get(checkboxSelector.checkIcon).eq(0).click()
     
     expect(cy.get(checkboxSelector.result).should("have.css", "color", "rgb(33, 37, 41)"));
    
  });
});
 