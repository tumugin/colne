import * as awsui from '@cloudscape-design/design-tokens'

export function useToastTheme() {
  return {
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
  }
}
