// cypress/e2e/Sprint4.cy.js

/* eslint-disable no-undef */

export const login = () => {
  cy.visit("/login");
  cy.get('input[name="email"]').type("user@user.com");
  cy.get('input[name="password"]').type("useruser");
  cy.get('button[type="submit"]').click();
};

describe("Calendario de reservas", () => {
  beforeEach(() => {
    cy.visit("/studio/1");
  });

  it("Permite seleccionar una fecha disponible", () => {
    // Método 1: Seleccionar por el número de día
    cy.get('[data-cy="booking-calendar"]').within(() => {
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .should("have.attr", "aria-selected", "true");
    });
  });

  it("No permite seleccionar fechas no disponibles", () => {
    cy.get('[data-cy="booking-calendar"]').within(() => {
      // Encontrar un botón deshabilitado
      cy.get("td button.disabled, td button[disabled], td button.line-through")
        .eq(1)
        .should(($button) => {
          // Verificar que el botón cumple al menos una de estas condiciones
          expect(
            $button.is("[disabled]") ||
              $button.hasClass("disabled") ||
              $button.hasClass("line-through")
          ).to.be.true;

          // Verificar que no está seleccionado
          expect($button.attr("aria-selected")).to.not.equal("true");
        });
    });
  });

  it("Muestra correctamente los horarios reservados", () => {
    cy.get('[data-cy="booking-calendar"]').within(() => {
      // Encontrar un botón deshabilitado
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .should("have.attr", "aria-selected", "true");
    });

    cy.get('[data-cy="booking-timeStart"]').find("button").first().click();
    cy.get('[role="listbox"]').should("be.visible").first().click();

    cy.get('[data-cy="booking-timeStart"]').find("button").eq(1).click();
    cy.get('[role="listbox"]').should("be.visible");
  });

  it("Permite seleccionar una fecha y horarios y muestra la selección en el formulario", () => {
    let date;
    let timeStart;
    let timeEnd;
    // Selección de fecha
    cy.get('[data-cy="booking-calendar"]').within(() => {
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .then(($btn) => {
          expect($btn.attr("aria-selected")).to.equal("true");
          date = $btn.text();
        });
    });

    // Selección de horario de inicio
    cy.get('[data-cy="booking-timeStart"]').find("button").first().click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .first()
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeStart = $btn.text();
      });

    // Selección de horario de fin
    cy.get('[data-cy="booking-timeStart"]').find("button").eq(1).click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .eq(1)
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeEnd = $btn.text();
      });

    // Verificar visualización
    cy.get('[data-cy="booking-summary"]').within(() => {
      cy.get("> div")
        .eq(1)
        .within(() => {
          cy.get("> div")
            .eq(1)
            .within(() => {
              cy.get("> label").eq(1).contains(date);
            });
          cy.get("> div")
            .eq(2)
            .within(() => {
              cy.get("> label").eq(1).contains(timeStart);
              cy.get("> label").eq(1).contains(timeEnd);
            });
        });
    });

    // Selección de especialidad
    cy.get('[data-cy="booking-specialty"]').find("button").click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
  });
});

describe("Historia #31 - Reservas: Visualizar detalles", () => {
  beforeEach(() => {
    cy.visit("/studio/1");
  });

  it("Verificar visualización completa de información de la reserva", () => {
    let date;
    let timeStart;
    let timeEnd;
    // Selección de fecha
    cy.get('[data-cy="booking-calendar"]').within(() => {
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .then(($btn) => {
          expect($btn.attr("aria-selected")).to.equal("true");
          date = $btn.text();
        });
    });

    // Selección de horario de inicio
    cy.get('[data-cy="booking-timeStart"]').find("button").first().click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .first()
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeStart = $btn.text();
      });

    // Selección de horario de fin
    cy.get('[data-cy="booking-timeStart"]').find("button").eq(1).click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .eq(1)
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeEnd = $btn.text();
      });

    // Verificar visualización
    cy.get('[data-cy="booking-summary"]').within(() => {
      cy.get("> div")
        .eq(1)
        .within(() => {
          cy.get("> div")
            .eq(1)
            .within(() => {
              cy.get("> label").eq(1).contains(date);
            });
          cy.get("> div")
            .eq(2)
            .within(() => {
              cy.get("> label").eq(1).contains(timeStart);
              cy.get("> label").eq(1).contains(timeEnd);
            });
        });
    });

    // Selección de especialidad
    cy.get('[data-cy="booking-specialty"]').find("button").click();
    cy.get('[role="listbox"]').should("be.visible").first().click();

    // Confirmación de reserva
    cy.get('[data-cy="booking-reserve-button"]').click();

    cy.get('[data-cy="booking-login-modal"]').should("be.visible");
  });

  it("Verificar visualización de datos del usuario", () => {
    let date;
    let timeStart;
    let timeEnd;
    // Selección de fecha
    cy.get('[data-cy="booking-calendar"]').within(() => {
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .then(($btn) => {
          expect($btn.attr("aria-selected")).to.equal("true");
          date = $btn.text();
        });
    });

    // Selección de horario de inicio
    cy.get('[data-cy="booking-timeStart"]').find("button").first().click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .first()
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeStart = $btn.text();
      });

    // Selección de horario de fin
    cy.get('[data-cy="booking-timeStart"]').find("button").eq(1).click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .eq(1)
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeEnd = $btn.text();
      });

    // Verificar visualización
    cy.get('[data-cy="booking-summary"]').within(() => {
      cy.get("> div")
        .eq(1)
        .within(() => {
          cy.get("> div")
            .eq(1)
            .within(() => {
              cy.get("> label").eq(1).contains(date);
            });
          cy.get("> div")
            .eq(2)
            .within(() => {
              cy.get("> label").eq(1).contains(timeStart);
              cy.get("> label").eq(1).contains(timeEnd);
            });
        });
    });

    // Selección de especialidad
    cy.get('[data-cy="booking-specialty"]').find("button").click();
    cy.get('[role="listbox"]').should("be.visible").first().click();

    // Confirmación de reserva
    cy.get('[data-cy="booking-reserve-button"]').click();

    cy.get('[data-cy="booking-login-modal"]').should("be.visible").click();

    cy.get('input[name="email"]').type("user@user.com");
    cy.get('input[name="password"]').type("useruser");
    cy.get('button[type="submit"]').click();

    cy.get('input[name="firstName"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");

    cy.get('[data-cy="quote-reservation"]').should("be.visible");
  });
});

describe("Historia #32 - Realizar reserva", () => {
  beforeEach(() => {
    cy.visit("/studio/1");
  });

  it("Verificar confirmación exitosa de reserva", () => {
    // Completar formulario
    let date;
    let timeStart;
    let timeEnd;
    // Selección de fecha
    cy.get('[data-cy="booking-calendar"]').within(() => {
      cy.get("td button:not(:disabled)")
        .eq(1)
        .click()
        .then(($btn) => {
          expect($btn.attr("aria-selected")).to.equal("true");
          date = $btn.text();
        });
    });

    // Selección de horario de inicio
    cy.get('[data-cy="booking-timeStart"]').find("button").first().click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .first()
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeStart = $btn.text();
      });

    // Selección de horario de fin
    cy.get('[data-cy="booking-timeStart"]').find("button").eq(1).click();
    cy.get('[role="listbox"]').should("be.visible").first().click();
    cy.get('[data-cy="booking-timeStart"]')
      .eq(1)
      .within(() => cy.get("> button > span > div"))
      .then(($btn) => {
        timeEnd = $btn.text();
      });

    // Verificar visualización
    cy.get('[data-cy="booking-summary"]').within(() => {
      cy.get("> div")
        .eq(1)
        .within(() => {
          cy.get("> div")
            .eq(1)
            .within(() => {
              cy.get("> label").eq(1).contains(date);
            });
          cy.get("> div")
            .eq(2)
            .within(() => {
              cy.get("> label").eq(1).contains(timeStart);
              cy.get("> label").eq(1).contains(timeEnd);
            });
        });
    });

    // Selección de especialidad
    cy.get('[data-cy="booking-specialty"]').find("button").click();
    cy.get('[role="listbox"]').should("be.visible").first().click();

    // Confirmación de reserva
    cy.get('[data-cy="booking-reserve-button"]').click();

    cy.get('[data-cy="booking-login-modal"]').should("be.visible").click();

    cy.get('input[name="email"]').type("user@user.com");
    cy.get('input[name="password"]').type("useruser");
    cy.get('button[type="submit"]').click();

    cy.get('input[name="firstName"]').should("be.visible");
    cy.get('input[name="lastName"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");

    cy.get('[data-cy="quote-reservation"]')
      .should("be.visible")
      .within(() => {
        cy.get("button").click();
      });

    cy.get("h2").should("contain", "Reservation successfully completed");
  });
});

describe("Historia #33 - Acceder a historial", () => {
  beforeEach(() => {
    cy.visit("/bookings");
  });

  it("Verificar visualización del historial de reservas", () => {
    cy.get('[data-cy="booking-item"]').should("have.length.at.least", 1);
  });

  it("Verificar orden cronológico de reservas", () => {
    cy.get('[data-cy="booking-date"]').then(($dates) => {
      const dates = $dates.map((i, el) => new Date(el.textContent)).get();
      const sortedDates = [...dates].sort((a, b) => b - a);
      expect(dates).to.deep.equal(sortedDates);
    });
  });

  it("Verificar detalles de reservas en historial", () => {
    cy.get('[data-cy="booking-item"]')
      .first()
      .within(() => {
        cy.get('[data-cy="studio-name"]').should("be.visible");
        cy.get('[data-cy="booking-date"]').should("be.visible");
        cy.get('[data-cy="usage-date"]').should("be.visible");
      });
  });
});
