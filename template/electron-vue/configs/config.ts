import { ConfigParams } from '@rsbuild/core'
import { pluginEslint } from '@rsbuild/plugin-eslint'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'
import { pluginTypeCheck } from '@rsbuild/plugin-type-check'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'

export function createPlugins({ command }: Pick<ConfigParams, 'command'>) {
    return {
        plugins: [
            command !== 'build' && pluginTypeCheck(),
            command !== 'build' &&
                pluginEslint({
                    eslintPluginOptions: {
                        configType: 'flat'
                    }
                })
        ],
        rspackPlugin: [
            new StylelintWebpackPlugin(),
            process.env.RSDOCTOR && new RsdoctorRspackPlugin()
        ]
    }
}

export const OUTPUT_ROOT = 'dist'
