import React from 'react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'
import { stubDarkMode } from "test-utils/cypress-darkmode";

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

describe('<ChekiAddCounter> dark mode', () => {
  it('mounts with smartphone', () => {
    stubDarkMode(cy)
    cy.viewport('iphone-xr')
    cy.mount(<ChekiAddCounter countValue={123} />)
    cy.matchImage()
  })

  it('mounts with pc', () => {
    stubDarkMode(cy)
    cy.viewport('macbook-16')
    cy.mount(<ChekiAddCounter countValue={123} />)
    cy.matchImage()
  })
})
