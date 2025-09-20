describe('portfolio smoke', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows navbar and sections', () => {
    cy.contains('Brian Conn');           // your logo/name
    cy.contains('About');                // navbar link
    cy.contains('Projects');             // section header
    cy.contains('Contact');              // section header
  });
});
