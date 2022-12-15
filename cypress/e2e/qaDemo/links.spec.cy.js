import { linkSelector } from "../../selectors/linksSelector";
import projectUrls from "../../urls/urls";
describe("Automation for dummy QA website", () => {
  const { linksUrl } = projectUrls;
  it.only("should successfully click the api-links provided on the website", () => {
    cy.siteNavigate();

    cy.get(linkSelector.linkElement).each((item) => {
      if (item.text() === "Links") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", linksUrl);

    cy.get(linkSelector.created).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 201 and status text Created"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.noContent).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 204 and status text No Content"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.moved).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 301 and status text Moved Permanently"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.badRequest).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 400 and status text Bad Request"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.unauthorized).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 401 and status text Unauthorized"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.forbidden).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 403 and status text Forbidden"
        )
        .should("be.visible")
    );

    cy.get(linkSelector.notFound).click();
    expect(
      cy
        .contains(
          linkSelector.dynamicResponse,
          "Link has responded with staus 404 and status text Not Found"
        )
        .should("be.visible")
    );
  });

  
  it("should successfully click the simple-link that navigates to a new tab", () => {
    cy.siteNavigate();

    cy.get(linkSelector.linkElement).each((item) => {
      if (item.text() === "Links") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", linksUrl);

    cy.get("#simpleLink").invoke("removeAttr", "target").click();
    expect(cy.get(".banner-image").should("be.visible"));
  });

  it("should successfully click the dynamic-link that navigates to a new tab", () => {
    cy.siteNavigate();

    cy.get(linkSelector.linkElement).each((item) => {
      if (item.text() === "Links") {
        cy.wrap(item).click();
      }
    });
    cy.url().should("equal", linksUrl);

    cy.get("#dynamicLink").invoke("removeAttr", "target").click();
    expect(cy.get("header > a > img").should("be.visible"));
  });
});
