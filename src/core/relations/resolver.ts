import emoticons from '@/core/relations/emoticons'
import characters from '@/core/relations/characters'
import awakenings from './awakenings'

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

  export function getEloFromLP(lp: number) {
    const lookup = {
      800: 'Rookie',
      900: 'Mid Rookie',
      1000: 'High Rookie',
      1100: 'Bronze',
      1200: 'Mid Bronze',
      1300: 'High Bronze',
      1400: 'Silver',
      1500: 'Mid Silver',
      1600: 'High Silver',
      1700: 'Gold',
      1800: 'Mid Gold',
      1900: 'High Gold',
      2000: 'Platinum',
      2100: 'Mid Platinum',
      2200: 'High Platinum',
      2300: 'Diamond',
      2400: 'Mid Diamond',
      2500: 'High Diamond',
      2600: 'Challenger',
      2700: 'Mid Challenger',
      2800: 'High Challenger',
      2900: 'Omega',
      9000: 'Pro League',
    }
  
    let rank: Rank = 'Rookie'
    let nextRank: Rank | undefined = undefined
  
    for (const key in lookup) {
      const points = parseInt(key, 10)
  
      if (lp >= points) {
        rank = lookup[Number(key) as keyof typeof lookup] as Rank
      }
  
      if (lp < points && (!nextRank || points < parseInt(Object.keys(lookup).find((k) => lookup[Number(k) as keyof typeof lookup] === nextRank)!))) {
        nextRank = lookup[Number(key) as keyof typeof lookup] as Rank
      }
    }
  
    return {
      closestBottomLine: Object.keys(lookup).find(key => lookup[Number(key) as keyof typeof lookup] === rank),
      rank,
      nextRank,
    }
  }

export function getEloImage(rank: Rank) {
  const lookup = {
    'Rookie': '/i/rank/T_UI_RankedEmblem_Rookie_Low.png',
    'Mid Rookie': '/i/rank/T_UI_RankedEmblem_Rookie_Mid.png',
    'High Rookie': '/i/rank/T_UI_RankedEmblem_Rookie_High.png',
    'Bronze': '/i/rank/T_UI_RankedEmblem_Bronze_Low.png',
    'Mid Bronze': '/i/rank/T_UI_RankedEmblem_Bronze_Mid.png',
    'High Bronze': '/i/rank/T_UI_RankedEmblem_Bronze_High.png',
    'Silver': '/i/rank/T_UI_RankedEmblem_Silver_Low.png',
    'Mid Silver': '/i/rank/T_UI_RankedEmblem_Silver_Mid.png',
    'High Silver': '/i/rank/T_UI_RankedEmblem_Silver_High.png',
    'Gold': '/i/rank/T_UI_RankedEmblem_Gold_Low.png',
    'Mid Gold': '/i/rank/T_UI_RankedEmblem_Gold_Mid.png',
    'High Gold': '/i/rank/T_UI_RankedEmblem_Gold_High.png',
    'Platinum': '/i/rank/T_UI_RankedEmblem_Platinum_Low.png',
    'Mid Platinum': '/i/rank/T_UI_RankedEmblem_Platinum_Mid.png',
    'High Platinum': '/i/rank/T_UI_RankedEmblem_Platinum_High.png',
    'Diamond': '/i/rank/T_UI_RankedEmblem_Diamond_Low.png',
    'Mid Diamond': '/i/rank/T_UI_RankedEmblem_Diamond_Mid.png',
    'High Diamond': '/i/rank/T_UI_RankedEmblem_Diamond_High.png',
    'Challenger': '/i/rank/T_UI_RankedEmblem_Master_Low.png',
    'Mid Challenger': '/i/rank/T_UI_RankedEmblem_Master_Mid.png',
    'High Challenger': '/i/rank/T_UI_RankedEmblem_Master_High.png',
    'Omega': '/i/rank/T_UI_RankedEmblem_Promethean.png',
    'Pro League': '/i/rank/T_UI_RankedEmblem_Promethean.png'
  }

  return lookup[rank as keyof typeof lookup] || '/i/rank/T_UI_RankedEmblem_Rookie_Low.png'
}


export function getEloColor(rank: Rank) {
  const lookup = {
    'Rookie': '#ECDCD0',
    'Mid Rookie': '#ECDCD0',
    'High Rookie': '#ECDCD0',
    'Bronze': '#C88C59',
    'Mid Bronze': '#C88C59',
    'High Bronze': '#C88C59',
    'Silver': '#9F9F9F',
    'Mid Silver': '#9F9F9F',
    'High Silver': '#9F9F9F',
    'Gold': '#F1E385',
    'Mid Gold': '#F1E385',
    'High Gold': '#F1E385',
    'Platinum': '#2DE0A5',
    'Mid Platinum': '#2DE0A5',
    'High Platinum': '#2DE0A5',
    'Diamond': '#51B4FD',
    'Mid Diamond': '#51B4FD',
    'High Diamond': '#51B4FD',
    'Omega': '#E1137A',
    'Master': '#9952EE',
    'Challenger': '#9952EE',
    'Mid Challenger': '#9952EE',
    'High Challenger': '#9952EE',
    'Pro League': '#FF6262'
  }

  return lookup[rank as keyof typeof lookup] || '#000000'
}

export function getEmoticonFromdata(emoticon_data: string) {
  return emoticons.find( emoticon => emoticon.id === emoticon_data) || { id: 'EmoticonData_DefaultThumbsUp', image: '/i/emoticon/EmoticonData_DefaultThumbsUp.png' }
}

export function getAwakeningLocale(id: string, locale = 'en') {
  return awakenings.find(awakening => {
    // const name = awakening.name[locale as 'en']
    return awakening.id === id
  })?.name[locale as 'en'] || id
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