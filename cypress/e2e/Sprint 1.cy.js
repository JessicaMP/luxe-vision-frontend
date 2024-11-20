/* eslint-disable no-undef */
const pages = ["/", "/login", "/register"];
const viewports = [
  { name: "iphone-6", type: "mobile", cols: 1 },
  { name: "ipad-2", type: "tablet", cols: 2 },
  { name: "macbook-11", type: "desktop", cols: 3 },
  { name: "macbook-16", type: "desktop", cols: 3 },
];

describe("Historia #1 - Header", () => {
  pages.forEach((page) => {
    it(`Header should be 100% width on ${page}`, () => {
      cy.visit(page);
      cy.get("header")
        .should("be.visible")
        .then(($header) => {
          const headerWidth = $header.width();
          const bodyWidth = Cypress.$("body").width();
          expect(headerWidth).to.equal(bodyWidth);
        });
    });

    it(`Header should be fixed at the top on ${page}`, () => {
      cy.visit(page);
      cy.get("header").should("have.css", "position", "fixed");
    });

    it(`Header should be consistent and usable on ${page}`, () => {
      cy.visit(page);
      cy.get("header").should("exist").and("be.visible");
    });

    it(`Header should be optimized for different devices on ${page}`, () => {
      viewports.forEach((viewport) => {
        cy.viewport(viewport.name);
        cy.visit(page);
        cy.get("header").should("be.visible");

        if (viewport.type === "desktop") {
          cy.get("header").within(() => {
            cy.contains("Log in").should("exist").and("be.visible");
            cy.contains("Register").should("exist").and("be.visible");
          });
        } else if (viewport.type === "mobile" || viewport.type === "tablet") {
          cy.get("header").within(() => {
            cy.get("#hamburger-menu").should("exist").and("be.visible");
          });
        }
      });
    });

    it(`Header should have logo and slogan aligned left on ${page}`, () => {
      cy.visit(page);
      cy.get("header #logo-luxe-vision").should("exist").and("be.visible");
      cy.get("header #slogan").should("exist").and("be.visible");
    });

    it(`Clicking logo and slogan redirects to home on ${page}`, () => {
      cy.visit(page);
      cy.get("header #logo-luxe-vision").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");

      cy.visit(page);
      cy.get("header #slogan").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });
});

describe("Historia #2 - Home", () => {
  it("Body has 3 sections", () => {
    cy.visit("/");
    cy.wait(1500);
    cy.get("body").should("exist").and("be.visible");
    cy.get("body #search-section").should("exist").and("be.visible");
    cy.get("body #category-section").should("exist").and("be.visible");
    cy.get("body #recommendations-section").should("exist").and("be.visible");
  });
});

describe("Historia #4 - Visualizar productos", () => {
  it("Debe mostrar 10 productos", () => {
    cy.visit("/");
    cy.get(".studio-card").should("have.length.at.most", 10);
  });

  it("Productos deben ser unicos y aleatorios", () => {
    cy.visit("/");
    const productNames = [];
    cy.get(".studio-card").each(($el) => {
      const name = $el.find(".studio-name").text();
      expect(productNames).not.to.include(name);
      productNames.push(name);
    });
  });

  it("Productos deben mostrarse en maximo 2 columnas y 5 filas", () => {
    cy.visit("/");
    viewports.forEach((viewport) => {
      cy.viewport(viewport.name);

      cy.get("#grid-recommendations").within(() => {
        if (viewport.type === "desktop") {
          cy.get(".studio-card").should("have.length", viewport.cols * 2);
        }
        if (viewport.type === "tablet") {
          cy.get(".studio-card").should("have.length", viewport.cols * 2);
        }
        if (viewport.type === "mobile") {
          cy.get(".studio-card").should("have.length", viewport.cols * 2);
        }
      });
    });
  });
});
