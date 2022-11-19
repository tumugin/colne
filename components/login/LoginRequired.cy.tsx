import { LoginRequired } from 'components/login/LoginRequired'

describe('<LoginRequired>', () => {
  it('mounts with smartphone', () => {
    cy.viewport('iphone-xr')
    cy.mount(<LoginRequired />)
    cy.matchImage()
  })

  it('mounts with pc', () => {
    cy.viewport('macbook-16')
    cy.mount(<LoginRequired />)
    cy.matchImage()
  })
})
