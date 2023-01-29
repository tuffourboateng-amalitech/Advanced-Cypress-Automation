import { faker } from "@faker-js/faker";
describe("Testing forms on ToolsQA", () => {
  it("forms testing", () => {
    const currentDate = new Date().getDate();
    cy.formsNavigate();
    cy.contains("practice form", { matchCase: false }).click();
    cy.get("#firstName").type(faker.name.firstName());
    cy.get("#lastName").type(faker.name.lastName());
    cy.get("#userEmail").type(faker.internet.email());
    cy.get('input[value="Male"]').check({ force: true });
    cy.get("#userNumber").type(faker.phone.imei());
    cy.get("#dateOfBirthInput")
      .click()
      .get(".react-datepicker__month-container")
      .get(`.react-datepicker__day--0${currentDate}`).click();
    cy.get(".subjects-auto-complete__value-container").type(faker.lorem.word());
    cy.get("label[for=hobbies-checkbox-2]").click();
    // cy.get("#hobbies-checkbox-2").invoke("attr", "checked", true); -- This code too works for the immediate checkbox code above
    cy.get("#uploadPicture").attachFile('Tuff.jpg');
    cy.get("#currentAddress").type(faker.address.streetAddress());
  });
});
