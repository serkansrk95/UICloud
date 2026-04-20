export type Episode = {
  number: number
  id: string
  title: string
  titleJa: string
  airDate: string
}

export type Character = {
  name: string
  role: string
  image: string
  vaName: string
  vaLang: string
  vaImage: string
}

export type RelatedAnime = {
  slug: string
  title: string
  poster: string
  year: number
}

export type Anime = {
  slug: string
  title: string
  titleJa: string
  year: number
  studio: string
  status: 'airing' | 'completed'
  genres: string[]
  synopsis: string
  poster: string
  banner: string
  characters: Character[]
  episodes: Episode[]
  currentEpisodeNumber: number
  related: RelatedAnime[]
}
