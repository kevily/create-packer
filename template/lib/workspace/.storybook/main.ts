import svgr from '@svgr/rollup'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: [`../packages/**/*.mdx`, `../packages/**/*.stories.@(js|jsx|ts|tsx)`],
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
        config.plugins!.unshift(svgr({ svgo: false, titleProp: true, ref: true }) as any)
        return config
    },
    docs: {
        autodocs: 'tag'
    }
}
export default config
