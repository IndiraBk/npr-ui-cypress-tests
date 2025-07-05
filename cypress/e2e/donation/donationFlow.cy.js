import "cypress-iframe";
import { faker } from "@faker-js/faker";

describe("NPR Donation Flow", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit("/donations/support");
  });

  it("Should switch between Donate to NPR Network and Local Station", () => {
    cy.contains("label", "Donate to a local station").click();
    cy.contains("label", "Donate to a local station").should(
      "have.class",
      "designation-types__item--selected"
    );
    cy.contains("label", "Donate to the NPR Network").click();
    cy.contains("label", "Donate to the NPR Network").should(
      "have.class",
      "designation-types__item--selected"
    );
    cy.get(".donation-recurrence-types").should("be.visible");
  });

  it("Should switch between Monthly and One-Time and display correct donation amounts", () => {
    cy.fixture("donationAmounts").then((donationAmounts) => {
      const expectedMonthly = donationAmounts.monthly;
      const expectedOneTime = donationAmounts.oneTime;

      cy.contains("label", "Donate to the NPR Network").as("nprOption").click();
      cy.get("@nprOption").should(
        "have.class",
        "designation-types__item--selected"
      );
      cy.get(".donation-recurrence-types").should("be.visible");

      cy.contains(".donation-recurrence-types__item", "Monthly")
        .as("monthlyOption")
        .click();
      cy.get("@monthlyOption").should(
        "have.class",
        "donation-recurrence-types__item--selected"
      );

      cy.get(".donation-amounts__item")
        .filter(":visible")
        .then(($labels) => {
          const visibleLabels = [...$labels]
            .map((label) => label.innerText.trim())
            .filter((text) => text && text !== "$");

          visibleLabels.forEach((text, index) => {
            expect(text).to.eq(expectedMonthly[index]);
          });
        });

      cy.contains(".donation-recurrence-types__item", "One-time")
        .as("oneTimeOption")
        .click();
      cy.get("@oneTimeOption").should(
        "have.class",
        "donation-recurrence-types__item--selected"
      );

      cy.get(".donation-amounts__item")
        .filter(":visible")
        .then(($labels) => {
          const visibleLabels = [...$labels]
            .map((label) => label.innerText.trim())
            .filter((text) => text && text !== "$");

          visibleLabels.forEach((text, index) => {
            expect(text).to.eq(expectedOneTime[index]);
          });
        });
    });
  });

  it("Should complete the donation form and payment information section", () => {
    cy.fixture("donationOptions").then((donation) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const email = faker.internet.email({ firstName, lastName });
      const address = faker.location.streetAddress();
      const city = faker.location.city();
      const zip = faker.location.zipCode("#####");

      cy.contains("label", "Donate to the NPR Network").click();
      cy.contains(".donation-recurrence-types__item", "One-time").click();
      cy.contains("button", "Continue to pay with credit card").click();

      cy.get('input[name="firstName"]').type(firstName);
      cy.get('input[name="lastName"]').type(lastName);
      cy.get('input[name="emailAddress"]').type(email);
      cy.get('input[name="billingAddress"]').type(address);
      cy.get('input[name="city"]').type(city);
      cy.get('input[name="zipcode"]').type(zip);
      cy.get('select[name="state"]').select(donation.state);
      cy.contains("button", "Continue to payment info").click();

      cy.contains("Payment Info").should("be.visible");
      cy.get('input[name="cardName"]').type(`${firstName} ${lastName}`);

      // Stripe input frames
      cy.get('iframe[title="Secure card number input frame"]', {
        timeout: 20000,
      }).should("exist");
      cy.iframe('iframe[title="Secure card number input frame"]')
        .find('input[data-elements-stable-field-name="cardNumber"]')
        .type(donation.cardNumber);

      cy.iframe('iframe[title="Secure expiration date input frame"]')
        .find('input[data-elements-stable-field-name="cardExpiry"]')
        .type(donation.cardExpiry);

      cy.iframe('iframe[title="Secure CVC input frame"]')
        .find('input[data-elements-stable-field-name="cardCvc"]')
        .type(donation.cardCvc);

      cy.contains("$150").should("be.visible");
      cy.contains("button", "Donate Now").should("be.visible");
    });
  });
});
