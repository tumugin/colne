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
  transition: color ${awsui.motionDurationExpressive};
  color: ${awsui.colorTextInteractiveDefault};

  &:hover {
    color: ${awsui.colorTextInteractiveHover};
  }
`

const CustomBigNumberInput = styled.input`
  appearance: none;
  border: none;
  background: transparent;
  font-family: ${awsui.fontFamilyMonospace};
  font-size: ${awsui.spaceScaledXxl};
  text-align: center;
  width: 100px;
`

export function ChekiAddCounter({
  countValue,
  minValue,
}: {
  countValue: number
  minValue?: number
}) {
  return (
    <Wrapper>
      <CustomBigButton>
        <Icon name="angle-down" size="big" variant="normal" />
      </CustomBigButton>
      <CustomBigNumberInput
        value={countValue.toString()}
        type="number"
        min={minValue}
      />
      <CustomBigButton>
        <Icon name="angle-up" size="big" variant="normal" />
      </CustomBigButton>
    </Wrapper>
  )
}
