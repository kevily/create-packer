import * as React from 'react'
import type { Preview } from '@storybook/react'

const preview: Preview = {
    decorators: [Story => <Story />],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/
            }
        }
    }
}

export default preview
