// Generates static HTML entry points for every route so GitHub Pages
// serves them with a 200 status instead of falling back to 404.html.
// React Router then takes over client-side once the app boots.

import { mkdirSync, copyFileSync } from 'fs'
import { blogPosts } from '../src/blogData.js'

const SRC = 'dist/index.html'

function write(dir) {
  mkdirSync(`dist/${dir}`, { recursive: true })
  copyFileSync(SRC, `dist/${dir}/index.html`)
  console.log(`  created dist/${dir}/index.html`)
}

// /blog listing
write('blog')

// /blog/:slug for each post
for (const post of blogPosts) {
  write(`blog/${post.slug}`)
}

console.log('Route files generated.')
