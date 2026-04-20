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
  <section class="bg-card border border-border rounded-xl p-3 space-y-3 lg:sticky lg:top-[72px]">
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
