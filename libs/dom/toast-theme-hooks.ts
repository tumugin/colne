import * as awsui from '@cloudscape-design/design-tokens'
import { useMemo } from 'react'

export function useToastTheme() {
  return useMemo(
    () => ({
      success: {
        background: awsui.colorBackgroundNotificationGreen,
        color: awsui.colorTextBodyDefault,
      },
      error: {
        background: awsui.colorBackgroundNotificationRed,
        color: awsui.colorTextBodyDefault,
      },
      warning: {
        background: awsui.colorBackgroundNotificationBlue,
        color: awsui.colorTextBodyDefault,
      },
    }),
    [],
  )
}
