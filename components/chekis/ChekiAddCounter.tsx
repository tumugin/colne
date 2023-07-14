import { Icon } from '@cloudscape-design/components'
import React, { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import * as awsui from '@cloudscape-design/design-tokens'
import { vibrateCompat } from 'utils/vibrate'

const Wrapper = styled.div`
  display: flex;
  gap: ${awsui.spaceScaledXs};
  align-items: center;
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

const CustomBigNumberInput = styled.input<{ triggerAnimation: boolean }>`
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

  animation: ${(props) =>
    props.triggerAnimation ? 'shake 0.2s linear' : 'none'};

  @keyframes shake {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(0, 4px);
    }
    50% {
      transform: translate(0, 0);
    }
    75% {
      transform: translate(0, -4px);
    }
    100% {
      transform: translate(0, 0);
    }
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
  const [triggerAnimation, setTriggerAnimation] = React.useState(false)
  const performTriggerAnimation = useCallback(() => {
    setTriggerAnimation(false)
    setTriggerAnimation(true)
    vibrateCompat(50)
    setTimeout(() => {
      setTriggerAnimation(false)
    }, 200)
  }, [])
  const handleOnIncrease = useCallback(() => {
    onChange && onChange(countValue + 1)
    performTriggerAnimation()
  }, [countValue, onChange, performTriggerAnimation])
  const handleOnDecrease = useCallback(() => {
    onChange && onChange(countValue - 1)
    performTriggerAnimation()
  }, [countValue, onChange, performTriggerAnimation])
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === '') {
        onChange && onChange(0)
        return
      }
      if (
        (minValue ? parseInt(e.target.value) < minValue : false) ||
        (maxValue ? parseInt(e.target.value) > maxValue : false)
      ) {
        return
      }
      onChange && onChange(parseInt(e.target.value))
    },
    [maxValue, minValue, onChange],
  )

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
        triggerAnimation={triggerAnimation}
        onChange={handleOnChange}
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
