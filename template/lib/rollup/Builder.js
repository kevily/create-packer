const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const postcss = require('rollup-plugin-postcss')
const path = require('path')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
const fs = require('fs')

class Builder {
    constructor({ root, main, external } = {}) {
        this.root = root || process.cwd()
        this.external = external || [/node_modules/]
        this.input = {
            entry: path.join(this.root, main || 'src/index.ts'),
            plugins: [
                nodeResolve(),
                typescript({
                    tsconfig: path.join(this.root, 'tsconfig.json'),
                    useTsconfigDeclarationDir: true
                }),
                postcss()
            ]
        }
        // output
        // ----------------------------------------------------------------------
        let pkg = fs.readFileSync(path.join(this.root, 'package.json')).toString()
        pkg = JSON.parse(pkg)
        this.output = {
            targets: [
                { name: pkg.module, format: 'esm' },
                { name: pkg.main, format: 'cjs' }
            ],
            plugins: [
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
            ]
        }
    }
    async onBuild() {
        const bundle = await rollup.rollup({
            external: this.external,
            input: this.input.entry,
            plugins: this.input.plugins
        })
        for (let index = 0; index < this.output.targets.length; index++) {
            const target = this.output.targets[index]
            await bundle.write({
                file: path.join(this.root, target.name),
                format: target.format,
                plugins: this.output.plugins
            })
        }
        await bundle.close()
    }
}

exports.Builder = Builder
