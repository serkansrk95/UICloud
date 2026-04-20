import { ref, computed, type Ref } from 'vue'
import type { Episode } from '~/types/anime'

const PAGE_SIZE = 100

export type EpisodePage = {
  index: number
  start: number
  end: number
  label: string
  items: Episode[]
}

export function useEpisodePages(
  episodes: Ref<Episode[]>,
  currentEpisodeNumber: Ref<number>,
) {
  const pages = computed<EpisodePage[]>(() => {
    const all = episodes.value
    if (all.length === 0) return []
    const pageCount = Math.ceil(all.length / PAGE_SIZE)
    const result: EpisodePage[] = []
    for (let i = 0; i < pageCount; i++) {
      const start = i * PAGE_SIZE + 1
      const sliceEnd = Math.min((i + 1) * PAGE_SIZE, all.length)
      const items = all.slice(i * PAGE_SIZE, sliceEnd)
      const end = sliceEnd
      result.push({
        index: i,
        start,
        end,
        label: `${String(start).padStart(3, '0')}-${String(end).padStart(3, '0')}`,
        items,
      })
    }
    return result
  })

  const initialPage = computed(() => {
    const idx = Math.floor((currentEpisodeNumber.value - 1) / PAGE_SIZE)
    return Math.max(0, Math.min(idx, pages.value.length - 1))
  })

  const activePageIndex = ref(initialPage.value)
  const focusedEpisode = ref<number | null>(null)

  function setPage(i: number) {
    if (i < 0 || i >= pages.value.length) return
    activePageIndex.value = i
    focusedEpisode.value = null
  }

  function jumpToEpisode(n: number) {
    if (n < 1) return
    const all = episodes.value
    if (n > all.length) return
    const pageIdx = Math.floor((n - 1) / PAGE_SIZE)
    activePageIndex.value = pageIdx
    focusedEpisode.value = n
  }

  return {
    pages,
    activePageIndex,
    focusedEpisode,
    setPage,
    jumpToEpisode,
  }
}
