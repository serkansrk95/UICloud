<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
    <div class="container mx-auto px-4 lg:px-6 h-16 flex items-center gap-4">
      <NuxtLink to="/" class="text-xl font-bold text-primary hover:opacity-80">
        UICloud
      </NuxtLink>
      <div class="flex-1 max-w-md">
        <div class="relative">
          <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Anime ara..."
            class="w-full h-9 pl-9 pr-3 rounded-lg bg-muted border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            readonly
          />
        </div>
      </div>
    </div>
  </header>
</template>
