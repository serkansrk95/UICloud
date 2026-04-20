# Anime Detail Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** UICloud kitindeki anime detail page refactor brief'ini, Nuxt 3 + Tailwind CSS + TypeScript ile lokalde (`pnpm dev`) çalıştırılabilir bir demo'ya dönüştürmek — sağ üstte 100'lü blok episode navigator, 2-satır karakter collapse, synopsis collapse + gradient fade.

**Architecture:** Bağımsız Nuxt 3 uygulaması; iki anime (Kimetsu 26 ep, One Piece 1157 ep) mock JSON olarak `assets/mock/` altında; data composable ile yüklenir; episode paging composable (`useEpisodePages`) pure logic (TDD'ye uygun); görsel component'ler manuel/tarayıcı doğrulamalı.

**Tech Stack:** Nuxt 3, TypeScript, Tailwind CSS (shadcn-uyumlu CSS variables, koyu tema), `@nuxt/icon` + `lucide`, Vitest (composable testi), pnpm.

**Spec:** `docs/superpowers/specs/2026-04-19-anime-detail-demo-design.md`

**Çalışma dizini:** `C:\Users\kira\Documents\GitHub\UICloud\app\` (yeni oluşturulacak)

---

## Ön Gereksinimler

Engineer bilgisayarında olması gerekenler:
- Node.js ≥ 18.17
- pnpm ≥ 8 (`npm install -g pnpm`)
- Git (commit adımları için; yoksa commit adımlarını atlayın)

Tüm komutlar aksi belirtilmedikçe `C:\Users\kira\Documents\GitHub\UICloud\app\` içinden çalıştırılır.

---

## Task 1: Proje iskeletini oluştur

**Files:**
- Create: `C:\Users\kira\Documents\GitHub\UICloud\app\` (tüm içerik)

- [ ] **Step 1.1: Nuxt 3 projesini oluştur**

```bash
cd C:\Users\kira\Documents\GitHub\UICloud
pnpm dlx nuxi@latest init app --packageManager pnpm --gitInit no
```

Prompt gelirse: packageManager=pnpm, gitInit=no, telemetry=no (tercih).

- [ ] **Step 1.2: Dependencies'leri kur**

```bash
cd C:\Users\kira\Documents\GitHub\UICloud\app
pnpm install
```

- [ ] **Step 1.3: Tailwind, Icon ve Vitest modüllerini ekle**

```bash
pnpm add -D @nuxtjs/tailwindcss @nuxt/icon vitest @vue/test-utils happy-dom @nuxt/test-utils
pnpm add @iconify-json/lucide
```

- [ ] **Step 1.4: Dev server'ın çalıştığını doğrula**

```bash
pnpm dev
```

Expected: `Nuxt 3.x.x ... Local: http://localhost:3000/` çıktısı. Tarayıcıda aç, Nuxt welcome sayfası görünmeli. Ctrl+C ile durdur.

- [ ] **Step 1.5: Git init**

```bash
cd C:\Users\kira\Documents\GitHub\UICloud\app
git init
git add .
git commit -m "chore: scaffold Nuxt 3 project"
```

---

## Task 2: nuxt.config.ts'i yapılandır

**Files:**
- Modify: `app/nuxt.config.ts`
- Create: `app/app.vue` (zaten var, modifiye edilecek)

- [ ] **Step 2.1: `nuxt.config.ts`'i güncelle**

Dosya içeriğini şununla değiştir:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
  ],
  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { class: 'dark', lang: 'tr' },
      title: 'UICloud Anime Demo',
      meta: [{ name: 'description', content: 'Anime detay sayfası demo' }],
    },
  },
  typescript: {
    strict: true,
  },
})
```

- [ ] **Step 2.2: `app.vue`'yu default layout kullanacak hale getir**

`app/app.vue` içeriğini şununla değiştir:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 2.3: Commit**

```bash
git add nuxt.config.ts app.vue
git commit -m "chore: configure tailwind, icon, and dark theme"
```

---

## Task 3: Design tokens ve Tailwind config

**Files:**
- Create: `app/assets/css/tokens.css`
- Create: `app/assets/css/main.css`
- Create: `app/tailwind.config.ts`

- [ ] **Step 3.1: `tokens.css`'i oluştur**

`app/assets/css/tokens.css`:

```css
:root,
.dark {
  --background: 220 15% 8%;
  --foreground: 0 0% 98%;
  --card: 220 15% 11%;
  --card-foreground: 0 0% 98%;
  --muted: 220 12% 16%;
  --muted-foreground: 220 10% 65%;
  --border: 220 12% 18%;
  --input: 220 12% 18%;
  --primary: 14 85% 55%;
  --primary-foreground: 0 0% 100%;
  --accent: 220 12% 20%;
  --accent-foreground: 0 0% 98%;
  --radius: 0.75rem;
}

html,
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

- [ ] **Step 3.2: `main.css`'i oluştur**

`app/assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Scrollbar stil (dar chip tabs'a yakışsın) */
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: hsl(var(--border));
  border-radius: 3px;
}
```

- [ ] **Step 3.3: `tailwind.config.ts`'i oluştur**

`app/tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 0.25rem)',
        '2xl': 'calc(var(--radius) + 0.5rem)',
      },
    },
  },
  plugins: [typography],
} satisfies Config
```

- [ ] **Step 3.4: Typography plugin'i ekle**

```bash
pnpm add -D @tailwindcss/typography
```

- [ ] **Step 3.5: Dev server'da tokens'in yüklendiğini doğrula**

```bash
pnpm dev
```

Tarayıcıda `http://localhost:3000` aç; arka plan koyu olmalı (welcome sayfası hala görünür ama bg artık koyu). Ctrl+C.

- [ ] **Step 3.6: Commit**

```bash
git add assets/ tailwind.config.ts package.json pnpm-lock.yaml
git commit -m "feat: add design tokens and tailwind config"
```

---

## Task 4: Type tanımları

**Files:**
- Create: `app/types/anime.ts`

- [ ] **Step 4.1: `types/anime.ts`'i oluştur**

`app/types/anime.ts`:

```ts
export type Episode = {
  number: number
  id: string
  title: string
  titleJa: string
  airDate: string
}

export type Character = {
  name: string
  role: string
  image: string
  vaName: string
  vaLang: string
  vaImage: string
}

export type RelatedAnime = {
  slug: string
  title: string
  poster: string
  year: number
}

export type Anime = {
  slug: string
  title: string
  titleJa: string
  year: number
  studio: string
  status: 'airing' | 'completed'
  genres: string[]
  synopsis: string
  poster: string
  banner: string
  characters: Character[]
  episodes: Episode[]
  currentEpisodeNumber: number
  related: RelatedAnime[]
}
```

- [ ] **Step 4.2: Commit**

```bash
git add types/
git commit -m "feat: add anime type definitions"
```

---

## Task 5: Mock data — Kimetsu (26 ep)

**Files:**
- Create: `app/assets/mock/kimetsu.json`

- [ ] **Step 5.1: `kimetsu.json`'u oluştur**

`app/assets/mock/kimetsu.json` dosyasına aşağıdaki içeriği yaz. Episodes 6-26 aynı şablonu takip eder: `{ "number": N, "id": "kimetsu-ep-N", "title": "Bölüm N", "titleJa": "第N話", "airDate": "YYYY-MM-DDTHH:mm:ssZ" }`. Başlangıç tarihi 2019-04-06, her episode +7 gün.

```json
{
  "slug": "kimetsu",
  "title": "Demon Slayer (Kimetsu no Yaiba)",
  "titleJa": "鬼滅の刃",
  "year": 2019,
  "studio": "ufotable",
  "status": "completed",
  "genres": ["Action", "Supernatural", "Historical"],
  "synopsis": "Kimetsu no yaiba\n\nJaponya'da rekorlar kıran ve ilk kez 1 milyon kopya ile piyasaya sürülen manga olan Kimetsu No Yaiba, anime uyarlaması ile de tüm dünyada yoğun ilgi görüyor. Özgün konusu ve etkileyici senaryosu ile Kimetsu No Yaiba, anime tutkunları için gerçekten özel bir deneyim yakalayabilme fırsatı sunuyor. Japonya'da yüksek izlenme oranlarına sahip olan Kimetsu No Yaiba, çok kısa süre içerisinde tüm dünyaya yayılma başarısını göstermiştir.\n\nKimetsu No Yaiba Konusu\n\nKimetsu No Yaiba animesinin konusu ise son derece klasik bir başlangıç gibi görünse de ilerleyen süreçte yaşanacak olaylar heyecanın sürekliliğini doruk noktasına taşıyor ve her şey daha da ilginç bir hale geliyor. Kimetsu No Yaiba konusuna göre başkarakterimiz Tanjirou Kamado'dur. Kendisi babasının ölümünün ardından annesi ve 6 kardeşi ile yalnız kalmış ve onların tüm sorumluluğunu üstlenmek durumunda kalmıştır. Bu yüzden de kömür satmaya başlayan Tanjirou, ailesinin ihtiyaçlarını karşılayabilmeye çalışmaktadır. Bunun içinde Tanjirou, kömür satmak üzere sürekli köye gitmek durumunda kalıyordur.",
  "poster": "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
  "banner": "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
  "characters": [
    { "name": "Tanjirou Kamado", "role": "Ana Karakter", "image": "https://cdn.myanimelist.net/images/characters/6/386735.jpg", "vaName": "Natsuki Hanae", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/65775.jpg" },
    { "name": "Nezuko Kamado", "role": "Ana Karakter", "image": "https://cdn.myanimelist.net/images/characters/5/388816.jpg", "vaName": "Akari Kito", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/1/70475.jpg" },
    { "name": "Zenitsu Agatsuma", "role": "Ana Karakter", "image": "https://cdn.myanimelist.net/images/characters/9/386736.jpg", "vaName": "Hiro Shimono", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/3/48435.jpg" },
    { "name": "Inosuke Hashibira", "role": "Ana Karakter", "image": "https://cdn.myanimelist.net/images/characters/4/386737.jpg", "vaName": "Yoshitsugu Matsuoka", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/40011.jpg" },
    { "name": "Giyuu Tomioka", "role": "Yan Karakter", "image": "https://cdn.myanimelist.net/images/characters/12/386738.jpg", "vaName": "Takahiro Sakurai", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/8875.jpg" },
    { "name": "Shinobu Kochou", "role": "Yan Karakter", "image": "https://cdn.myanimelist.net/images/characters/12/404353.jpg", "vaName": "Saori Hayami", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/1/38501.jpg" },
    { "name": "Kyojuro Rengoku", "role": "Yan Karakter", "image": "https://cdn.myanimelist.net/images/characters/3/414873.jpg", "vaName": "Satoshi Hino", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/10277.jpg" },
    { "name": "Muzan Kibutsuji", "role": "Antagonist", "image": "https://cdn.myanimelist.net/images/characters/5/389070.jpg", "vaName": "Toshihiko Seki", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/1/3085.jpg" },
    { "name": "Sabito", "role": "Yan Karakter", "image": "https://cdn.myanimelist.net/images/characters/13/406549.jpg", "vaName": "Yuki Kaji", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/39275.jpg" },
    { "name": "Makomo", "role": "Yan Karakter", "image": "https://cdn.myanimelist.net/images/characters/16/406550.jpg", "vaName": "Kana Hanazawa", "vaLang": "Japonca", "vaImage": "https://cdn.myanimelist.net/images/voiceactors/2/12095.jpg" }
  ],
  "episodes": [
    { "number": 1, "id": "kimetsu-ep-1", "title": "Zalimlik", "titleJa": "残酷", "airDate": "2019-04-06T00:00:00Z" },
    { "number": 2, "id": "kimetsu-ep-2", "title": "Yetiştirici Sakonji Urokodaki", "titleJa": "育手・鱗滝左近次", "airDate": "2019-04-13T00:00:00Z" },
    { "number": 3, "id": "kimetsu-ep-3", "title": "Sabito ve Makomo", "titleJa": "錆兎と真菰", "airDate": "2019-04-20T00:00:00Z" },
    { "number": 4, "id": "kimetsu-ep-4", "title": "Son Seçme", "titleJa": "最終選別", "airDate": "2019-04-27T00:00:00Z" },
    { "number": 5, "id": "kimetsu-ep-5", "title": "Kendi Bıçağın", "titleJa": "己の鋼", "airDate": "2019-05-04T00:00:00Z" }
  ],
  "currentEpisodeNumber": 5,
  "related": [
    { "slug": "jujutsu-kaisen", "title": "Jujutsu Kaisen", "poster": "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", "year": 2020 },
    { "slug": "attack-on-titan", "title": "Shingeki no Kyojin", "poster": "https://cdn.myanimelist.net/images/anime/10/47347.jpg", "year": 2013 },
    { "slug": "chainsaw-man", "title": "Chainsaw Man", "poster": "https://cdn.myanimelist.net/images/anime/1806/126216.jpg", "year": 2022 },
    { "slug": "demon-slayer-mugen-train", "title": "Demon Slayer: Mugen Train", "poster": "https://cdn.myanimelist.net/images/anime/1704/106947.jpg", "year": 2020 }
  ]
}
```

- [ ] **Step 5.2: Episodes 6-26'yı ekle**

`episodes` array'ine 21 element daha ekle. Her biri:
```json
{ "number": N, "id": "kimetsu-ep-N", "title": "Bölüm N", "titleJa": "第N話", "airDate": "<week N ISO>" }
```

Tarih hesaplama: 2019-04-06 + (N-1) × 7 gün. Örn:
- N=6: 2019-05-11
- N=7: 2019-05-18
- ...
- N=26: 2019-09-28

Üretmek için Node REPL:
```bash
node -e "const d=new Date('2019-04-06T00:00:00Z'); for(let n=6;n<=26;n++){const t=new Date(d.getTime()+(n-1)*7*86400000); console.log(JSON.stringify({number:n,id:'kimetsu-ep-'+n,title:'Bölüm '+n,titleJa:'第'+n+'話',airDate:t.toISOString()}) + ',')}"
```

Çıktıyı `episodes` array'in sonuna ekle (son elementten sonra virgül olacak; son elementten sonraki virgülü sil).

- [ ] **Step 5.3: JSON'un geçerli olduğunu doğrula**

```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('./assets/mock/kimetsu.json','utf8')).episodes.length)"
```

Expected: `26`

- [ ] **Step 5.4: Commit**

```bash
git add assets/mock/kimetsu.json
git commit -m "feat: add kimetsu mock data (26 episodes)"
```

---

## Task 6: Mock data — One Piece (1157 ep)

**Files:**
- Create: `app/scripts/generate-one-piece.mjs` (tek kullanımlık generator)
- Create: `app/assets/mock/one-piece.json`

One Piece 1157 bölümü elle yazılamaz — tek kullanımlık generator script ile üretilir, JSON commit edilir.

- [ ] **Step 6.1: Generator script oluştur**

`app/scripts/generate-one-piece.mjs`:

```js
import { writeFileSync } from 'node:fs'

const firstThree = [
  { number: 1, id: 'one-piece-ep-1', title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!", titleJa: 'Ore wa Luffy! Kaizoku Ou ni Naru Otoko Da!', airDate: '1999-10-20T00:00:00Z' },
  { number: 2, id: 'one-piece-ep-2', title: 'Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!', titleJa: 'Daikengou Arawaru! Kaizokugari Roronoa Zoro', airDate: '1999-11-17T00:00:00Z' },
  { number: 3, id: 'one-piece-ep-3', title: "Morgan versus Luffy! Who's the Mysterious Pretty Girl?", titleJa: 'Morgan vs. Luffy! Nazo no Bishoujo wa Dare?', airDate: '1999-11-24T00:00:00Z' },
]

const episodes = [...firstThree]
const start = new Date('1999-12-01T00:00:00Z')
for (let n = 4; n <= 1157; n++) {
  const d = new Date(start.getTime() + (n - 4) * 7 * 86400000)
  episodes.push({
    number: n,
    id: `one-piece-ep-${n}`,
    title: `Bölüm ${n}`,
    titleJa: `第${n}話`,
    airDate: d.toISOString(),
  })
}

const characters = [
  ['Monkey D. Luffy', 'Ana Karakter', '40.jpg', 'Mayumi Tanaka'],
  ['Roronoa Zoro', 'Ana Karakter', '41.jpg', 'Kazuya Nakai'],
  ['Nami', 'Ana Karakter', '42.jpg', 'Akemi Okamura'],
  ['Usopp', 'Ana Karakter', '43.jpg', 'Kappei Yamaguchi'],
  ['Sanji', 'Ana Karakter', '44.jpg', 'Hiroaki Hirata'],
  ['Tony Tony Chopper', 'Ana Karakter', '45.jpg', 'Ikue Otani'],
  ['Nico Robin', 'Ana Karakter', '46.jpg', 'Yuriko Yamaguchi'],
  ['Franky', 'Ana Karakter', '47.jpg', 'Kazuki Yao'],
  ['Brook', 'Ana Karakter', '48.jpg', 'Cho'],
  ['Jinbe', 'Ana Karakter', '49.jpg', 'Daisuke Gouri'],
  ['Shanks', 'Yan Karakter', '50.jpg', 'Shuuichi Ikeda'],
  ['Buggy', 'Yan Karakter', '51.jpg', 'Shigeru Chiba'],
  ['Portgas D. Ace', 'Yan Karakter', '52.jpg', 'Toshio Furukawa'],
  ['Sabo', 'Yan Karakter', '53.jpg', 'Toru Furuya'],
  ['Trafalgar Law', 'Yan Karakter', '54.jpg', 'Hiroshi Kamiya'],
  ['Boa Hancock', 'Yan Karakter', '55.jpg', 'Kotono Mitsuishi'],
  ['Dracule Mihawk', 'Yan Karakter', '56.jpg', 'Takehito Koyasu'],
  ['Monkey D. Garp', 'Yan Karakter', '57.jpg', 'Hiroshi Naka'],
  ['Kaido', 'Antagonist', '58.jpg', 'Akio Otsuka'],
  ['Charlotte Linlin', 'Antagonist', '59.jpg', 'Mami Koyama'],
].map(([name, role, imgId, vaName], i) => ({
  name,
  role,
  image: `https://cdn.myanimelist.net/images/characters/9/${310000 + i}.jpg`,
  vaName,
  vaLang: 'Japonca',
  vaImage: `https://cdn.myanimelist.net/images/voiceactors/1/${80000 + i}.jpg`,
}))

const data = {
  slug: 'one-piece',
  title: 'One Piece',
  titleJa: 'ワンピース',
  year: 1999,
  studio: 'Toei Animation',
  status: 'airing',
  genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
  synopsis: 'Altın Korsan Roger idam edilmeden önce tüm hazinesinin varlığını açıkladı. Onlarca yıl sonra Monkey D. Luffy adında lastik bedenli bir genç, efsanevi One Piece hazinesini bularak Korsan Kralı olmak için denize açılır. Yol boyunca bir mürettebat kurar ve Grand Line boyunca tehlikeli maceralar yaşar.',
  poster: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
  banner: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
  characters,
  episodes,
  currentEpisodeNumber: 1087,
  related: [
    { slug: 'naruto', title: 'Naruto', poster: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', year: 2002 },
    { slug: 'bleach', title: 'Bleach', poster: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg', year: 2004 },
    { slug: 'dragon-ball-super', title: 'Dragon Ball Super', poster: 'https://cdn.myanimelist.net/images/anime/1607/117401.jpg', year: 2015 },
    { slug: 'hunter-x-hunter', title: 'Hunter x Hunter', poster: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg', year: 2011 },
    { slug: 'fairy-tail', title: 'Fairy Tail', poster: 'https://cdn.myanimelist.net/images/anime/5/18179.jpg', year: 2009 },
  ],
}

writeFileSync('./assets/mock/one-piece.json', JSON.stringify(data, null, 2))
console.log('✔ Written', data.episodes.length, 'episodes')
```

- [ ] **Step 6.2: Generator'ı çalıştır**

```bash
cd C:\Users\kira\Documents\GitHub\UICloud\app
node scripts/generate-one-piece.mjs
```

Expected: `✔ Written 1157 episodes`

- [ ] **Step 6.3: JSON'un geçerli olduğunu doğrula**

```bash
node -e "const d=JSON.parse(require('fs').readFileSync('./assets/mock/one-piece.json','utf8')); console.log('episodes:',d.episodes.length,'chars:',d.characters.length,'current:',d.currentEpisodeNumber)"
```

Expected: `episodes: 1157 chars: 20 current: 1087`

- [ ] **Step 6.4: Commit**

```bash
git add scripts/ assets/mock/one-piece.json
git commit -m "feat: add one-piece mock data generator (1157 episodes)"
```

---

## Task 7: `useEpisodePages` composable (TDD)

Pure logic — bu composable tam TDD akışında yazılır.

**Files:**
- Create: `app/composables/useEpisodePages.ts`
- Create: `app/tests/useEpisodePages.test.ts`
- Create: `app/vitest.config.ts`

- [ ] **Step 7.1: Vitest config'i oluştur**

`app/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
})
```

`package.json`'un `scripts` bölümüne ekle:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7.2: Failing test yaz**

`app/tests/useEpisodePages.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useEpisodePages } from '~/composables/useEpisodePages'
import type { Episode } from '~/types/anime'

function makeEpisodes(n: number): Episode[] {
  return Array.from({ length: n }, (_, i) => ({
    number: i + 1,
    id: `ep-${i + 1}`,
    title: `Bölüm ${i + 1}`,
    titleJa: `第${i + 1}話`,
    airDate: '2020-01-01T00:00:00Z',
  }))
}

describe('useEpisodePages', () => {
  it('splits 100 episodes into a single page', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    expect(pages.value.length).toBe(1)
    expect(pages.value[0].start).toBe(1)
    expect(pages.value[0].end).toBe(100)
    expect(pages.value[0].label).toBe('001-100')
    expect(pages.value[0].items.length).toBe(100)
  })

  it('splits 250 episodes into 3 pages (100, 100, 50)', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(250)), ref(1))
    expect(pages.value.length).toBe(3)
    expect(pages.value[0].label).toBe('001-100')
    expect(pages.value[1].label).toBe('101-200')
    expect(pages.value[2].label).toBe('201-250')
    expect(pages.value[2].items.length).toBe(50)
  })

  it('splits 1157 episodes into 12 pages', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(1157)), ref(1))
    expect(pages.value.length).toBe(12)
    expect(pages.value[11].label).toBe('1101-1157')
    expect(pages.value[11].items.length).toBe(57)
  })

  it('sets active page to the one containing currentEpisodeNumber on init', () => {
    const { activePageIndex } = useEpisodePages(ref(makeEpisodes(500)), ref(287))
    expect(activePageIndex.value).toBe(2)
  })

  it('setPage updates activePageIndex and clears focusedEpisode', () => {
    const { setPage, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(300)), ref(1))
    setPage(2)
    expect(activePageIndex.value).toBe(2)
    expect(focusedEpisode.value).toBeNull()
  })

  it('jumpToEpisode switches page and sets focusedEpisode', () => {
    const { jumpToEpisode, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(500)), ref(1))
    jumpToEpisode(347)
    expect(activePageIndex.value).toBe(3)
    expect(focusedEpisode.value).toBe(347)
  })

  it('jumpToEpisode with invalid number does nothing', () => {
    const { jumpToEpisode, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    jumpToEpisode(999)
    expect(activePageIndex.value).toBe(0)
    expect(focusedEpisode.value).toBeNull()
  })

  it('jumpToEpisode with 0 does nothing', () => {
    const { jumpToEpisode, focusedEpisode } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    jumpToEpisode(0)
    expect(focusedEpisode.value).toBeNull()
  })

  it('handles empty episodes array', () => {
    const { pages } = useEpisodePages(ref([]), ref(1))
    expect(pages.value.length).toBe(0)
  })
})
```

- [ ] **Step 7.3: Test'i çalıştır — fail beklenir**

```bash
pnpm test
```

Expected: Tüm testler FAIL (module not found `~/composables/useEpisodePages`).

- [ ] **Step 7.4: Minimal implementation**

`app/composables/useEpisodePages.ts`:

```ts
import { ref, computed, type Ref } from 'vue'
import type { Episode } from '~/types/anime'

const PAGE_SIZE = 100

export type EpisodePage = {
  index: number
  start: number
  end: number
  label: string
  items: Episode[]
}

export function useEpisodePages(
  episodes: Ref<Episode[]>,
  currentEpisodeNumber: Ref<number>,
) {
  const pages = computed<EpisodePage[]>(() => {
    const all = episodes.value
    if (all.length === 0) return []
    const pageCount = Math.ceil(all.length / PAGE_SIZE)
    const result: EpisodePage[] = []
    for (let i = 0; i < pageCount; i++) {
      const start = i * PAGE_SIZE + 1
      const sliceEnd = Math.min((i + 1) * PAGE_SIZE, all.length)
      const items = all.slice(i * PAGE_SIZE, sliceEnd)
      const end = sliceEnd
      result.push({
        index: i,
        start,
        end,
        label: `${String(start).padStart(3, '0')}-${String(end).padStart(3, '0')}`,
        items,
      })
    }
    return result
  })

  const initialPage = computed(() => {
    const idx = Math.floor((currentEpisodeNumber.value - 1) / PAGE_SIZE)
    return Math.max(0, Math.min(idx, pages.value.length - 1))
  })

  const activePageIndex = ref(initialPage.value)
  const focusedEpisode = ref<number | null>(null)

  function setPage(i: number) {
    if (i < 0 || i >= pages.value.length) return
    activePageIndex.value = i
    focusedEpisode.value = null
  }

  function jumpToEpisode(n: number) {
    if (n < 1) return
    const all = episodes.value
    if (n > all.length) return
    const pageIdx = Math.floor((n - 1) / PAGE_SIZE)
    activePageIndex.value = pageIdx
    focusedEpisode.value = n
  }

  return {
    pages,
    activePageIndex,
    focusedEpisode,
    setPage,
    jumpToEpisode,
  }
}
```

**Not:** Composable `vue`'dan explicit import kullanıyor. Nuxt runtime'da auto-imports da aynı API'yi sağlar, explicit import çakışmaz. Vitest bu sayede extra kuruluma ihtiyaç duymaz.

- [ ] **Step 7.5: Testleri tekrar çalıştır — pass beklenir**

```bash
pnpm test
```

Expected: 9 passed.

- [ ] **Step 7.6: Commit**

```bash
git add composables/ tests/ vitest.config.ts package.json
git commit -m "feat: add useEpisodePages composable with TDD"
```

---

## Task 8: `useAnime` composable

**Files:**
- Create: `app/composables/useAnime.ts`

Mock JSON'ları dinamik import ile yükler.

- [ ] **Step 8.1: Composable'ı yaz**

`app/composables/useAnime.ts`:

```ts
import type { Anime } from '~/types/anime'

const loaders: Record<string, () => Promise<{ default: Anime }>> = {
  kimetsu: () => import('~/assets/mock/kimetsu.json'),
  'one-piece': () => import('~/assets/mock/one-piece.json'),
}

export async function useAnime(slug: string): Promise<Anime | null> {
  const loader = loaders[slug]
  if (!loader) return null
  const mod = await loader()
  return mod.default as Anime
}

export function listAnimeSlugs(): string[] {
  return Object.keys(loaders)
}
```

- [ ] **Step 8.2: Commit**

```bash
git add composables/useAnime.ts
git commit -m "feat: add useAnime loader composable"
```

---

## Task 9: Default layout + AppHeader

**Files:**
- Create: `app/layouts/default.vue`
- Create: `app/components/AppHeader.vue`

- [ ] **Step 9.1: `AppHeader.vue`'yi oluştur**

`app/components/AppHeader.vue`:

```vue
<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
    <div class="container mx-auto px-4 lg:px-6 h-16 flex items-center gap-4">
      <NuxtLink to="/" class="text-xl font-bold text-primary hover:opacity-80">
        UICloud
      </NuxtLink>
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Anime ara..."
            class="w-full h-9 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            readonly
          />
        </div>
      </div>
    </div>
  </header>
</template>
```

- [ ] **Step 9.2: `default.vue` layout'u oluştur**

`app/layouts/default.vue`:

```vue
<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
```

- [ ] **Step 9.3: Dev server'da header'ın göründüğünü doğrula**

```bash
pnpm dev
```

Tarayıcı: `http://localhost:3000` — üstte "UICloud" logosu + arama kutusu görünmeli, koyu tema.

- [ ] **Step 9.4: Commit**

```bash
git add layouts/ components/AppHeader.vue
git commit -m "feat: add default layout and sticky app header"
```

---

## Task 10: Home sayfası

**Files:**
- Modify: `app/pages/index.vue` (oluştur, yoksa)

- [ ] **Step 10.1: `index.vue`'yi yaz**

`app/pages/index.vue`:

```vue
<script setup lang="ts">
const animeList = [
  { slug: 'kimetsu', title: 'Demon Slayer (Kimetsu no Yaiba)', year: 2019, poster: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg', description: '26 bölümlük kısa seri — karakter 2-satır collapse ve synopsis expand senaryosu.' },
  { slug: 'one-piece', title: 'One Piece', year: 1999, poster: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg', description: '1157 bölüm — 100 blok episode navigator, range chips ve episode search senaryosu.' },
]
</script>

<template>
  <div class="container mx-auto px-4 lg:px-6 py-10">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">UICloud Demo</h1>
      <p class="text-muted-foreground mt-1">İki demo anime — tasarım keşfi için</p>
    </header>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <NuxtLink
        v-for="a in animeList"
        :key="a.slug"
        :to="`/anime/${a.slug}`"
        class="group flex gap-4 p-4 rounded-2xl bg-card border border-border hover:bg-accent/30 transition-colors"
      >
        <img :src="a.poster" :alt="a.title" class="w-24 aspect-[2/3] rounded-lg object-cover shrink-0" />
        <div class="min-w-0 flex-1">
          <h2 class="font-semibold text-lg truncate">{{ a.title }}</h2>
          <div class="text-sm text-muted-foreground mb-2">{{ a.year }}</div>
          <p class="text-sm text-muted-foreground">{{ a.description }}</p>
          <div class="mt-3 text-sm text-primary group-hover:underline">Detaya git →</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
```

- [ ] **Step 10.2: Browser'da doğrula**

`pnpm dev` açıkken `http://localhost:3000` — iki anime kartı yan yana (sm+), üstünde "UICloud Demo" başlığı. Hover'da arka plan hafif değişir.

- [ ] **Step 10.3: Commit**

```bash
git add pages/index.vue
git commit -m "feat: add home page with anime list"
```

---

## Task 11: AnimeHero component

**Files:**
- Create: `app/components/AnimeHero.vue`

- [ ] **Step 11.1: `AnimeHero.vue`'yi yaz**

`app/components/AnimeHero.vue`:

```vue
<script setup lang="ts">
import type { Anime } from '~/types/anime'

defineProps<{ anime: Anime }>()
</script>

<template>
  <section class="relative">
    <div class="relative h-56 lg:h-80 overflow-hidden">
      <img :src="anime.banner" :alt="anime.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
    <div class="container mx-auto px-4 lg:px-6 -mt-24 relative flex flex-col sm:flex-row gap-6">
      <img
        :src="anime.poster"
        :alt="anime.title"
        class="w-32 lg:w-48 aspect-[2/3] rounded-2xl object-cover shrink-0 border border-border shadow-xl"
      />
      <div class="flex-1 min-w-0 pt-2 sm:pt-24">
        <h1 class="text-2xl lg:text-4xl font-bold leading-tight">{{ anime.title }}</h1>
        <div class="mt-1 text-muted-foreground">
          <span>{{ anime.titleJa }}</span>
          <span class="mx-2">·</span>
          <span>{{ anime.year }}</span>
          <span class="mx-2">·</span>
          <span>{{ anime.studio }}</span>
          <span class="mx-2">·</span>
          <span>{{ anime.status === 'airing' ? 'Devam ediyor' : 'Tamamlandı' }}</span>
        </div>
        <div class="mt-3 flex flex-wrap gap-2">
          <span
            v-for="g in anime.genres"
            :key="g"
            class="px-2.5 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border"
          >
            {{ g }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 11.2: Commit**

```bash
git add components/AnimeHero.vue
git commit -m "feat: add anime hero component"
```

---

## Task 12: SynopsisCollapse component

**Files:**
- Create: `app/components/SynopsisCollapse.vue`

- [ ] **Step 12.1: Component'i yaz**

`app/components/SynopsisCollapse.vue`:

```vue
<script setup lang="ts">
const props = defineProps<{ synopsis: string }>()

const contentEl = ref<HTMLDivElement | null>(null)
const fullHeight = ref(0)
const expanded = ref(false)
const contentId = useId()

const needsCollapse = computed(() => fullHeight.value > 240)

const rendered = computed(() =>
  props.synopsis
    .split('\n\n')
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join(''),
)

onMounted(() => {
  nextTick(() => {
    if (contentEl.value) {
      fullHeight.value = contentEl.value.scrollHeight
    }
  })

  if (typeof ResizeObserver !== 'undefined' && contentEl.value) {
    const obs = new ResizeObserver(() => {
      if (contentEl.value) fullHeight.value = contentEl.value.scrollHeight
    })
    obs.observe(contentEl.value)
    onBeforeUnmount(() => obs.disconnect())
  }
})

function toggle() {
  expanded.value = !expanded.value
}
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold mb-3">Açıklama</h2>
    <div class="relative">
      <div
        :id="contentId"
        ref="contentEl"
        class="prose prose-sm dark:prose-invert max-w-none overflow-hidden transition-[max-height] duration-300 ease-in-out text-muted-foreground"
        :style="{ maxHeight: expanded ? `${fullHeight}px` : '240px' }"
        v-html="rendered"
      />
      <div
        v-if="!expanded && needsCollapse"
        class="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"
      />
    </div>
    <button
      v-if="needsCollapse"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      class="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      @click="toggle"
    >
      {{ expanded ? 'Daha Az Göster' : 'Daha Fazla Oku' }}
      <Icon :name="expanded ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4" />
    </button>
  </section>
</template>
```

**Not:** `useId` Nuxt 3.10+ auto-import. Sürüm eskiyse `const contentId = 'synopsis-' + Math.random().toString(36).slice(2, 8)`.

- [ ] **Step 12.2: Commit**

```bash
git add components/SynopsisCollapse.vue
git commit -m "feat: add synopsis collapse with gradient fade"
```

---

## Task 13: CharactersGrid component

**Files:**
- Create: `app/components/CharactersGrid.vue`

- [ ] **Step 13.1: Component'i yaz**

`app/components/CharactersGrid.vue`:

```vue
<script setup lang="ts">
import type { Character } from '~/types/anime'

const props = defineProps<{ characters: Character[] }>()

const showAll = ref(false)

const showButtonMobile = computed(() => props.characters.length > 2)
const showButtonDesktop = computed(() => props.characters.length > 4)
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold">
        Karakterler
        <span class="text-muted-foreground font-normal">({{ characters.length }})</span>
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(c, i) in characters"
        :key="c.name"
        class="flex gap-3 p-3 rounded-lg bg-card border border-border"
        :class="[
          !showAll && i >= 2 && i < 4 && 'hidden sm:flex',
          !showAll && i >= 4 && 'hidden',
        ]"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="size-14 rounded-lg overflow-hidden bg-muted shrink-0">
            <img :src="c.image" :alt="c.name" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-sm truncate">{{ c.name }}</p>
            <p class="text-xs text-muted-foreground">{{ c.role }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 flex-1 justify-end text-right min-w-0">
          <div class="min-w-0">
            <p class="font-medium text-sm truncate">{{ c.vaName }}</p>
            <p class="text-xs text-muted-foreground">{{ c.vaLang }}</p>
          </div>
          <div class="size-14 rounded-lg overflow-hidden bg-muted shrink-0">
            <img :src="c.vaImage" :alt="c.vaName" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="showButtonMobile || showButtonDesktop"
      type="button"
      class="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
      :class="{
        'sm:hidden': showButtonMobile && !showButtonDesktop,
        'hidden sm:inline-flex': !showButtonMobile && showButtonDesktop,
      }"
      @click="showAll = !showAll"
    >
      <template v-if="!showAll">
        <span class="sm:hidden">Daha Fazla Göster (+{{ characters.length - 2 }})</span>
        <span class="hidden sm:inline">Daha Fazla Göster (+{{ characters.length - 4 }})</span>
      </template>
      <span v-else>Daha Az Göster</span>
      <Icon :name="showAll ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4" />
    </button>
  </section>
</template>
```

- [ ] **Step 13.2: Commit**

```bash
git add components/CharactersGrid.vue
git commit -m "feat: add characters grid with 2-row breakpoint collapse"
```

---

## Task 14: EpisodeRangeTabs component

**Files:**
- Create: `app/components/EpisodeRangeTabs.vue`

- [ ] **Step 14.1: Component'i yaz**

`app/components/EpisodeRangeTabs.vue`:

```vue
<script setup lang="ts">
import type { EpisodePage } from '~/composables/useEpisodePages'

defineProps<{
  pages: EpisodePage[]
  activeIndex: number
}>()

const emit = defineEmits<{ (e: 'select', i: number): void }>()
</script>

<template>
  <div
    v-if="pages.length > 1"
    class="flex overflow-x-auto gap-2 pb-1 scrollbar-thin"
  >
    <button
      v-for="p in pages"
      :key="p.index"
      type="button"
      class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
      :class="
        p.index === activeIndex
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-muted-foreground border-border hover:bg-accent/50 hover:text-foreground'
      "
      @click="emit('select', p.index)"
    >
      EPS: {{ p.label }}
    </button>
  </div>
</template>
```

- [ ] **Step 14.2: Commit**

```bash
git add components/EpisodeRangeTabs.vue
git commit -m "feat: add episode range tabs"
```

---

## Task 15: EpisodeSearch component

**Files:**
- Create: `app/components/EpisodeSearch.vue`

- [ ] **Step 15.1: Component'i yaz**

`app/components/EpisodeSearch.vue`:

```vue
<script setup lang="ts">
const props = defineProps<{ max: number; min?: number }>()
const emit = defineEmits<{ (e: 'jump', n: number): void }>()

const value = ref<string>('')
const invalid = ref(false)

const minN = computed(() => props.min ?? 1)

function parseAndJump() {
  const n = Number.parseInt(value.value, 10)
  if (!Number.isFinite(n) || n < minN.value || n > props.max) {
    invalid.value = true
    return
  }
  invalid.value = false
  emit('jump', n)
}

function onInput() {
  if (invalid.value) invalid.value = false
}
</script>

<template>
  <div
    class="flex items-center gap-2 h-9 px-3 rounded-lg bg-muted border transition-colors"
    :class="invalid ? 'border-red-500/60' : 'border-border focus-within:border-primary'"
  >
    <Icon name="lucide:search" class="size-4 text-muted-foreground" />
    <input
      v-model="value"
      type="number"
      :min="minN"
      :max="max"
      placeholder="Bölüm numarası"
      class="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      @input="onInput"
      @keydown.enter="parseAndJump"
    />
  </div>
</template>
```

- [ ] **Step 15.2: Commit**

```bash
git add components/EpisodeSearch.vue
git commit -m "feat: add episode number search"
```

---

## Task 16: EpisodeGrid component

**Files:**
- Create: `app/components/EpisodeGrid.vue`

- [ ] **Step 16.1: Component'i yaz**

`app/components/EpisodeGrid.vue`:

```vue
<script setup lang="ts">
import type { Episode } from '~/types/anime'

const props = defineProps<{
  items: Episode[]
  currentNumber: number
  focusedNumber: number | null
  slug: string
}>()

const gridEl = ref<HTMLDivElement | null>(null)

watch(
  () => props.focusedNumber,
  async (n) => {
    if (n == null) return
    await nextTick()
    const el = gridEl.value?.querySelector<HTMLAnchorElement>(`[data-ep="${n}"]`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  },
)

function onCellClick(e: Event) {
  // Demo: prevent real navigation, just log
  e.preventDefault()
  const target = e.currentTarget as HTMLAnchorElement
  console.log('[demo] open episode:', target.dataset.ep)
}
</script>

<template>
  <div
    v-if="items.length === 0"
    class="py-6 text-center text-sm text-muted-foreground"
  >
    Henüz bölüm eklenmemiş
  </div>
  <div
    v-else
    ref="gridEl"
    class="grid grid-cols-5 gap-2"
  >
    <a
      v-for="item in items"
      :key="item.id"
      :href="`/anime/${slug}?ep=${item.id}`"
      :data-ep="item.number"
      :title="`Bölüm ${item.number} — ${item.title}`"
      class="aspect-square flex items-center justify-center rounded-lg text-sm font-medium border transition-colors focus:outline-none"
      :class="[
        item.number === currentNumber
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card text-foreground border-border hover:bg-accent/50',
        focusedNumber === item.number && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
      ]"
      @click="onCellClick"
    >
      {{ item.number }}
    </a>
  </div>
</template>
```

- [ ] **Step 16.2: Commit**

```bash
git add components/EpisodeGrid.vue
git commit -m "feat: add 5-column episode number grid"
```

---

## Task 17: EpisodeNavigator composition

**Files:**
- Create: `app/components/EpisodeNavigator.vue`

- [ ] **Step 17.1: Component'i yaz**

`app/components/EpisodeNavigator.vue`:

```vue
<script setup lang="ts">
import type { Anime } from '~/types/anime'

const props = defineProps<{ anime: Anime }>()

const episodesRef = computed(() => props.anime.episodes)
const currentRef = computed(() => props.anime.currentEpisodeNumber)

const { pages, activePageIndex, focusedEpisode, setPage, jumpToEpisode } =
  useEpisodePages(episodesRef, currentRef)

const activePage = computed(() => pages.value[activePageIndex.value])
const activeItems = computed(() => activePage.value?.items ?? [])

const current = computed(() =>
  props.anime.episodes.find(e => e.number === props.anime.currentEpisodeNumber),
)

const showSearch = computed(() => props.anime.episodes.length >= 10)
</script>

<template>
  <section class="bg-card border border-border rounded-2xl p-4 space-y-4 lg:sticky lg:top-20">
    <header class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2">
        <Icon name="lucide:list" class="size-4 text-primary" />
        <h2 class="text-base font-semibold">Bölümler</h2>
      </div>
      <div class="text-xs text-muted-foreground">
        {{ anime.episodes.length }} bölüm · {{ anime.status === 'airing' ? 'Devam ediyor' : 'Tamamlandı' }}
      </div>
    </header>

    <EpisodeRangeTabs
      :pages="pages"
      :active-index="activePageIndex"
      @select="setPage"
    />

    <EpisodeSearch
      v-if="showSearch"
      :max="anime.episodes.length"
      @jump="jumpToEpisode"
    />

    <EpisodeGrid
      :items="activeItems"
      :current-number="anime.currentEpisodeNumber"
      :focused-number="focusedEpisode"
      :slug="anime.slug"
    />

    <footer
      v-if="current"
      class="flex items-center gap-2 pt-3 border-t border-border text-xs text-muted-foreground"
    >
      <Icon name="lucide:play" class="size-3.5 text-primary shrink-0" />
      <span class="truncate">
        Şu an: Bölüm {{ current.number }} — "{{ current.title }}"
      </span>
    </footer>
  </section>
</template>
```

- [ ] **Step 17.2: Commit**

```bash
git add components/EpisodeNavigator.vue
git commit -m "feat: compose episode navigator"
```

---

## Task 18: RelatedAnimeCard + list

**Files:**
- Create: `app/components/RelatedAnimeCard.vue`

- [ ] **Step 18.1: Component'i yaz**

`app/components/RelatedAnimeCard.vue`:

```vue
<script setup lang="ts">
import type { RelatedAnime } from '~/types/anime'

defineProps<{ items: RelatedAnime[] }>()
</script>

<template>
  <section class="bg-card border border-border rounded-2xl p-4 space-y-3">
    <h2 class="text-base font-semibold">Benzer Animeler</h2>
    <ul class="space-y-2">
      <li v-for="a in items" :key="a.slug">
        <NuxtLink
          :to="`/anime/${a.slug}`"
          class="flex gap-3 items-center p-2 rounded-lg hover:bg-accent/40 transition-colors"
        >
          <img
            :src="a.poster"
            :alt="a.title"
            class="w-12 aspect-[2/3] rounded-md object-cover shrink-0"
            loading="lazy"
          />
          <div class="min-w-0">
            <div class="text-sm font-medium truncate">{{ a.title }}</div>
            <div class="text-xs text-muted-foreground">{{ a.year }}</div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
```

- [ ] **Step 18.2: Commit**

```bash
git add components/RelatedAnimeCard.vue
git commit -m "feat: add related anime list card"
```

---

## Task 19: CommentsPlaceholder

**Files:**
- Create: `app/components/CommentsPlaceholder.vue`

- [ ] **Step 19.1: Component'i yaz**

`app/components/CommentsPlaceholder.vue`:

```vue
<script setup lang="ts">
const mock = [
  { name: 'Emre Y.', date: '2 gün önce', text: 'Kimetsu no Yaiba'ın animasyon kalitesi gerçekten çok iyi, ufotable her zamanki gibi harika iş çıkarmış.' },
  { name: 'Selin K.', date: '4 gün önce', text: 'Tanjirou karakteri çok iyi yazılmış. Kardeşine olan bağlılığı etkileyici.' },
  { name: 'Berk A.', date: '1 hafta önce', text: 'Savaş sahneleri görsel olarak çok etkileyici. Aksiyon anime sevenler için birebir.' },
]
</script>

<template>
  <section>
    <h2 class="text-xl font-semibold mb-4">Yorumlar</h2>
    <ul class="space-y-3">
      <li
        v-for="c in mock"
        :key="c.name"
        class="p-4 rounded-lg bg-card border border-border"
      >
        <div class="flex items-center justify-between mb-2">
          <div class="font-medium text-sm">{{ c.name }}</div>
          <div class="text-xs text-muted-foreground">{{ c.date }}</div>
        </div>
        <p class="text-sm text-muted-foreground">{{ c.text }}</p>
      </li>
    </ul>
  </section>
</template>
```

- [ ] **Step 19.2: Commit**

```bash
git add components/CommentsPlaceholder.vue
git commit -m "feat: add comments placeholder"
```

---

## Task 20: Detail page — `pages/anime/[slug].vue`

**Files:**
- Create: `app/pages/anime/[slug].vue`

- [ ] **Step 20.1: Page'i yaz**

`app/pages/anime/[slug].vue`:

```vue
<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const anime = await useAnime(slug.value)

if (!anime) {
  throw createError({ statusCode: 404, statusMessage: 'Anime bulunamadı' })
}

useHead({ title: `${anime.title} | UICloud` })
</script>

<template>
  <div v-if="anime">
    <AnimeHero :anime="anime" />

    <div class="container mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Episode Navigator: mobile order 1, desktop sağ üst -->
      <div class="order-1 lg:order-none lg:col-start-3 lg:row-start-1">
        <EpisodeNavigator :anime="anime" />
      </div>

      <!-- Synopsis: mobile order 2, desktop sol üst -->
      <div class="order-2 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-1">
        <SynopsisCollapse :synopsis="anime.synopsis" />
      </div>

      <!-- Characters: mobile order 3, desktop sol -->
      <div class="order-3 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-2">
        <CharactersGrid :characters="anime.characters" />
      </div>

      <!-- Related: mobile order 4, desktop sağ alt -->
      <div class="order-4 lg:order-none lg:col-start-3 lg:row-start-2">
        <RelatedAnimeCard :items="anime.related" />
      </div>

      <!-- Comments: mobile order 5, desktop sol en alt -->
      <div class="order-5 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-3">
        <CommentsPlaceholder />
      </div>
    </div>
  </div>
</template>
```

**Not:** `useAnime` şu an async function; `<script setup>` top-level await Nuxt'ta desteklenir.

- [ ] **Step 20.2: Commit**

```bash
git add pages/anime/
git commit -m "feat: add anime detail page with grid placement"
```

---

## Task 21: Manuel doğrulama — Kimetsu

- [ ] **Step 21.1: Dev server'ı başlat**

```bash
pnpm dev
```

- [ ] **Step 21.2: `/anime/kimetsu` kontrol et**

Tarayıcı: `http://localhost:3000/anime/kimetsu`

Doğrula:
- [ ] Üstte AppHeader (sticky)
- [ ] AnimeHero: banner + poster + başlık + Japonca başlık + yıl + studio + genre badges
- [ ] Sol kolon (desktop lg≥1024):
  - Açıklama başlığı + metin, ilk 240px görünür, altında gradient fade, "Daha Fazla Oku" butonu
  - Butona basınca genişler, "Daha Az Göster" olur
- [ ] Sol kolon devamı:
  - Karakterler başlığı "(10)", grid 2 kolon (desktop), ilk 4 kart görünür
  - "Daha Fazla Göster (+6)" butonu var, tıklayınca 10 kart açılır
- [ ] Sol kolon en alt:
  - Yorumlar — 3 mock yorum
- [ ] Sağ kolon üst (sticky):
  - Episode Navigator — başlık "Bölümler", meta "26 bölüm · Tamamlandı"
  - Range chip tabs **görünmez** (tek range)
  - Search input (26 ≥ 10) görünür
  - Grid 5 kolon × 6 satır (26 item), bölüm 5 primary dolu
  - Footer: "Şu an: Bölüm 5 — Kendi Bıçağın"
- [ ] Sağ kolon alt: "Benzer Animeler" listesi, 4 item

Herhangi biri bozuksa o adıma geri dön ve düzelt.

- [ ] **Step 21.3: Episode search test et**

- [ ] Search'e `3` yaz, Enter: hücre 3 primary ring ile highlighted, smooth scroll
- [ ] Search'e `99` yaz, Enter: input border kırmızı, highlight yok
- [ ] Search'e `0` yaz, Enter: input border kırmızı

---

## Task 22: Manuel doğrulama — One Piece

- [ ] **Step 22.1: `/anime/one-piece`'i aç**

`http://localhost:3000/anime/one-piece`

Doğrula:
- [ ] Hero: poster + "One Piece" + 1999 + Toei + "Devam ediyor"
- [ ] Synopsis **kısa** — collapse butonu **yok**, gradient **yok**
- [ ] Karakterler (20): ilk 4 görünür, "Daha Fazla Göster (+16)" butonu
- [ ] Episode Navigator:
  - Meta: "1157 bölüm · Devam ediyor"
  - **12 range chip tabs** yatay scroll: `001-100`, `101-200`, ..., `1101-1157`
  - Active chip: `1001-1100` (1087 burada)
  - Search input var
  - Grid: 20 satır × 5 kolon (100 item), bölüm 1087 primary dolu
  - Footer: "Şu an: Bölüm 1087 — Bölüm 1087"

- [ ] **Step 22.2: Range chip tıklama**

- [ ] Chip `001-100` tıkla: grid 1-100 gösterir, hiçbir hücre primary değil (current 1087)
- [ ] Chip `1101-1157` tıkla: grid 1101-1157 gösterir (57 item), bölüm 1087 hala primary (o page 10'da)

- [ ] **Step 22.3: Search test**

- [ ] Search `500` Enter → chip `401-500`'e atlar, hücre 500 ring'li, smooth scroll
- [ ] Search `1087` Enter → chip `1001-1100`'e atlar, hücre 1087 primary + ring'li
- [ ] Search `9999` Enter → input kırmızı, page değişmez
- [ ] Search boş Enter → input kırmızı

---

## Task 23: Responsive doğrulama

- [ ] **Step 23.1: Tarayıcıda responsive mode aç**

Chrome DevTools → Toggle device toolbar (Ctrl+Shift+M)

- [ ] **Step 23.2: Mobile (ör. iPhone 14, 390px) `/anime/kimetsu`**

- [ ] Tek kolon akış
- [ ] Sıra: Hero → **EpisodeNavigator** → Synopsis → Characters → Related → Comments
- [ ] Characters mobile'da ilk 2 kart görünür (1 kolon × 2 satır), "Daha Fazla Göster (+8)"
- [ ] Navigator card tam genişlik, sticky **olmamalı** (`lg:sticky` class'ı)

- [ ] **Step 23.3: Mobile `/anime/one-piece`**

- [ ] Range chip tabs yatay scroll edilebilir
- [ ] Grid 5 kolon hala okunabilir (dar ekranda hücreler küçülür)
- [ ] Navigator synopsis'in üstünde

- [ ] **Step 23.4: Tablet (ör. iPad, 768px)**

- [ ] Hala tek kolon (lg breakpoint 1024px altında)
- [ ] Characters sm breakpoint geçerli: 2 kolon × 2 satır = 4 kart görünür collapsed'da

- [ ] **Step 23.5: Desktop (≥1024px)**

- [ ] Grid 3 kolon
- [ ] Navigator sticky çalışır (scroll yap, navigator üstte kalır)

- [ ] **Step 23.6: Commit manuel düzeltmeler varsa**

Herhangi bir düzeltme yaptıysan:
```bash
git add -A
git commit -m "fix: responsive adjustments after manual testing"
```

---

## Task 24: README + çalıştırma notları

**Files:**
- Create: `app/README.md`

- [ ] **Step 24.1: README yaz**

`app/README.md`:

```markdown
# UICloud Anime Demo

Nuxt 3 + Tailwind CSS ile UICloud kitindeki anime detail page refactor brief'inin çalışan demo'su.

## Gereksinimler
- Node.js ≥ 18.17
- pnpm ≥ 8

## Kurulum
\`\`\`bash
pnpm install
\`\`\`

## Çalıştır
\`\`\`bash
pnpm dev
\`\`\`
Tarayıcıda: http://localhost:3000

## Sayfalar
- `/` — iki demo anime listesi
- `/anime/kimetsu` — 26 ep, uzun synopsis, 10 karakter (collapse senaryoları)
- `/anime/one-piece` — 1157 ep, kısa synopsis, 20 karakter (100-blok navigator senaryosu)

## Test
\`\`\`bash
pnpm test              # useEpisodePages unit testleri
\`\`\`

## Build
\`\`\`bash
pnpm build
pnpm preview
\`\`\`

## Spec & Plan
- Design spec: `../docs/superpowers/specs/2026-04-19-anime-detail-demo-design.md`
- Implementation plan: `../docs/superpowers/plans/2026-04-19-anime-detail-demo.md`
```

- [ ] **Step 24.2: Commit**

```bash
git add README.md
git commit -m "docs: add app README"
```

---

## Task 25: Final sanity pass

- [ ] **Step 25.1: Temiz install testi**

```bash
cd C:\Users\kira\Documents\GitHub\UICloud\app
Remove-Item -Recurse -Force node_modules, .nuxt, .output -ErrorAction SilentlyContinue
pnpm install
pnpm test
pnpm dev
```

(PowerShell syntax; bash için: `rm -rf node_modules .nuxt .output && pnpm install && pnpm test && pnpm dev`)

Expected:
- `pnpm install` temiz, warning olabilir ama error yok
- `pnpm test` → 9 passed
- `pnpm dev` → `http://localhost:3000` açılır

- [ ] **Step 25.2: TypeScript check**

```bash
pnpm nuxi typecheck
```

Expected: No errors.

Hata varsa kaynağını düzelt ve commit et.

- [ ] **Step 25.3: Build testi**

```bash
pnpm build
```

Expected: Build succeeded.

- [ ] **Step 25.4: Final commit (gerekiyorsa)**

```bash
git add -A
git commit -m "chore: final cleanup"
```

---

## Kabul Kontrolü (Spec §13 + UICloud acceptance-criteria.md)

Bu checklist'i elle doğrula — hepsi ✅ olmalı:

### Layout
- [ ] `/anime/kimetsu` sol akışında eski "Bölümler" listesi **yok**
- [ ] Sağ üstte yeni Episode Navigator **var**
- [ ] Related anime Episode Navigator'ın altında
- [ ] Koyu tema tüm sayfalarda tutarlı

### Episodes
- [ ] 100'lü blok sistemi One Piece'te çalışır (12 range)
- [ ] Range seçici chip tabs olarak var
- [ ] Episode number search var ve çalışır
- [ ] Episode numaraları 5-kolon grid
- [ ] Aktif bölüm primary dolu
- [ ] 1157 ep senaryosunda tasarım bozulmuyor

### Characters
- [ ] Başlangıçta mobile'da 2 kart, sm+'ta 4 kart görünür
- [ ] "Daha Fazla Göster" ile tümü açılır
- [ ] "Daha Az Göster" ile kapanır

### Synopsis
- [ ] Uzun synopsis (Kimetsu) 240px collapsed, gradient fade var
- [ ] "Daha Fazla Oku" çalışır
- [ ] Kısa synopsis (One Piece) button **yok**

### Quality
- [ ] Duplicate content yok (sol akışta episodes render edilmiyor)
- [ ] Mobile tek kolon düzgün, navigator üstte
- [ ] Hover state'ler var (range chips, characters, related)
- [ ] Episode linkleri URL oluşturuyor (tıklamada demo için preventDefault)

---

## Execution Handoff

Plan hazır: `docs/superpowers/plans/2026-04-19-anime-detail-demo.md`

İki execution seçeneği:

**1. Subagent-Driven (önerilen)** — Her task için fresh subagent dispatch, task arası review, hızlı iterasyon

**2. Inline Execution** — Aynı session'da executing-plans skill'i ile batch, checkpoint'lerle review

Hangisi?
