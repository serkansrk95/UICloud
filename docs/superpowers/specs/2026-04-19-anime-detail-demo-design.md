# Anime Detail Demo — Design Spec

**Tarih:** 2026-04-19
**Hedef:** UICloud kitindeki anime detail page refactor brief'ini, lokalde çalıştırılabilir bir Nuxt 3 + Tailwind CSS demo uygulamasına dönüştürmek.
**Konum:** `C:\Users\kira\Documents\GitHub\UICloud\app\`

---

## 1. Amaç

UICloud kiti (rules, skills, references, docs) mevcut bir projeye uygulanmak üzere tasarlanmıştır ancak kendi içinde kod barındırmaz. Bu spec, kitin dayattığı tasarım hedeflerini — sağ üstte 100'lü blok episode navigator, karakterler için 2-satır collapse, synopsis için kontrollü yükseklik — **bağımsız bir demo uygulamada** somutlaştırır.

Demo, kitin referans verdiği tasarım dilini (koyu tema, shadcn tokenları, kart yapısı) **sıfırdan** kurar; böylece hem tasarım doğrulaması yapılabilir, hem ileride asıl projeye taşınacak component sözleşmeleri çalışır halde görülebilir.

## 2. Kapsam

### Kapsam içinde
- Nuxt 3 + TypeScript + Tailwind CSS projesi iskeleti
- Ana sayfa (`/`) — iki demo anime için giriş kartları
- Detail sayfası (`/anime/[slug]`) — tüm refactor hedeflerini barındırır
- Mock data: `kimetsu` (26 bölüm) ve `one-piece` (1157 bölüm)
- Episode Navigator component (Yaklaşım 2: compact number grid + range chips + search)
- Characters 2-row collapse component
- Synopsis collapse component
- Minimal header ve sayfa çerçevesi
- Lokal `pnpm dev` ile çalışır durum

### Kapsam dışı
- Gerçek API / backend
- Auth / user state / watched episode persistence
- Yorum sistemi (yalnızca placeholder)
- Çoklu tema (yalnızca koyu tema)
- SSR/SSG optimizasyonu (default Nuxt davranışı yeterli)
- i18n altyapısı (içerik Türkçe/İngilizce karışık, olduğu gibi)

## 3. Stack

| Katman | Seçim | Gerekçe |
|---|---|---|
| Framework | Nuxt 3 (latest stable) | Dosya bazlı routing, SSR ready, kit Vue ekosistemine işaret ediyor (`data-nuxt-img` referansı) |
| Dil | TypeScript | Tip güvenliği, component kontratları net |
| Styling | Tailwind CSS + `@nuxtjs/tailwindcss` | Referans HTML Tailwind utility'leri kullanıyor |
| Token sistemi | Tailwind + CSS variables (shadcn-uyumlu) | `bg-card`, `border-border`, `text-muted-foreground`, `bg-primary/10` sınıfları referansta kullanılıyor; shadcn kurmadan aynı sonucu almak en temiz |
| İkonlar | `@nuxt/icon` + `lucide` seti | Referans HTML'de lucide ikonları |
| Paket yöneticisi | pnpm | Hızlı, Windows dostu |
| Node | ≥ 18.17 | Nuxt 3 gereksinimi |

## 4. Design Tokens

`assets/css/tokens.css` — yalnızca koyu tema için CSS custom properties.

```css
:root, .dark {
  --background: 220 15% 8%;
  --foreground: 0 0% 98%;
  --card: 220 15% 11%;
  --card-foreground: 0 0% 98%;
  --muted: 220 12% 16%;
  --muted-foreground: 220 10% 65%;
  --border: 220 12% 18%;
  --input: 220 12% 18%;
  --primary: 14 85% 55%;            /* warm red/orange — Kimetsu/One Piece ailesine uyum */
  --primary-foreground: 0 0% 100%;
  --accent: 220 12% 20%;
  --accent-foreground: 0 0% 98%;
  --radius: 0.75rem;
}
```

`tailwind.config.ts` bu değişkenleri okur:

```ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  muted: 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  primary: 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  accent: 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
},
borderRadius: {
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 0.25rem)',
  '2xl': 'calc(var(--radius) + 0.5rem)',
},
```

Root `<html class="dark">` sabit — tema toggle yok.

## 5. Dosya Ağacı

```
app/
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   └── main.css              (Tailwind directives + prose overrides)
│   └── mock/
│       ├── kimetsu.json
│       └── one-piece.json
├── composables/
│   ├── useAnime.ts               (slug → mock JSON yükleyici)
│   └── useEpisodePages.ts        (episodes[] → 100'lü bloklar + search logic)
├── components/
│   ├── AppHeader.vue
│   ├── AnimeHero.vue
│   ├── SynopsisCollapse.vue
│   ├── CharactersGrid.vue
│   ├── CommentsPlaceholder.vue
│   ├── EpisodeNavigator.vue
│   ├── EpisodeRangeTabs.vue
│   ├── EpisodeSearch.vue
│   ├── EpisodeGrid.vue
│   └── RelatedAnimeCard.vue
├── pages/
│   ├── index.vue
│   └── anime/
│       └── [slug].vue
├── layouts/
│   └── default.vue
└── types/
    └── anime.ts                  (Anime, Character, Episode, RelatedAnime)
```

## 6. Data Model

`types/anime.ts`:

```ts
export type Episode = {
  number: number
  id: string
  title: string
  titleJa: string
  airDate: string                 // ISO 8601
}

export type Character = {
  name: string
  role: string                    // "Ana Karakter", "Yan Karakter" vs.
  image: string
  vaName: string
  vaLang: string                  // "Japonca" / "İngilizce" vs.
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
  synopsis: string                // rich prose, \n\n paragraph separator
  poster: string                  // external CDN url
  banner: string
  characters: Character[]
  episodes: Episode[]
  currentEpisodeNumber: number    // demo: Kimetsu=5, One Piece=1087
  related: RelatedAnime[]
}
```

`currentEpisodeNumber` sadece numara tutar. Component'ler tam Episode nesnesine ihtiyaç duyduğunda `episodes.find(e => e.number === currentEpisodeNumber)` ile çözer.

```ts
// örnek composable kullanımı
const currentEpisode = computed(() =>
  episodes.value.find(e => e.number === currentEpisodeNumber.value)
)
}
```

## 7. Page Layout — `pages/anime/[slug].vue`

### Desktop (lg ≥ 1024px)

```
┌─ AppHeader (sticky) ────────────────────────────────┐
│                                                      │
├─ AnimeHero (container, banner bg + poster + meta) ──┤
│                                                      │
├─ container.grid.grid-cols-3.gap-8 ──┬────────────────┤
│ lg:col-span-2 (SOL)                 │ lg:col-span-1  │
│                                     │  (SAĞ sidebar) │
│ ┌─ SynopsisCollapse ──────────────┐ │ ┌────────────┐ │
│ │                                 │ │ │ Episode    │ │
│ └─────────────────────────────────┘ │ │ Navigator  │ │
│                                     │ │ (sticky)   │ │
│ ┌─ CharactersGrid ────────────────┐ │ └────────────┘ │
│ │                                 │ │                 │
│ └─────────────────────────────────┘ │ ┌────────────┐ │
│                                     │ │ Related    │ │
│ ┌─ CommentsPlaceholder ───────────┐ │ │ Anime list │ │
│ │                                 │ │ └────────────┘ │
│ └─────────────────────────────────┘ │                │
└─────────────────────────────────────┴────────────────┘
```

Grid: `container mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8`.

Grid children (wrapper yok, her biri doğrudan grid item):
- `EpisodeNavigator` — `lg:col-start-3 lg:row-start-1` — desktop'ta sağ kolon üst; mobile order: 1
- `SynopsisCollapse` — `lg:col-span-2 lg:col-start-1 lg:row-start-1` — desktop'ta sol üst; mobile order: 2
- `CharactersGrid` — `lg:col-span-2 lg:col-start-1` — desktop'ta sol; mobile order: 3
- `RelatedAnimeList` — `lg:col-start-3` — desktop'ta sağ kolon (navigator'ın altında); mobile order: 4
- `CommentsPlaceholder` — `lg:col-span-2 lg:col-start-1` — desktop'ta sol en alt; mobile order: 5

Navigator'a `sticky top-20` — desktop scroll'da üstte kalır.

### Mobile (<1024px) — tek kolon sıra

Grid `grid-cols-1` düştüğünde children'ın order'ı devreye girer:

1. AppHeader
2. AnimeHero
3. **EpisodeNavigator** (order-1 — aksiyonu öne al; `layout-rules.md` md. 7: "dar ekranlarda mantıklı sırayla alta inmeli", episode seçmek birincil aksiyon)
4. SynopsisCollapse (order-2)
5. CharactersGrid (order-3)
6. RelatedAnime listesi (order-4)
7. CommentsPlaceholder (order-5)

Mobile için her grid child'a `order-*` sınıfı eklenir; desktop'ta `lg:order-none` ile nötralize edilip `col-start`/`row-start` yerleşimine döner.

## 8. Component — `EpisodeNavigator.vue`

### Root
```html
<section class="bg-card border border-border rounded-2xl p-4 space-y-4 sticky top-20">
```

### Anatomi

```
┌─ Header ─────────────────────────────────────────────┐
│ [icon] Bölümler              1157 bölüm · Completed  │
├─ EpisodeRangeTabs (yatay scroll) ────────────────────┤
│ [001-100][101-200]…[1101-1157]                       │
├─ EpisodeSearch ──────────────────────────────────────┤
│ [🔍] Bölüm numarası                                   │
├─ EpisodeGrid (5 kolon) ──────────────────────────────┤
│ 001  002  003  004  005                              │
│ 006  007  008  009  010                              │
│ ...                                                   │
├─ Current Episode Footer ─────────────────────────────┤
│ ▶ Şu an: Bölüm 5 — "Kendi Bıçağın"                   │
└──────────────────────────────────────────────────────┘
```

### State (composable)

```ts
// composables/useEpisodePages.ts
type EpisodePage = {
  index: number
  start: number
  end: number
  label: string              // "001-100"
  items: Episode[]
}

export function useEpisodePages(
  episodes: Ref<Episode[]>,
  currentEpisodeNumber: Ref<number>
) {
  const PAGE_SIZE = 100
  const pages = computed<EpisodePage[]>(() => { /* slice episodes into 100s */ })
  const activePageIndex = ref(0)
  const focusedEpisode = ref<number | null>(null)

  // on mount: set activePageIndex to page containing currentEpisodeNumber
  // jumpToEpisode(n): finds page index, sets activePageIndex, sets focusedEpisode=n
  // setPage(i): sets activePageIndex, clears focusedEpisode

  return { pages, activePageIndex, setPage, jumpToEpisode, focusedEpisode }
}
```

### Sub-component: `EpisodeRangeTabs.vue`
- Props: `pages: EpisodePage[]`, `activeIndex: number`, `onSelect(i: number)`
- Render: `<div class="flex overflow-x-auto gap-2 pb-1">` içinde her chip `<button class="shrink-0 px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-accent transition-colors" :class="active && 'bg-primary text-primary-foreground border-primary'">`
- Tek range varsa (`pages.length === 1`) komple gizlenir.

### Sub-component: `EpisodeSearch.vue`
- Props: `max: number`, `onJump(n: number)`
- Input: type=number, min=1, max=max, placeholder="Bölüm numarası"
- Enter veya debounce 300ms sonra `onJump(n)`
- Geçersiz numara (< 1 veya > max) → input'a `border-red-500/50`, jump tetiklenmez
- Episode sayısı < 10 ise tamamen gizlenir.

### Sub-component: `EpisodeGrid.vue`
- Props: `items: Episode[]`, `currentNumber: number`, `focusedNumber: number | null`
- Render: `<div class="grid grid-cols-5 gap-2">` hücreler `<a>` (link, `/anime/[slug]?ep=<id>` — demo olarak sadece `e.preventDefault()` + console log)
- Hücre class'ları:
  - Base: `aspect-square flex items-center justify-center rounded-lg text-sm font-medium border transition-colors`
  - Default/available: `bg-card border-border hover:bg-accent/50 hover:border-border`
  - Current (`item.number === currentNumber`): `bg-primary text-primary-foreground border-primary`
  - Focused via search: `ring-2 ring-primary ring-offset-2 ring-offset-background`
- Focus state'inde `nextTick` + `scrollIntoView({ behavior: 'smooth', block: 'center' })`
- Tooltip: native `title` attribute (episode title + air date) — hover'da görünür. Custom tooltip kütüphanesi eklemiyoruz.

### Current Episode Footer
- `<div class="flex items-center gap-3 pt-3 border-t border-border text-sm">`
- `<Icon name="lucide:play" class="size-4 text-primary" />`
- `Şu an: Bölüm {{ current.number }} — "{{ current.title }}"` (current = `episodes.find(e => e.number === currentEpisodeNumber)`)
- `current` undefined ise footer render edilmez.

### Empty/edge cases (no-regression-rules uyumlu)
- `episodes.length === 0` → "Henüz bölüm eklenmemiş" empty state
- `episodes.length < 10` → search gizli
- `pages.length === 1` → range tabs gizli

## 9. Component — `CharactersGrid.vue`

### Anatomi
```html
<section>
  <header>
    <h2>Karakterler <span>({{ characters.length }})</span></h2>
  </header>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <CharacterCard v-for="c in visible" :key="c.name" :character="c" />
  </div>
  <button v-if="characters.length > threshold" @click="toggle">
    {{ showAll ? 'Daha Az Göster' : `Daha Fazla Göster (+${characters.length - threshold})` }}
  </button>
</section>
```

### Logic
- `showAll = ref(false)`
- **Breakpoint bazlı gizleme:** grid 2 breakpoint kullanır (mobile=1 kolon, sm+=2 kolon). "2 satır" demek:
  - mobile → 2 kart
  - sm+ → 4 kart
- Implementation: tüm karakterler her zaman DOM'a render edilir; collapsed durumda CSS ile fazlalar gizlenir:
  ```html
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <CharacterCard
      v-for="(c, i) in characters"
      :key="c.name"
      :character="c"
      :class="[
        !showAll && i >= 2 && 'hidden',
        !showAll && i >= 2 && i < 4 && 'sm:flex'
      ]"
    />
  </div>
  ```
  - İlk 2 kart: her zaman görünür
  - Kart 3-4: mobile'da gizli, sm+'ta görünür
  - Kart 5+: collapsed'da tamamen gizli
- Button metni:
  - mobile: `Daha Fazla Göster (+${characters.length - 2})`
  - sm+: `Daha Fazla Göster (+${characters.length - 4})`
  - Tailwind responsive `hidden sm:inline` ile iki metin de render edilir, breakpoint'e göre biri görünür
- Button görünürlüğü:
  - mobile: `characters.length > 2` ise göster
  - sm+: `characters.length > 4` ise göster
  - CSS: `hidden` ile threshold'a göre gizle; en az bir breakpoint'te expand gerekiyorsa DOM'da var
- Layout jump: DOM sabit, sadece `hidden` class toggle olur — deterministik, min jump

### Card tasarımı (referans HTML'e sadık)
```html
<div class="flex gap-3 p-3 rounded-lg bg-card border border-border">
  <!-- sol: karakter image + isim + rol -->
  <!-- sağ: VA image + isim + dil -->
</div>
```

## 10. Component — `SynopsisCollapse.vue`

### Anatomi
```html
<section class="relative">
  <div
    ref="contentEl"
    class="prose prose-sm dark:prose-invert max-w-none overflow-hidden transition-[max-height] duration-300 ease-in-out"
    :style="{ maxHeight: expanded ? `${fullHeight}px` : '240px' }"
    v-html="renderedSynopsis"
  />
  <div
    v-if="!expanded && needsCollapse"
    class="absolute bottom-12 inset-x-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"
  />
  <button
    v-if="needsCollapse"
    @click="expanded = !expanded"
    :aria-expanded="expanded"
    class="mt-3 text-primary text-sm hover:underline flex items-center gap-1"
  >
    {{ expanded ? 'Daha Az Göster' : 'Daha Fazla Oku' }}
    <Icon :name="expanded ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="size-4" />
  </button>
</section>
```

### Logic
- `expanded = ref(false)`
- `fullHeight = ref(0)` — mount'ta `contentEl.scrollHeight` okunup saklanır; transition `px` değerine animate eder (`max-h-none` smooth animate etmez, bu yüzden sayısal yükseklik gerekir)
- `needsCollapse = computed(() => fullHeight.value > 240)` — kısa içerikte button ve gradient render edilmez (no-regression md. 6)
- `ResizeObserver` ile font yükleme sonrası yükseklik güncellenir
- Synopsis `\n\n` paragraflarını `<p>` olarak render eder (basit `split('\n\n').map(p => '<p>...</p>')`, rich HTML değil — XSS riski olmadığından `v-html` güvenli)
- `aria-expanded` button üstünde, `aria-controls` content'in id'sine işaret eder

### Gradient
- `from-background to-transparent` — koyu tema için `--background` hsl'ine fade
- Gradient içeriği blokla­maz (`pointer-events-none`)

## 11. Diğer Componentler

### `AppHeader.vue`
- `sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur`
- Sol: logo (text-only "UICloud", primary accent)
- Orta/sağ: search input placeholder (`<input readonly placeholder="Ara...">`)

### `AnimeHero.vue`
- Banner: `<div class="relative h-64 lg:h-80 overflow-hidden">` — `banner` image `object-cover` + altta gradient overlay `from-background via-background/70 to-transparent`
- Poster + meta: container içinde `-mt-24 flex gap-6` — poster `w-40 lg:w-48 aspect-[2/3] rounded-2xl`, sağında başlık/yıl/studio/genre badge'leri

### `CommentsPlaceholder.vue`
- Minimal: `<h2>Yorumlar</h2>` + 3 mock yorum kartı (avatar + isim + tarih + text). Gerçek yorum akışı yok; regression rules "Comments bozulmayacak" dediği için yapıyı tutuyoruz.

### `RelatedAnimeCard.vue`
- Küçük kart: poster (`aspect-[2/3] w-16 rounded-lg`) + başlık + yıl
- `<NuxtLink :to="\`/anime/${slug}\`">` içinde
- Liste 4-5 item

### `pages/index.vue`
- Başlık: "UICloud Demo"
- Alt başlık: "İki demo anime — tasarım keşfi için"
- İki büyük kart (Kimetsu, One Piece) yan yana: poster + başlık + kısa açıklama + "Detaya git" CTA
- Grid: `grid grid-cols-1 sm:grid-cols-2 gap-6`

### `layouts/default.vue`
- `<AppHeader /> <main><slot /></main>` — footer demo'da yok (isteğe bağlı minimal footer eklenebilir, kapsam dışı)

## 12. Mock Data

### `kimetsu.json`
- slug: `kimetsu`, title: "Demon Slayer (Kimetsu no Yaiba)", titleJa: "鬼滅の刃"
- year: 2019, studio: "ufotable", status: "completed"
- genres: ["Action", "Supernatural", "Historical"]
- synopsis: UICloud `references/current-layout-reference.md` içindeki uzun Türkçe synopsis (~2 paragraf, ~450 kelime) — collapse tetikler
- poster: `https://cdn.myanimelist.net/images/anime/1286/99889.jpg` (MAL CDN)
- banner: `https://cdn.myanimelist.net/images/anime/1286/99889l.jpg`
- characters: 10 karakter — Tanjirou, Nezuko, Zenitsu, Inosuke, Giyuu, Shinobu, Kyojuro, Muzan, Sabito, Makomo (referans HTML'deki MAL character CDN URL'leri kullanılır)
- episodes: 26 tane — ilk 5'i gerçek başlık/tarih, sonrası `Bölüm N` + 2019-04-06'dan itibaren haftalık ISO tarih
- currentEpisodeNumber: 5
- related: 4 anime (Jujutsu Kaisen, Attack on Titan, Chainsaw Man, Demon Slayer: Mugen Train)

### `one-piece.json`
- slug: `one-piece`, title: "One Piece", titleJa: "ワンピース"
- year: 1999, studio: "Toei Animation", status: "airing"
- genres: ["Action", "Adventure", "Comedy", "Fantasy"]
- synopsis: kısa (~60-80 kelime tek paragraf) — `scrollHeight < 240` olacak, collapse butonu **görünmemeli** (kısa içerik senaryosu)
- poster: `https://cdn.myanimelist.net/images/anime/6/73245.jpg`
- banner: `https://cdn.myanimelist.net/images/anime/6/73245l.jpg`
- characters: 20 karakter — Luffy, Zoro, Nami, Usopp, Sanji, Chopper, Robin, Franky, Brook, Jinbe + 10 yan karakter (Shanks, Buggy, Ace, Sabo, Law, Boa Hancock, Mihawk, Garp, Kaido, Big Mom)
- episodes: 1157 — ilk 3'ü referans HTML'den (Luffy, Zoro, Morgan vs Luffy kupon başlıkları), sonrası `Bölüm N` + 1999-10-20'dan itibaren haftalık ISO tarih (procedural generation runtime'da değil, JSON'a önceden yazılır — deterministik)
- currentEpisodeNumber: 1087
- related: 5 anime (Naruto, Bleach, Dragon Ball Super, Hunter x Hunter, Fairy Tail)

## 13. Test Senaryoları

Acceptance (UICloud `docs/acceptance-criteria.md` maddeleri dahil):

| # | Senaryo | Beklenen |
|---|---|---|
| 1 | `/anime/kimetsu` desktop | Sol akış: synopsis → characters → comments. Sağ üst: EpisodeNavigator. Related navigator altında. Eski episode listesi yok. |
| 2 | `/anime/one-piece` desktop | 12 range chip, hepsi yatay scroll. Active chip `1001-1100`. Grid 5 kolon × 20 satır. Bölüm 1087 primary dolu. |
| 3 | One Piece search "500" Enter | Aktif chip `401-500`'e atlar, hücre 500 primary ring + smooth scroll. |
| 4 | One Piece search "9999" | Input kırmızı border, jump tetiklenmez. |
| 5 | Kimetsu characters | İlk render 4 kart, "Daha Fazla Göster (+6)" butonu. Click → 10 kart, "Daha Az Göster". |
| 6 | Kimetsu synopsis | Max-h 240px, gradient fade, "Daha Fazla Oku" butonu. Click → full expand. |
| 7 | One Piece synopsis | Kısa içerik → collapse butonu **yok**, gradient **yok**. |
| 8 | Mobile <1024px | Tek kolon. EpisodeNavigator synopsis üstünde (order-1). Related ve comments en altta. |
| 9 | Hover/focus | Episode hücrelerinde hover accent, chip tab hover accent, character card hover yok (statik). |
| 10 | Empty episodes (manuel test) | episodes boşsa navigator "Henüz bölüm eklenmemiş" gösterir. |

## 14. Çalıştırma

```bash
cd C:\Users\kira\Documents\GitHub\UICloud\app
pnpm install
pnpm dev
# http://localhost:3000
```

`package.json` scripts: `dev`, `build`, `preview`, `generate`, `typecheck`.

## 15. İleride — Kapsam dışı bırakılan

- Watched/unwatched state persistence (localStorage)
- Keyboard navigation (Tab focus ring'leri yeterli; arrow keys episode grid)
- Virtualization (1157 episode 5 kolon grid için şu anda sorun değil; 10k+ için gerekir)
- Theme toggle
- Gerçek yorum sistemi
- SSR için proper meta tags / OG images

Bunlar demo kapsamında YAGNI gereği yazılmıyor; ihtiyaç doğarsa ayrı spec ile eklenir.
