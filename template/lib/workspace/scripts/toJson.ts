import path from 'node:path'
import { Config, createGenerator } from 'ts-json-schema-generator'

const config: Config = {
    path: path.join(process.cwd(), 'packages/ts/src/sum.ts'),
    // path: './build.ts',
    tsconfig: path.join(process.cwd(), 'packages/ts/tsconfig.json'),
    // tsconfig: path.join(process.cwd(), 'tsconfig.json'),
    /**  Or <type-name> if you want to generate schema for that one type only */
    type: '*',
    skipTypeCheck: true
}

const schema = createGenerator(config)?.createSchema(config.type)

console.log(JSON.stringify(schema, null, 2))
