import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'http://127.0.0.1:3000',
  integrations: [react(), tailwind()]
})
