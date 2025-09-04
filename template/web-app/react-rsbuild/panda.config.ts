import { defineConfig } from '@pandacss/dev'
import { globalCss } from './global.css'

export default defineConfig({
    // Whether to use css reset
    preflight: true,
    // Where to look for your css declarations
    include: ['**/*.{js,jsx,ts,tsx}'],
    // Files to exclude
    exclude: [],
    // Useful for theme customization
    theme: {
        extend: {}
    },
    // The output directory for your css system
    outdir: 'styled-system',
    globalCss
})
