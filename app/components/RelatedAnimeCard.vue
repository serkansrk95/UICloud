<script setup lang="ts">
import type { RelatedAnime } from '~/types/anime'

defineProps<{ items: RelatedAnime[] }>()
</script>

<template>
  <section class="bg-card border border-border rounded-xl p-3 space-y-2">
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
