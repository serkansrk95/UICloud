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
