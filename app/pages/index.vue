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
