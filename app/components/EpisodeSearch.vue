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
