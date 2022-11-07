import '@cloudscape-design/global-styles/index.css'
import { ThemeWrapper } from '../stories/decorator/ThemeWrapper'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (renderStory) => <ThemeWrapper>{renderStory()}</ThemeWrapper>,
]
