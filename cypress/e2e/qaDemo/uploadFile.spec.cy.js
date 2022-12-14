import {uploadDownload} from "../../selectors/uploadDownload";
import projectUrls from "../../urls/urls";
describe("Automation for dummy QA website", () => {
  const {uploadDownlUrl} = projectUrls;
  it("should successfully upload files", () => {
    cy.siteNavigate();

    cy.get(uploadDownload.uploadDownldEle).each((item) => {
      if (item.text() === "Upload and Download") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", uploadDownlUrl);

    const fileToUpload = 'Tuff.jpg';

    cy.get(uploadDownload.uploadSelector).attachFile(fileToUpload)
    expect(cy.get(uploadDownload.uploadPath).should('be.visible'))
  });

  it("should successfully download files", () => {
    cy.siteNavigate();

    cy.get(uploadDownload.uploadDownldEle).each((item) => {
      if (item.text() === "Upload and Download") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", uploadDownlUrl);
    cy.get(uploadDownload.downloadButton).click()
  })

});
