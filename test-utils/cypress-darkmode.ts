export function stubDarkMode(cy: Cypress.cy) {
  cy.on('window:before:load', (win) => {
    cy.stub(win, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: true,
      })
  })
}
