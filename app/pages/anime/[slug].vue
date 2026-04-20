<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const anime = await useAnime(slug.value)

if (!anime) {
  throw createError({ statusCode: 404, statusMessage: 'Anime bulunamadı' })
}

useHead({ title: `${anime.title} | UICloud` })
</script>

<template>
  <div v-if="anime">
    <AnimeHero :anime="anime" />

    <div class="container mx-auto px-4 lg:px-6 pt-4 pb-8 lg:pt-6 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
      <!-- Episode Navigator: mobile order 1, desktop sağ üst -->
      <div class="order-1 lg:order-none lg:col-start-3 lg:row-start-1">
        <EpisodeNavigator :anime="anime" />
      </div>

      <!-- Synopsis: mobile order 2, desktop sol üst -->
      <div class="order-2 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-1">
        <SynopsisCollapse :synopsis="anime.synopsis" />
      </div>

      <!-- Characters: mobile order 3, desktop sol -->
      <div class="order-3 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-2">
        <CharactersGrid :characters="anime.characters" />
      </div>

      <!-- Related: mobile order 4, desktop sağ alt -->
      <div class="order-4 lg:order-none lg:col-start-3 lg:row-start-2">
        <RelatedAnimeCard :items="anime.related" />
      </div>

      <!-- Comments: mobile order 5, desktop sol en alt -->
      <div class="order-5 lg:order-none lg:col-span-2 lg:col-start-1 lg:row-start-3">
        <CommentsPlaceholder />
      </div>
    </div>
  </div>
</template>
