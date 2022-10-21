import { TopHeaderContent } from './TopHeaderContent'

describe('<TopHeaderContent>', () => {
  it('mounts', () => {
    cy.mount(<TopHeaderContent />)
    cy.matchImage()
  })
})
