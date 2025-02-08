import path from 'path'
import { fileURLToPath } from 'url'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv'

const mode = process.env.MODE
const env = dotenv.config({ path: `./${mode ? `.env.${mode}` : '.env'}` }).parsed
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// This config is ignored and replaced with one of the configs in the shared folder when a project is created.

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        paths: {
            base: env.VITE_BASE_URL
        },
        alias: {
            '@': path.join(__dirname, 'src')
        }
    }
}

export default config
