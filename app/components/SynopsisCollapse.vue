<script setup lang="ts">
const props = defineProps<{ synopsis: string }>()

const contentEl = ref<HTMLDivElement | null>(null)
const fullHeight = ref(0)
const expanded = ref(false)
const contentId = useId()

const COLLAPSED_HEIGHT = 180

const needsCollapse = computed(() => fullHeight.value > COLLAPSED_HEIGHT)

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
    <h2 class="text-lg font-semibold mb-2">Açıklama</h2>
    <div class="relative">
      <div
        :id="contentId"
        ref="contentEl"
        class="prose prose-sm dark:prose-invert max-w-none overflow-hidden transition-[max-height] duration-300 ease-in-out text-muted-foreground"
        :style="{ maxHeight: expanded ? `${fullHeight}px` : `${COLLAPSED_HEIGHT}px` }"
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
