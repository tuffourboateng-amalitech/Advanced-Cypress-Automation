describe("Testing browser tab of ToolsQA website", () => {
  it("new tab test", () => {
    cy.alertsNavigate();
    cy.contains("Browser Windows", { matchCase: false }).click();
    cy.url().should("equal", "https://demoqa.com/browser-windows");
    // testing new tab functionality
    cy.get("#tabButton")
      .click()
      .then(() => {
        cy.visit("https://demoqa.com/sample");
        cy.url().should("equal", "https://demoqa.com/sample");
      });
  });

  it("new browser window test", () => {
    cy.alertsNavigate();
    cy.contains("Browser Windows", { matchCase: false }).click();
    cy.url().should("equal", "https://demoqa.com/browser-windows");
    //  testing new browser window functionality

    cy.window().then((win) => {
      const initialWindows = win.length;
      cy.get("#windowButton").click();
      cy.wait(3000);
      cy.window().then((newWin) => {
        const newWindowsCount = newWin.length;
        expect(newWindowsCount).to.be.greaterThan(initialWindows);
      });
    });
  });

  it("new window with text", () => {
    cy.alertsNavigate();
    cy.contains("Browser Windows", { matchCase: false }).click();
    cy.url().should("equal", "https://demoqa.com/browser-windows");
    //  testing new browser with texts displays in it

    cy.get("#messageWindowButton").click();
    cy.wait(3000);
    cy.window().then((win) => {
      let newWindow = null;
      for (let i = 0; i < win.parent.window.length; i++) {
        if (win.parent.window[i].location.href === "about:blank") {
          newWindow = win.parent.window[i];
          break;
        }
      }
      if (newWindow != null) {
        newWindow.focus();
        cy.get("body").then((body) => {
          expect(body[0].innerText).to.include(
            "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization."
          );
        });
      }
    });
  });

  it("listens for window alerts", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-1").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/alerts");

    // testing window alert button
    cy.get("#alertButton").click();
    cy.on("window:alert", (winalert) => {
      expect(winalert).to.exist();
      cy.get(winalert.body).contains("button");
    });
  });

  it("listens for windows alerts within 5 seconds", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-1").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/alerts");
    // testing for window alert within 5 minutes
    cy.get("#timerAlertButton").click();
    cy.wait(5000);
    cy.on("window:alert", (winalert) => {
      expect(winalert).to.exist();
    });
  });

  it("listens for confirm box alert", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-1").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/alerts");

    // testing window alert button
    cy.get("#confirmButton").click();
    cy.on("window:confirm", (winconfirm) => {
      expect(winconfirm).to.exist();
    });
  });

  it("tests frames", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-2").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/frames");
    cy.get("#frame1").should("be.visible");
  });

  it("tests nested frames", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-3").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/nestedframes");
    cy.contains("parent frame", { matchCase: false }).should("be.visible");
    cy.contains("child frame", { matchCase: false }).should("be.visible");
  });

  it.only("test modal dialogs", () => {
    cy.alertsNavigate();
    cy.get(".menu-list>#item-4").eq(1).click();
    cy.url().should("equal", "https://demoqa.com/modal-dialogs");
    cy.get("#showSmallModal").click();
    cy.get(".modal-header").find("div").should("have.text", "Small Modal");
    cy.get(".modal-content>:nth-child(2)").should(
      "have.text",
      "This is a small modal. It has very less content"
    );
    cy.get(".modal-footer").find("button").click();

    cy.get("button[id='showLargeModal']").click();
    cy.get(".modal-header").find("div").should("have.text", "Large Modal");
    cy.get(".modal-content>:nth-child(2)")
      .find("p")
      .should(
        "have.text",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      );
    cy.get(".modal-footer").find("button").click();
  });
});
