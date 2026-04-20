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
