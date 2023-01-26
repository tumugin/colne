import { Icon, Input } from '@cloudscape-design/components'
import React from 'react'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'

const Wrapper = styled.div`
  display: flex;
  gap: ${awsui.spaceScaledXs};
`

const CustomBigButton = styled.button`
  appearance: none;
  display: grid;
  place-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${awsui.colorTextButtonNormalActive};

  &:hover {
    color: ${awsui.colorTextButtonNormalHover};
  }
`

export function ChekiAddCounter({ countValue }: { countValue: number }) {
  return (
    <Wrapper>
      <CustomBigButton>
        <Icon name="angle-down" size="big" variant="normal" />
      </CustomBigButton>
      <Input value={countValue.toString()} inputMode="numeric" type="number" />
      <CustomBigButton>
        <Icon name="angle-up" size="big" variant="normal" />
      </CustomBigButton>
    </Wrapper>
  )
}
