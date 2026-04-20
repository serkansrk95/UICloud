# Current Characters Reference

Aşağıdaki snippet mevcut karakter grid yapısını temsil eder.

```html
ll="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide size-4 lucide-chevron-right-icon lucide-chevron-right size-4" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg></a></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="flex gap-3 p-3 rounded-lg bg-card border border-border"><div class="flex items-center gap-3 flex-1"><div class="size-14 rounded-lg overflow-hidden bg-muted shrink-0"><img data-nuxt-img="" srcset="https://cdn.myanimelist.net/images/characters/6/386735.jpg 1x, https://cdn.myanimelist.net/images/characters/6/386735.jpg 2x" alt="Tanjirou Kamado" class="w-full h-full object-cover" loading="lazy" src="https://cdn.myanimelist.net/images/characters/6/386735.jpg"></div><div class="min-w-0"><p class="font-medium text-foreground text-sm truncate">Tanjirou Kamado</p><p class="text-xs text-muted-foreground">Ana Karakter</p></div></div><div class="flex items-center gap-3 flex-1 justify-end text-right"><div class="min-w-0"><p class="font-medium text-foreground text-sm truncate">Satomi Satou</p><p class="text-xs text-muted-foreground">Japonca</p></div><div class="size-14 rounded-lg overflow-hidden bg-muted shrink-0"><img data-nuxt-img="" srcset="https://cdn.myanimelist.net/images/voiceactors/2/65775.jpg 1x, https://cdn.myanimelist.net/images/voiceactors/2/65775.jpg 2x" alt="Satomi Satou" class="w-full h-full object-cover" loading="lazy" src="https://cdn.myanimelist.net/images/voiceactors/2/65775.jpg"></div></div></div><div class="flex gap-3 p-3 rounded-lg bg-card border border-border"><div class="flex items-center gap-3 flex-1"><div class="size-14 rounded-lg overflow-hidden bg-muted shrink-0"><img data-nuxt-img="" srcset="https://cdn.myanimelist.net/images/characters/5/388816.jpg 1x, https://cdn.myanimelist.net/images/characters/5/388816.j
```

## Gözlem
- Karakterler `grid grid-cols-1 sm:grid-cols-2 gap-4` mantığında
- Bu yüzden 2 satır sınırı, grid davranışını dikkate alarak kurulmalı
