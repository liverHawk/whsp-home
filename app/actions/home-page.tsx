import type { Handle } from 'remix/ui'
import { css } from 'remix/ui'

import { Document } from './document.tsx'

const FONT_STACK =
  "'Outfit', system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans JP', sans-serif"

// サブパスで配信している各サイト (vercel.json の rewrites と揃える)
const SITES = [
  {
    href: '/iwsp/',
    label: 'I.W.S.P.',
    title: '『7秒のレジスタンス』リリースイベント',
    date: '2026.05.30',
  },
  {
    href: '/sh/202609/',
    label: 'SHOWROOM',
    title: 'ギフトランキング 最終結果',
    date: '2026.09',
  },
]

export function HomePage() {
  return () => (
    <Document head={<HomeHead />}>
      <main
        mix={css({
          '--surface-0': '#f4f4f5',
          '--surface-1': '#ffffff',
          '--text-primary': '#18181b',
          '--text-secondary': '#71717a',
          '--accent': '#db1e33',
          '@media (prefers-color-scheme: dark)': {
            '--surface-0': '#0f0f11',
            '--surface-1': '#1c1c1f',
            '--text-primary': '#f4f4f5',
            '--text-secondary': '#a1a1aa',
          },
          '& *, & *::before, & *::after': { boxSizing: 'border-box' },
          margin: 0,
          padding: '64px 16px',
          minHeight: '100vh',
          background: 'var(--surface-0)',
          color: 'var(--text-primary)',
          fontFamily: FONT_STACK,
          lineHeight: 1.5,
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <div
          mix={css({
            width: '100%',
            maxWidth: '640px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          <h1
            mix={css({
              margin: 0,
              fontSize: '32px',
              fontWeight: 800,
              letterSpacing: '0.08em',
            })}
          >
            WHSP
          </h1>
          <ul
            mix={css({
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            })}
          >
            {SITES.map((site) => (
              <li key={site.href}>
                <SiteLink {...site} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </Document>
  )
}

function HomeHead() {
  return () => (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap"
      />
    </>
  )
}

function SiteLink(handle: Handle<{ href: string; label: string; title: string; date: string }>) {
  return () => {
    let { href, label, title, date } = handle.props

    return (
      <a
        href={href}
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '20px 24px',
          borderRadius: '16px',
          background: 'var(--surface-1)',
          color: 'var(--text-primary)',
          textDecoration: 'none',
          borderLeft: '4px solid var(--accent)',
          transition: 'transform 150ms ease',
          '&:hover, &:focus-visible': { transform: 'translateX(4px)', outline: 'none' },
        })}
      >
        <span
          mix={css({
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            color: 'var(--text-secondary)',
          })}
        >
          {label} · {date}
        </span>
        <span mix={css({ fontSize: '18px', fontWeight: 600 })}>{title}</span>
      </a>
    )
  }
}
