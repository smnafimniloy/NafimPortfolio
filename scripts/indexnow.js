// Tells IndexNow search engines (Bing, Yandex, Naver, Seznam, Yep…) that the site changed,
// so new pages show up in their results within hours instead of weeks.
// Runs in GitHub Actions after a deploy. Needs no npm install and never fails the deploy.
import { site, posts, abs, routes } from './lib/data.js'

const key = site.seo.indexNowKey
if (!key) {
  console.log('IndexNow: no key in content/site.js, skipping.')
  process.exit(0)
}

const urlList = [
  routes.home,
  ...(site.showBlog ? [routes.blog, ...posts.map(p => routes.post(p.slug))] : []),
  '/llms.txt',
].map(abs)

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(site.url).host,
      key,
      keyLocation: abs(`/${key}.txt`),
      urlList,
    }),
    signal: AbortSignal.timeout(15000),
  })
  // 200 = accepted, 202 = accepted (key check pending). Anything else is only a warning.
  console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`)
  if (res.status >= 400) console.log(`::warning::IndexNow returned ${res.status}: ${await res.text()}`)
} catch (err) {
  console.log(`::warning::IndexNow ping failed: ${err.message}`)
}
