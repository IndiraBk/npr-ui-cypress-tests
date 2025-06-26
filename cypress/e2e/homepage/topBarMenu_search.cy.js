/// <reference types="cypress" />
import 'cypress-real-events/support';

describe('NPR Homepage - Top bar Menu navigation', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('/');
  });

  it('Should display all main top bar menu options', () => {
    cy.fixture('topBarMenus').then((data) => {
      data.menuItems.forEach((itemText) => {
        cy.get('[class="menu__list"] li a')
          .contains(itemText)
          .should('be.visible');
      });
    });
  });

  it('Should display all submenu items for each top bar menu on hover', () => {
    cy.fixture('topBarMenus').then(({ dropdownMenus }) => {
      Object.entries(dropdownMenus).forEach(([menu, config]) => {
        const { className, submenuClass, items, categories } = config;

        cy.get(`.menu__item.${className}`)
          .scrollIntoView()
          .realHover();

        cy.get(`.${submenuClass}`)
          .should('exist')
          .should('have.css', 'visibility', 'visible');

        if (items) {
          items.forEach((subItem) => {
            cy.get(`.${submenuClass}`)
              .contains('a', subItem, { timeout: 5000 })
              .should('be.visible');
          });
        }

        if (categories) {
          Object.entries(categories).forEach(([categoryName, { categoryClass, items }]) => {
            const categorySelector = `.${submenuClass} .${categoryClass}`;
            const listSelector = `.${submenuClass} .submenu__list--${categoryName.toLowerCase()}`;

            cy.get(categorySelector)
              .should('exist')
              .should('be.visible');

            cy.get(listSelector)
              .should('exist')
              .should('be.visible');

            items.forEach((subItem) => {
              cy.get(listSelector)
                .contains('a', subItem, { timeout: 5000 })
                .should('be.visible');
            });
          });
        }
      });
    });
  });
});
