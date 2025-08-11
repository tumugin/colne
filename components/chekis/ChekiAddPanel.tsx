import {
  Box,
  Button,
  Cards,
  DatePicker,
  FormField,
  Grid,
} from '@cloudscape-design/components'
import React, { useMemo } from 'react'
import { ChekiAddCounter } from 'components/chekis/ChekiAddCounter'
import styled from 'styled-components'
import { Control, Controller } from 'react-hook-form'
import * as awsui from '@cloudscape-design/design-tokens'
import { RegulationStatus } from '../../graphql/generated/client'

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
  regulationId: string | null
  regulationName: string
  regulationComment: string
  regulationUnitPrice: number
  regulationStatus: RegulationStatus
}

const emptyItem: ChekiAddRegulation = {
  groupId: '',
  groupName: '-',
  regulationId: null,
  regulationName: '選択なし',
  regulationComment: '-',
  regulationUnitPrice: 0,
  regulationStatus: RegulationStatus.Active,
}

export interface ChekiAddContents {
  idolId: string
  regulationId: string | null
  chekiQuantity: number
  chekiShotAt: string
}

export function ChekiAddPanel({
  control,
  regulations,
  isRegulationLoading,
  onSubmit,
}: {
  control: Control<ChekiAddContents>
  regulations: ChekiAddRegulation[]
  isRegulationLoading: boolean
  onSubmit: () => void
}) {
  const allRegulations = useMemo(
    () => [emptyItem, ...regulations],
    [regulations],
  )
  const activeRegulationsWithEmptyItem = useMemo(
    () => [
      emptyItem,
      ...regulations.filter(
        (v) => v.regulationStatus == RegulationStatus.Active,
      ),
    ],
    [regulations],
  )
  const disabledRegulations = useMemo(
    () =>
      regulations.filter(
        (v) => v.regulationStatus == RegulationStatus.NotActive,
      ),
    [regulations],
  )

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
          <Button variant="primary" onClick={onSubmit}>
            チェキを追加する
          </Button>
        </CenterItem>
      </ChekiAddForm>
      <div>
        <Controller
          rules={{
            validate: (value) =>
              allRegulations.some((i) => i.regulationId === value) ||
              'レギュレーションの選択は必須です',
          }}
          render={({ field, fieldState }) => (
            <FormField
              label="レギュレーション"
              errorText={fieldState.error && fieldState.error.message}
            >
              <Cards
                items={activeRegulationsWithEmptyItem}
                selectionType="single"
                selectedItems={activeRegulationsWithEmptyItem.filter(
                  (i) => i.regulationId === field.value,
                )}
                onSelectionChange={(selectedItems) =>
                  field.onChange(
                    selectedItems.detail.selectedItems[0].regulationId,
                  )
                }
                cardDefinition={{
                  header: (item) => item.regulationName,
                  sections: [
                    {
                      header: 'グループ',
                      content: (item) => item.groupName,
                    },
                    {
                      header: '単価',
                      content: (item) => item.regulationUnitPrice + '円',
                    },
                    {
                      header: '備考',
                      content: (item) => item.regulationComment,
                    },
                  ],
                }}
                cardsPerRow={[
                  { cards: 1 },
                  { minWidth: 500, cards: 2 },
                  { minWidth: 700, cards: 3 },
                  { minWidth: 1000, cards: 4 },
                ]}
                loading={isRegulationLoading}
              />
              {disabledRegulations.length > 0 && (
                <>
                  <Box variant="h5">すでに無効なレギュレーション</Box>
                  <Cards
                    items={disabledRegulations}
                    selectionType="single"
                    selectedItems={disabledRegulations.filter(
                      (i) => i.regulationId === field.value,
                    )}
                    onSelectionChange={(selectedItems) =>
                      field.onChange(
                        selectedItems.detail.selectedItems[0].regulationId,
                      )
                    }
                    cardDefinition={{
                      header: (item) => item.regulationName,
                      sections: [
                        {
                          header: 'グループ',
                          content: (item) => item.groupName,
                        },
                        {
                          header: '単価',
                          content: (item) => item.regulationUnitPrice + '円',
                        },
                        {
                          header: '備考',
                          content: (item) => item.regulationComment,
                        },
                      ],
                    }}
                    cardsPerRow={[
                      { cards: 1 },
                      { minWidth: 500, cards: 2 },
                      { minWidth: 700, cards: 3 },
                      { minWidth: 1000, cards: 4 },
                    ]}
                  />
                </>
              )}
            </FormField>
          )}
          name="regulationId"
          control={control}
        />
      </div>
    </Grid>
  )
}
