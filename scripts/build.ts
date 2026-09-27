// Vercel 向けにルーターの出力を静的ファイルとして dist/ に書き出す。
// ページと、そこから参照される /assets/* モジュールを辿って保存する。
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

import { router } from '../app/router.ts'

const outDir = path.resolve('dist')
const origin = 'http://localhost'
const pages = ['/']

await fs.rm(outDir, { recursive: true, force: true })
await fs.cp('public', outDir, { recursive: true })

const visited = new Set<string>()
const queue = [...pages]

while (queue.length > 0) {
  let pathname = queue.shift()!
  if (visited.has(pathname)) continue
  visited.add(pathname)

  let response = await router.fetch(new URL(pathname, origin))
  if (!response.ok) {
    throw new Error(`GET ${pathname} -> ${response.status}`)
  }

  let body = Buffer.from(await response.arrayBuffer())
  // Vercel はデコード済みのパスでファイルを探すので、保存名もデコードしておく
  let file = pathname.endsWith('/') ? `${pathname}index.html` : decodeURIComponent(pathname)
  await fs.mkdir(path.dirname(path.join(outDir, file)), { recursive: true })
  await fs.writeFile(path.join(outDir, file), body)

  let contentType = response.headers.get('Content-Type') ?? ''
  if (/html|javascript|css|json/.test(contentType)) {
    for (let match of body.toString('utf8').matchAll(/["'(](\/assets\/[^"'()\s?#]+)/g)) {
      // import map の scope ("/assets/app/" など) はファイルではない
      if (!match[1].endsWith('/')) queue.push(match[1])
    }
  }
}

console.log(`Wrote ${visited.size} files to ${path.relative(process.cwd(), outDir)}/`)
