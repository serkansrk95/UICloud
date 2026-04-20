<script setup lang="ts">
import type { Anime } from '~/types/anime'

defineProps<{ anime: Anime }>()
</script>

<template>
  <section class="relative">
    <div class="relative h-40 lg:h-56 overflow-hidden">
      <img :src="anime.banner" :alt="anime.title" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
    <div class="container mx-auto px-4 lg:px-6 -mt-16 lg:-mt-20 relative flex flex-col sm:flex-row gap-4 lg:gap-5">
      <img
        :src="anime.poster"
        :alt="anime.title"
        class="w-24 lg:w-36 aspect-[2/3] rounded-xl object-cover shrink-0 border border-border shadow-xl"
      />
      <div class="flex-1 min-w-0 pt-1 sm:pt-16 lg:sm:pt-20">
        <h1 class="text-xl lg:text-3xl font-bold leading-tight">{{ anime.title }}</h1>
        <div class="mt-1 text-sm text-muted-foreground">
          <span>{{ anime.titleJa }}</span>
          <span class="mx-1.5">·</span>
          <span>{{ anime.year }}</span>
          <span class="mx-1.5">·</span>
          <span>{{ anime.studio }}</span>
          <span class="mx-1.5">·</span>
          <span>{{ anime.status === 'airing' ? 'Devam ediyor' : 'Tamamlandı' }}</span>
        </div>
        <div class="mt-2 flex flex-wrap gap-1.5">
          <span
            v-for="g in anime.genres"
            :key="g"
            class="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border"
          >
            {{ g }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
