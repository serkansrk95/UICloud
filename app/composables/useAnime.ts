import type { Anime } from '~/types/anime'

const loaders: Record<string, () => Promise<{ default: unknown }>> = {
  kimetsu: () => import('~/assets/mock/kimetsu.json'),
  'one-piece': () => import('~/assets/mock/one-piece.json'),
}

export async function useAnime(slug: string): Promise<Anime | null> {
  const loader = loaders[slug]
  if (!loader) return null
  const mod = await loader()
  return mod.default as Anime
}

export function listAnimeSlugs(): string[] {
  return Object.keys(loaders)
}
