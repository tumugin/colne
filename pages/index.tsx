import type { NextPage } from "next"
import React from "react"
import { Header, SpaceBetween } from "@cloudscape-design/components"

const Home: NextPage = () => {
  return (
    <SpaceBetween size="m">
      <Header variant="h1">Hello World!</Header>
    </SpaceBetween>
  )
}

export default Home
