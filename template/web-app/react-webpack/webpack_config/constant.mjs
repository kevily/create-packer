import path from 'path'

export const ROOT = process.cwd()
export const OUTPUT = path.join(ROOT, 'dist')
export const SCOPE_CLASS_NAME = '[name]__[local]--[hash:base64:5]'
