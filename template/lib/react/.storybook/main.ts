import svgr from 'vite-plugin-svgr'
import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions'
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {}
    },
    async viteFinal(config) {
        config.plugins.unshift(svgr())

        return config
    },
    docs: {
        autodocs: 'tag'
    }
}
export default config
