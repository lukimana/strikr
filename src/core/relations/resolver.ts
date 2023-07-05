import emoticons from '@/core/relations/objects/emoticons'
import characters from '@/core/relations/objects/characters'
import awakenings from '@/core/relations/objects/awakenings'
import ranks from '@/core/relations/objects/ranks'

export function getcharacterFromDevName(cd_characterId: string) {
  return characters.find( character => character.id === cd_characterId) || {
    assetName: 'default',
    portrait: '/i/character/default.png',
    id: 'default',
    model: '/i/model/default/default.fbx',
    name: 'Unknown',
    skills: [],
    skins: []
  }
}

export type Rank = 
  | 'Rookie' 
  | 'Bronze' 
  | 'Mid Bronze' 
  | 'High Bronze' 
  | 'Silver' 
  | 'Mid Silver' 
  | 'High Silver' 
  | 'Gold' 
  | 'Mid Gold' 
  | 'High Gold' 
  | 'Platinum' 
  | 'Mid Platinum' 
  | 'High Platinum' 
  | 'Diamond' 
  | 'Mid Diamond' 
  | 'High Diamond' 
  | 'Challenger'
  | 'Mid Challenger'
  | 'High Challenger'
  | 'Omega'
  | 'Pro League'

  export type RankObject = { 
    name: Rank
    image: string
    color: string
    threshold: number
  }

export function getRankFromLP(lp: number) {
  
  let rankIndex = 0
  
  for (let i = 1; i < ranks.length; i++) {
    if (lp >= ranks[i].threshold) {
      rankIndex = i
    } else {
      break // break the loop when the threshold is higher than the input value
    }
  }

  const rankObject = ranks[rankIndex] as RankObject
  const prevRankObject = rankIndex > 0 ? ranks[rankIndex - 1] as RankObject : null
  const nextRankObject = rankIndex < ranks.length - 1 ? ranks[rankIndex + 1] as RankObject : null

  return { rankObject, prevRankObject, nextRankObject }
}

export function getEmoticonFromdata(emoticon_data: string) {
  return emoticons.find( emoticon => emoticon.id === emoticon_data) || { id: 'EmoticonData_DefaultThumbsUp', image: '/i/emoticon/EmoticonData_DefaultThumbsUp.png' }
}

export function getAwakeningFromdata(awakening_data: string) {
  return awakenings.find( awakening => awakening.id === awakening_data)
}

export function getRegionLocale(id: string) {
  const regions = {
    'SouthAmerica': {
      en: 'South America',
      pt: 'América do Sul'
    },
    'NorthAmerica': {
      en: 'North America',
      pt: 'América do Norte'
    },
    'Europe': {
      en: 'Europe',
      pt: 'Europa'
    },
    'Asia': {
      en: 'Asia',
      pt: 'Ásia'
    },
    'Oceania': {
      en: 'Oceania',
      pt: 'Oceania'
    },
    'Global': {
      en: 'Global',
      pt: 'Global'
    },
  }

  return regions[id as keyof typeof regions] || id
}