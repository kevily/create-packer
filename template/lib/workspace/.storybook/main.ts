import svgr from '@svgr/rollup'
import type { StorybookConfig } from '@storybook/react-vite'

function createStories(lib: string): string[] {
    return [
        `../packages/${lib}/src/**/*.mdx`,
        `../packages/${lib}/src/**/*.stories.@(js|jsx|ts|tsx)`
    ]
}

const config: StorybookConfig = {
    stories: [...createStories('ts'), ...createStories('react')],
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
        config.plugins!.unshift(
            svgr({ svgo: false, titleProp: true, ref: true, icon: '1em' }) as any
        )
        return config
    },
    docs: {
        autodocs: 'tag'
    }
}
export default config
