<script setup lang="ts">
import type { Character } from '~/types/anime'

const props = defineProps<{ characters: Character[] }>()

const showAll = ref(false)

const showButtonMobile = computed(() => props.characters.length > 2)
const showButtonDesktop = computed(() => props.characters.length > 4)
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold">
        Karakterler
        <span class="text-muted-foreground font-normal text-sm">({{ characters.length }})</span>
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div
        v-for="(c, i) in characters"
        :key="c.name"
        class="flex gap-2 p-2 rounded-lg bg-card border border-border"
        :class="[
          !showAll && i >= 2 && i < 4 && 'hidden sm:flex',
          !showAll && i >= 4 && 'hidden',
        ]"
      >
        <div class="flex items-center gap-2 flex-1 min-w-0">
          <div class="size-10 rounded-md overflow-hidden bg-muted shrink-0">
            <img :src="c.image" :alt="c.name" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-xs leading-tight truncate">{{ c.name }}</p>
            <p class="text-[11px] text-muted-foreground leading-tight">{{ c.role }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-1 justify-end text-right min-w-0">
          <div class="min-w-0">
            <p class="font-medium text-xs leading-tight truncate">{{ c.vaName }}</p>
            <p class="text-[11px] text-muted-foreground leading-tight">{{ c.vaLang }}</p>
          </div>
          <div class="size-10 rounded-md overflow-hidden bg-muted shrink-0">
            <img :src="c.vaImage" :alt="c.vaName" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="showButtonMobile || showButtonDesktop"
      type="button"
      class="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline"
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
