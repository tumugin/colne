import React from 'react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'

describe('<ChekiAddCounter>', () => {
  it('mounts with smartphone', () => {
    cy.viewport('iphone-xr')
    cy.mount(<ChekiAddCounter countValue={123} />)
    cy.matchImage()
  })

  it('mounts with pc', () => {
    cy.viewport('macbook-16')
    cy.mount(<ChekiAddCounter countValue={123} />)
    cy.matchImage()
  })
})
