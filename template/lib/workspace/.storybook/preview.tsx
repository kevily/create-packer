import { type Preview } from '@storybook/react-vite'

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
    },
    tags: ['autodocs']
}

export default preview
