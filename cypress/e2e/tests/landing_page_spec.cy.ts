// cypress/e2e/landing_page_spec.ts

describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the app and checks the title', () => {
    cy.title().should('include', 'Brad Griffin, Professional');
  });

  it('should scroll through the landing page and check sections', () => {
    cy.get('#about-section').should('exist');
    cy.get('#education-section').should('exist');
    cy.get('#skills-section').should('exist');

    cy.scrollTo('bottom');
    cy.get('footer').should('exist');

    cy.get('footer a[href="https://www.facebook.com/brad.griffin.3975"]').should('exist');
    cy.get('footer a[href="https://www.linkedin.com/in/bradleyrgriffin/"]').should('exist');
    cy.get('footer a[href^="mailto:contact@bradleyrgriffin.me"]').should('exist');
  });

  it('should validate the header and menu items', () => {
    cy.get('.MuiToolbar-root').should('exist');
    cy.get('.MuiToolbar-root .MuiBox-root').eq(1).within(() => {
      cy.contains('Home').should('exist');
      cy.contains('LinkedIn').should('exist');
      cy.contains('Projects').should('exist');
      cy.contains('Contact').should('exist');
    });

    cy.get('.MuiToolbar-root .MuiBox-root a').should('have.length', 4);
    cy.get('.MuiToolbar-root .MuiBox-root a:contains("Contact")').should(
      'have.attr',
      'href',
      'mailto:contact@bradleyrgriffin.me'
    );
    cy.get('.MuiToolbar-root .MuiBox-root a:contains("Projects")').click();
    cy.url().should('include', '/projects');
    cy.get('#projects').should('exist');

    cy.get('.MuiToolbar-root .MuiBox-root a:contains("LinkedIn")').should(
      'have.attr',
      'href',
      'https://www.linkedin.com/in/bradleyrgriffin/'
    );
    cy.get('.MuiToolbar-root .MuiBox-root a:contains("Home")').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
