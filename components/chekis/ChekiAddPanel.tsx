import {
  Button,
  DatePicker,
  FormField,
  Grid,
} from '@cloudscape-design/components'
import React from 'react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'
import styled from 'styled-components'
import { Control, Controller } from 'react-hook-form'
import { ChekiAddContents } from 'pages/chekis/add'
import * as awsui from '@cloudscape-design/design-tokens'

const ChekiAddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${awsui.spaceScaledXl};
`

const CenterItem = styled.div`
  display: flex;
  justify-content: center;
`

interface ChekiAddRegulation {
  groupId: string
  groupName: string
  regulationId: string
  regulationName: string
  regulationComment: string
  regulationUnitPrice: number
}

export function ChekiAddPanel({
  control,
  regulations,
}: {
  control: Control<ChekiAddContents>
  regulations: ChekiAddRegulation[]
}) {
  return (
    <Grid
      gridDefinition={[
        { colspan: { default: 12, xl: 2, l: 3, s: 4, xs: 6 } },
        { colspan: { default: 12, xl: 10, l: 9, s: 8, xs: 6 } },
      ]}
    >
      <ChekiAddForm>
        <Controller
          rules={{ required: '日付の入力は必須です' }}
          render={({ field, fieldState }) => (
            <FormField
              label="チェキ撮影日"
              errorText={fieldState.error && fieldState.error.message}
            >
              <DatePicker
                onChange={({ detail }) => field.onChange(detail.value)}
                value={field.value}
                nextMonthAriaLabel="次の月"
                placeholder="YYYY/MM/DD"
                previousMonthAriaLabel="前の月"
                todayAriaLabel="今日"
                invalid={!!fieldState.error}
              />
            </FormField>
          )}
          name="chekiShotAt"
          control={control}
        />
        <Controller
          rules={{ required: true, min: 1, max: 1000 }}
          render={({ field }) => (
            <FormField label="チェキ撮影枚数">
              <CenterItem>
                <ChekiAddCounter
                  countValue={field.value}
                  onChange={field.onChange}
                  minValue={1}
                  maxValue={1000}
                />
              </CenterItem>
            </FormField>
          )}
          name="chekiQuantity"
          control={control}
        />
        <CenterItem>
          <Button variant="primary">チェキを追加する</Button>
        </CenterItem>
      </ChekiAddForm>
      <div>
        <FormField label="レギュレーション"></FormField>
      </div>
    </Grid>
  )
}
