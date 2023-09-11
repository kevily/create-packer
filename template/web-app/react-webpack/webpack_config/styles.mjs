import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SCOPE_CLASS_NAME } from './constant.mjs'

export function createStyleLoader(build) {
    return build ? MiniCssExtractPlugin.loader : 'style-loader'
}

export function createCssLoader(module) {
    if (module) {
        return {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                modules: {
                    mode: 'local',
                    localIdentName: SCOPE_CLASS_NAME
                }
            }
        }
    }
    return 'css-loader'
}
