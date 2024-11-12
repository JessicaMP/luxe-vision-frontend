/* eslint-disable no-undef */
const pages = ["/", "/login", "/register"];
const viewports = [
  { name: "iphone-6", type: "mobile" },
  { name: "ipad-2", type: "mobile" },
  { name: "macbook-11", type: "desktop" },
  { name: "macbook-16", type: "desktop" },
];
const API_URL = "http://localhost:5173";

describe("Historia #1 - Header", () => {
  pages.forEach((page) => {
    it(`Header should be 100% width on ${page}`, () => {
      cy.visit(API_URL + page);
      cy.get("header")
        .should("be.visible")
        .then(($header) => {
          const headerWidth = $header.width();
          const bodyWidth = Cypress.$("body").width();
          expect(headerWidth).to.equal(bodyWidth);
        });
    });

    it(`Header should be fixed at the top on ${page}`, () => {
      cy.visit(API_URL + page);
      cy.get("header").should("have.css", "position", "fixed");
    });

    it(`Header should be consistent and usable on ${page}`, () => {
      cy.visit(API_URL + page);
      cy.get("header").should("exist").and("be.visible");
    });

    it(`Header should be optimized for different devices on ${page}`, () => {
      viewports.forEach((viewport) => {
        cy.viewport(viewport.name);
        cy.visit(API_URL + page);
        cy.get("header").should("be.visible");

        if (viewport.type === "desktop") {
          cy.get("header").within(() => {
            cy.contains("Log in").should("exist").and("be.visible");
            cy.contains("Register").should("exist").and("be.visible");
          });
        } else if (viewport.type === "mobile") {
          cy.get("header").within(() => {
            cy.get("#hamburger-menu").should("exist").and("be.visible");
          });
        }
      });
    });

    it(`Header should have logo and slogan aligned left on ${page}`, () => {
      cy.visit(API_URL + page);
      cy.get("header #logo-luxe-vision").should("exist").and("be.visible");
      cy.get("header #slogan").should("exist").and("be.visible");
    });

    it(`Clicking logo and slogan redirects to home on ${page}`, () => {
      cy.visit(API_URL + page);
      cy.get("header #logo-luxe-vision").click();
      cy.url().should("eq", API_URL + "/");

      cy.visit(API_URL + page);
      cy.get("header #slogan").click();
      cy.url().should("eq", API_URL + "/");
    });
  });
});

describe("Historia #2 - Home", () => {
  it("Body has 3 sections", () => {
    cy.visit(API_URL + "/");
    cy.wait(1000);
    cy.get("body").should("exist").and("be.visible");
    cy.get("body #search-section").should("exist").and("be.visible");
    cy.get("body #category-section").should("exist").and("be.visible");
    cy.get("body #recommendations-section").should("exist").and("be.visible");
  });
});
