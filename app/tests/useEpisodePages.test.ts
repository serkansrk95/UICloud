import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { useEpisodePages } from '~/composables/useEpisodePages'
import type { Episode } from '~/types/anime'

function makeEpisodes(n: number): Episode[] {
  return Array.from({ length: n }, (_, i) => ({
    number: i + 1,
    id: `ep-${i + 1}`,
    title: `Bölüm ${i + 1}`,
    titleJa: `第${i + 1}話`,
    airDate: '2020-01-01T00:00:00Z',
  }))
}

describe('useEpisodePages', () => {
  it('splits 100 episodes into a single page', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    expect(pages.value.length).toBe(1)
    expect(pages.value[0].start).toBe(1)
    expect(pages.value[0].end).toBe(100)
    expect(pages.value[0].label).toBe('001-100')
    expect(pages.value[0].items.length).toBe(100)
  })

  it('splits 250 episodes into 3 pages (100, 100, 50)', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(250)), ref(1))
    expect(pages.value.length).toBe(3)
    expect(pages.value[0].label).toBe('001-100')
    expect(pages.value[1].label).toBe('101-200')
    expect(pages.value[2].label).toBe('201-250')
    expect(pages.value[2].items.length).toBe(50)
  })

  it('splits 1157 episodes into 12 pages', () => {
    const { pages } = useEpisodePages(ref(makeEpisodes(1157)), ref(1))
    expect(pages.value.length).toBe(12)
    expect(pages.value[11].label).toBe('1101-1157')
    expect(pages.value[11].items.length).toBe(57)
  })

  it('sets active page to the one containing currentEpisodeNumber on init', () => {
    const { activePageIndex } = useEpisodePages(ref(makeEpisodes(500)), ref(287))
    expect(activePageIndex.value).toBe(2)
  })

  it('setPage updates activePageIndex and clears focusedEpisode', () => {
    const { setPage, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(300)), ref(1))
    setPage(2)
    expect(activePageIndex.value).toBe(2)
    expect(focusedEpisode.value).toBeNull()
  })

  it('jumpToEpisode switches page and sets focusedEpisode', () => {
    const { jumpToEpisode, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(500)), ref(1))
    jumpToEpisode(347)
    expect(activePageIndex.value).toBe(3)
    expect(focusedEpisode.value).toBe(347)
  })

  it('jumpToEpisode with invalid number does nothing', () => {
    const { jumpToEpisode, activePageIndex, focusedEpisode } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    jumpToEpisode(999)
    expect(activePageIndex.value).toBe(0)
    expect(focusedEpisode.value).toBeNull()
  })

  it('jumpToEpisode with 0 does nothing', () => {
    const { jumpToEpisode, focusedEpisode } = useEpisodePages(ref(makeEpisodes(100)), ref(1))
    jumpToEpisode(0)
    expect(focusedEpisode.value).toBeNull()
  })

  it('handles empty episodes array', () => {
    const { pages } = useEpisodePages(ref([]), ref(1))
    expect(pages.value.length).toBe(0)
  })
})
