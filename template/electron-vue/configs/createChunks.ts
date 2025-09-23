import { SplitChunks } from '@rsbuild/core'

export function createChunks(
    chunks: Array<{ name: string; libs: string[] | RegExp; priority?: number }>
) {
    const result: Exclude<SplitChunks, false>['cacheGroups'] = {
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendors',
            priority: -1
        }
    }
    chunks.forEach(({ name, libs, priority }) => {
        result[name] = {
            test: Array.isArray(libs)
                ? new RegExp(`[\\\\/]node_modules[\\\\/](${libs.join('|')})[\\\\/]`)
                : libs,
            chunks: 'all',
            name,
            priority
        }
        return result
    })
    return result
}
