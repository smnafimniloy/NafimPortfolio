import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Anti-spam: content/profile.js keeps your email as plain text (easy to edit), but the
// published JavaScript gets it base64-encoded, so address-harvesting bots that scan
// files for "name@domain" never find it. The page decodes it in the visitor's browser.
function protectEmail() {
  return {
    name: 'protect-email',
    enforce: 'pre',
    transform(code, id) {
      if (!id.replace(/\\/g, '/').endsWith('/content/profile.js')) return null
      return code.replace(/(email:\s*)"([^"\s]+@[^"\s]+)"/, (_, key, email) =>
        `${key}atob("${Buffer.from(email).toString('base64')}")`)
    },
  }
}

export default defineConfig({
  plugins: [protectEmail(), react()],
  base: '/',
  resolve: {
    alias: {
      // `import { profile } from '@content/profile'` → content/profile.js
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
})
