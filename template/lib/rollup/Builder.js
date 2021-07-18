const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const url = require('@rollup/plugin-url')
const { terser } = require('rollup-plugin-terser')
const filesize = require('rollup-plugin-filesize')
const { DEFAULT_EXTENSIONS } = require('@babel/core')
const fsExtra = require('fs-extra')
const ora = require('ora')
const chalk = require('chalk')

class Builder {
    constructor({ root = process.cwd(), main = 'index.ts', outputDir = 'lib' }) {
        this.root = root
        this.bundle = null
        this.external = [/node_modules/]
        this.entry = path.join(this.root, main)
        // output
        // ----------------------------------------------------------------------
        this.output = {
            root: path.join(this.root, outputDir),
            files: []
        }
        this.init()
    }
    init() {
        this.onSetFormat()
    }
    onSetFormat(formats = ['esm', 'cjs']) {
        const entryInfo = path.parse(this.entry)
        this.output.files = formats?.map(format => {
            return {
                file: path.join(this.output.root, `${entryInfo.name}.${format}.js`),
                format: format
            }
        })
    }
    async onCreateRollupBuild() {
        this.bundle = await rollup.rollup({
            external: this.external,
            input: this.entry,
            plugins: [
                postcss({
                    plugins: [require('postcss-assets')()]
                }),
                typescript({
                    tsconfig: path.join(this.root, 'tsconfig.json'),
                    useTsconfigDeclarationDir: true
                }),
                nodeResolve(),
                commonjs(),
                babel({
                    extensions: [...DEFAULT_EXTENSIONS, '.ts', 'tsx'],
                    babelHelpers: 'bundled',
                    exclude: /node_modules/
                }),
                url(),
                terser(),
                filesize()
            ]
        })
    }
    async onWrite() {
        if (this.bundle === null) {
            throw new Error('Please create RollupBuild!')
        }
        const { root, files } = this.output
        fsExtra.removeSync(root)
        for (let index = 0; index < files.length; index++) {
            await this.bundle.write(files[index])
        }
    }
    async onBuild(tip = 'Building...') {
        const building = ora(chalk.yellow(tip + '\n')).start()
        await this.onCreateRollupBuild()
        await this.onWrite()
        await this.bundle.close()
        building.succeed()
    }
}

exports.Builder = Builder
