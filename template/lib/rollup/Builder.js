const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const fsExtra = require('fs-extra')
const chalk = require('chalk')

class Builder {
    constructor({ root = process.cwd(), main = 'index.ts', outputDir = 'lib' }) {
        this.root = root
        this.bundle = null
        this.external = [/node_modules/]
        this.input = {
            entry: path.join(this.root, main),
            plugins: []
        }
        // output
        // ----------------------------------------------------------------------
        this.output = {
            root: path.join(this.root, outputDir),
            files: [],
            plugins: []
        }
        this.init()
    }
    init() {
        this.onResetOutputFiles()
        this.output.plugins = []
        this.onRegisterInputPlugins([
            nodeResolve(),
            typescript({
                tsconfig: path.join(this.root, 'tsconfig.json'),
                useTsconfigDeclarationDir: true
            }),
            postcss()
        ])
        this.onRegisterOutputPlugins([
            getBabelOutputPlugin({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false
                        }
                    ]
                ]
            })
        ])
    }
    onResetOutputFiles(formats = ['esm', 'cjs']) {
        const entryInfo = path.parse(this.input.entry)
        this.output.files = formats?.map(format => {
            return {
                name: `${entryInfo.name}.${format}${entryInfo.ext}`,
                format
            }
        })
    }
    onRegisterInputPlugins(plugins) {
        this.input.plugins = this.input.plugins.concat(plugins)
    }
    onRegisterOutputPlugins(plugins) {
        this.output.plugins = this.output.plugins.concat(plugins)
    }
    async onCreateRollupBuild() {
        this.bundle = await rollup.rollup({
            external: this.external,
            input: this.input.entry,
            plugins: this.input.plugins
        })
    }
    async onWrite() {
        if (this.bundle === null) {
            throw new Error('Please create RollupBuild!')
        }
        const { plugins, root, files } = this.output
        fsExtra.removeSync(root)
        for (let index = 0; index < files.length; index++) {
            const fileInfo = files[index]
            await this.bundle.write({
                file: path.join(root, fileInfo.name),
                format: fileInfo.format,
                plugins
            })
        }
    }
    async onBuild(tip = 'Building...') {
        const building = ora(chalk.yellow(tip)).start()
        await this.onCreateRollupBuild()
        await this.onWrite()
        await bundle.close()
        building.succeed()
    }
}

exports.Builder = Builder
