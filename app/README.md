# UICloud Anime Demo

Nuxt 3 + Tailwind CSS ile UICloud kitindeki anime detail page refactor brief'inin çalışan demo'su.

## Gereksinimler
- Node.js ≥ 18.17
- pnpm ≥ 8

## Kurulum
```bash
pnpm install
```

## Çalıştır
```bash
pnpm dev
```
Tarayıcıda: http://localhost:3000

## Sayfalar
- `/` — iki demo anime listesi
- `/anime/kimetsu` — 26 ep, uzun synopsis, 10 karakter (collapse senaryoları)
- `/anime/one-piece` — 1157 ep, kısa synopsis, 20 karakter (100-blok navigator senaryosu)

## Test
```bash
pnpm test              # useEpisodePages unit testleri (9 test)
```

## Build
```bash
pnpm build
pnpm preview
```

## Spec & Plan
- Design spec: `../docs/superpowers/specs/2026-04-19-anime-detail-demo-design.md`
- Implementation plan: `../docs/superpowers/plans/2026-04-19-anime-detail-demo.md`
