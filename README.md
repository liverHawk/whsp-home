# Whsp Home

A minimal Remix application starter with a home page.

## Starter Shape

- `app/actions/controller.tsx` owns the top-level route actions.
- `app/actions/home-page.tsx` and `app/actions/document.tsx` render the route-owned starter UI.
- `app/actions/public/` contains the browser runtime entry and interactive prompt button.
- `app/routes.ts` defines the shared route contract used by server and browser modules for type-safe hrefs.
- `app/router.ts` wires routes to handlers and installs the standard Remix UI renderer used by actions.
- `app/assets.ts` owns the server-side asset pipeline used by the asset route and render middleware.
- Root `public/` contains static files served unchanged from the app root.

## Growing The App

- Put top-level route actions in `app/actions/controller.tsx`.
- Add `app/actions/<route-key>/controller.tsx` when a nested route map needs its own actions or middleware.
- Add directories like `app/data/` or `test/` when the app actually needs them.
- Move shared UI into `app/ui/` once more than one route needs it.

## Commands

```sh
npm i
npm run dev
npm run hmr
npm run start
npm test
npm run typecheck
```

## Deploy (Vercel)

`npm run build` renders the router output to static files in `dist/`, which Vercel serves as-is.
`vercel.json` rewrites sub-paths to the other Vercel projects (multi-zone):

| Path | Project |
| --- | --- |
| `/` | this repo (whsp-home) |
| `/iwsp/*` | [iwsp](https://github.com/liverHawk/iwsp) → `https://iwsp.vercel.app` |
| `/sh/202609/*` | [whsp_202609_showroom](https://github.com/liverHawk/whsp_202609_showroom) → `https://whsp-202609-showroom.vercel.app` |

Each sub-project builds with a matching Vite `base`, so update both sides together when a path changes.
To add a new page to the static build, append it to `pages` in `scripts/build.ts`.
