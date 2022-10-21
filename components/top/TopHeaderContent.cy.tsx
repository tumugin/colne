import { TopHeaderContent } from './TopHeaderContent'

describe('<TopHeaderContent>', () => {
  it('mounts with smartphone', () => {
    cy.viewport('iphone-xr')
    cy.mount(<TopHeaderContent />)
    cy.matchImage()
  })
  it('mounts with pc', () => {
    cy.viewport(1920, 1080)
    cy.mount(<TopHeaderContent />)
    cy.matchImage()
  })
})
