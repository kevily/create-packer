import { type BuildEnvironmentOptions } from 'vite'

type OutputOption<T> = T extends Array<infer O> ? O : T
type CodeSplitting = NonNullable<
    OutputOption<NonNullable<BuildEnvironmentOptions['rolldownOptions']>['output']>
>['codeSplitting']

export function createCodeSplitting(
    chunks: Array<{ name: string; libs: string[] | RegExp; priority: number }>
) {
    const result = {
        groups: [
            {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                priority: 1
            }
        ]
    } satisfies CodeSplitting
    chunks.forEach(({ name, libs, priority }) => {
        result.groups.unshift({
            test: Array.isArray(libs)
                ? new RegExp(`[\\\\/]node_modules[\\\\/](${libs.join('|')})[\\\\/]`)
                : libs,
            name,
            priority
        })
    })
    return result
}
