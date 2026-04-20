import { writeFileSync } from 'node:fs'

const firstThree = [
  { number: 1, id: 'one-piece-ep-1', title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!", titleJa: 'Ore wa Luffy! Kaizoku Ou ni Naru Otoko Da!', airDate: '1999-10-20T00:00:00Z' },
  { number: 2, id: 'one-piece-ep-2', title: 'Enter the Great Swordsman! Pirate Hunter Roronoa Zoro!', titleJa: 'Daikengou Arawaru! Kaizokugari Roronoa Zoro', airDate: '1999-11-17T00:00:00Z' },
  { number: 3, id: 'one-piece-ep-3', title: "Morgan versus Luffy! Who's the Mysterious Pretty Girl?", titleJa: 'Morgan vs. Luffy! Nazo no Bishoujo wa Dare?', airDate: '1999-11-24T00:00:00Z' },
]

const episodes = [...firstThree]
const start = new Date('1999-12-01T00:00:00Z')
for (let n = 4; n <= 1157; n++) {
  const d = new Date(start.getTime() + (n - 4) * 7 * 86400000)
  episodes.push({
    number: n,
    id: `one-piece-ep-${n}`,
    title: `Bölüm ${n}`,
    titleJa: `第${n}話`,
    airDate: d.toISOString(),
  })
}

const characters = [
  ['Monkey D. Luffy', 'Ana Karakter', '40.jpg', 'Mayumi Tanaka'],
  ['Roronoa Zoro', 'Ana Karakter', '41.jpg', 'Kazuya Nakai'],
  ['Nami', 'Ana Karakter', '42.jpg', 'Akemi Okamura'],
  ['Usopp', 'Ana Karakter', '43.jpg', 'Kappei Yamaguchi'],
  ['Sanji', 'Ana Karakter', '44.jpg', 'Hiroaki Hirata'],
  ['Tony Tony Chopper', 'Ana Karakter', '45.jpg', 'Ikue Otani'],
  ['Nico Robin', 'Ana Karakter', '46.jpg', 'Yuriko Yamaguchi'],
  ['Franky', 'Ana Karakter', '47.jpg', 'Kazuki Yao'],
  ['Brook', 'Ana Karakter', '48.jpg', 'Cho'],
  ['Jinbe', 'Ana Karakter', '49.jpg', 'Daisuke Gouri'],
  ['Shanks', 'Yan Karakter', '50.jpg', 'Shuuichi Ikeda'],
  ['Buggy', 'Yan Karakter', '51.jpg', 'Shigeru Chiba'],
  ['Portgas D. Ace', 'Yan Karakter', '52.jpg', 'Toshio Furukawa'],
  ['Sabo', 'Yan Karakter', '53.jpg', 'Toru Furuya'],
  ['Trafalgar Law', 'Yan Karakter', '54.jpg', 'Hiroshi Kamiya'],
  ['Boa Hancock', 'Yan Karakter', '55.jpg', 'Kotono Mitsuishi'],
  ['Dracule Mihawk', 'Yan Karakter', '56.jpg', 'Takehito Koyasu'],
  ['Monkey D. Garp', 'Yan Karakter', '57.jpg', 'Hiroshi Naka'],
  ['Kaido', 'Antagonist', '58.jpg', 'Akio Otsuka'],
  ['Charlotte Linlin', 'Antagonist', '59.jpg', 'Mami Koyama'],
].map(([name, role, imgId, vaName], i) => ({
  name,
  role,
  image: `https://cdn.myanimelist.net/images/characters/9/${310000 + i}.jpg`,
  vaName,
  vaLang: 'Japonca',
  vaImage: `https://cdn.myanimelist.net/images/voiceactors/1/${80000 + i}.jpg`,
}))

const data = {
  slug: 'one-piece',
  title: 'One Piece',
  titleJa: 'ワンピース',
  year: 1999,
  studio: 'Toei Animation',
  status: 'airing',
  genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
  synopsis: 'Altın Korsan Roger idam edilmeden önce tüm hazinesinin varlığını açıkladı. Onlarca yıl sonra Monkey D. Luffy adında lastik bedenli bir genç, efsanevi One Piece hazinesini bularak Korsan Kralı olmak için denize açılır. Yol boyunca bir mürettebat kurar ve Grand Line boyunca tehlikeli maceralar yaşar.',
  poster: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
  banner: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
  characters,
  episodes,
  currentEpisodeNumber: 1087,
  related: [
    { slug: 'naruto', title: 'Naruto', poster: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg', year: 2002 },
    { slug: 'bleach', title: 'Bleach', poster: 'https://cdn.myanimelist.net/images/anime/3/40451.jpg', year: 2004 },
    { slug: 'dragon-ball-super', title: 'Dragon Ball Super', poster: 'https://cdn.myanimelist.net/images/anime/1607/117401.jpg', year: 2015 },
    { slug: 'hunter-x-hunter', title: 'Hunter x Hunter', poster: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg', year: 2011 },
    { slug: 'fairy-tail', title: 'Fairy Tail', poster: 'https://cdn.myanimelist.net/images/anime/5/18179.jpg', year: 2009 },
  ],
}

writeFileSync('./assets/mock/one-piece.json', JSON.stringify(data, null, 2))
console.log('✔ Written', data.episodes.length, 'episodes')
