import { Icon, Input } from '@cloudscape-design/components'
import React, { useCallback } from 'react'
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export function ChekiAddCounter({
  countValue,
  minValue,
  maxValue,
  onChange,
}: {
  countValue: number
  minValue?: number
  maxValue?: number
  onChange?: (value: number) => void
}) {
  const handleOnIncrease = useCallback(() => {
    onChange && onChange(countValue + 1)
  }, [countValue, onChange])
  const handleOnDecrease = useCallback(() => {
    onChange && onChange(countValue - 1)
  }, [countValue, onChange])

  return (
    <Wrapper>
      <CustomBigButton
        onClick={handleOnDecrease}
        disabled={minValue ? countValue - 1 < minValue : false}
      >
        <Icon name="angle-down" size="big" variant="normal" />
      </CustomBigButton>
      <CustomBigNumberInput
        value={countValue.toString()}
        type="number"
        min={minValue}
        max={maxValue}
      />
      <CustomBigButton
        onClick={handleOnIncrease}
        disabled={maxValue ? countValue + 1 > maxValue : false}
      >
        <Icon name="angle-up" size="big" variant="normal" />
      </CustomBigButton>
    </Wrapper>
  )
}
