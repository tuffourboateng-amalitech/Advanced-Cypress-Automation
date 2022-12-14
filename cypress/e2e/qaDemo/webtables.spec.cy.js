import {webtableSelector} from '../../selectors/webtablesSelector';
import projectUrls from '../../urls/urls';
import webtableData from '../../fixtures/textbox.json'

describe("Automation for dummy QA website", () => {
  const { webtableUrl } = projectUrls;
  const {firstName, lastName, email, age, salary, department} = webtableData
  it("should successfully add new record to the table", () => {
    cy.siteNavigate();

    cy.get(webtableSelector.webtableElement).each((item) => {
      if (item.text() === "Web Tables") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", webtableUrl);
   
    cy.get(webtableSelector.newrecordBtn).click()
    expect(cy.get(webtableSelector.form).as("registrationForm").should('be.visible'));
    cy.get(webtableSelector.firstName).type(firstName)
    cy.get(webtableSelector.lastName).type(lastName)
    cy.get(webtableSelector.userEmail).type(email)
    cy.get(webtableSelector.age).type(age)
    cy.get(webtableSelector.salary).type(salary)
    cy.get(webtableSelector.department).type(department)
    cy.get(webtableSelector.submit).click()
    
    const newlyAddedItem = cy.get(webtableSelector.formRow).eq(3)
    expect(newlyAddedItem.should('exist'))
  });
});
