import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export interface PlaystyleAttributes {
  assists: number;
  scores: number;
  mvp: number;
  knockouts: number;
}

export function calculateGeometricMean(attributes: number[]): number {
  const totalAttributes = attributes.length
  let product = 1

  for (const attribute of attributes) {
    product *= attribute
  }

  const geometricMean = Math.pow(product, 1 / totalAttributes)
  return geometricMean
}

export function normalizePlaystyleAttributes(attributes: PlaystyleAttributes): PlaystyleAttributes {
  const { assists, scores, mvp, knockouts } = attributes
  const geometricMean = calculateGeometricMean([assists, scores, mvp, knockouts])

  const normalizedAssists = assists / geometricMean
  const normalizedScores = scores / geometricMean
  const normalizedMvps = mvp / geometricMean
  const normalizedKnockouts = knockouts / geometricMean

  return {
    assists: normalizedAssists,
    scores: normalizedScores,
    mvp: normalizedMvps,
    knockouts: normalizedKnockouts,
  }
}

export function calculatePilotProperty(
  ratings?: STRIKR.API.PlayerCharacterRatingObjectType[], 
  gameMode?: string, 
  property?: 'scores'| 'assists' | 'saves' | 'wins' | 'losses' | 'mvp' | 'games' | 'knockouts',
  role?: 'Forward' | 'Goalie'
  ): number {
  const characterRelation: string[] = []
  if (!ratings || !gameMode || !property) {
    return 0
  }
  const gamemodeRatings = ratings.filter(rating => ( rating.gamemode === gameMode && (role ? rating.role === role : true) ) )

  let total = 0
  // We could map the ratings to an array and use reduce, but this is more readable
  // Apparently this is faster too: https://jsperf.com/map-reduce-vs-foreach // https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/
  gamemodeRatings.forEach((rating) => {
    if (characterRelation.includes(`${rating.character}.${rating.role}`)) {
      return
    }

    total += rating[property]
    characterRelation.push(`${rating.character}.${rating.role}`)
  })

  return total
}

export function getLatestCharacterMasterySamples(samples: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode?: string): Map<string, STRIKR.API.PlayerCharacterRatingObjectType> {
  const calcuatedCharacters = new Map<string, STRIKR.API.PlayerCharacterRatingObjectType>()

  const sortedSamples = samples
  .sort( 
    (a, b) => dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? -1 : 0
  )
  .filter(
    (sample) => gamemode ? sample.gamemode === gamemode : true
  )

  for (const sample of sortedSamples) {
    if (calcuatedCharacters.has(`${sample.character}@${sample.role}`)) {
      continue
    }

    calcuatedCharacters.set(`${sample.character}@${sample.role}`, sample)
  }
 
  return calcuatedCharacters
}


export function calculatePresence(
  role: 'Goalie' | 'Forward',
  knockouts: number,
  assists: number,
  scores: number,
  saves: number,
  wins: number,
  losses: number
): number  {
  let totalMatches = wins + losses;

  // Calculate the total score
  let totalScore = knockouts + assists + scores + saves;

  // Calculate the weighted score based on role
  let weightedScore: number;
  if (role === 'Goalie') {
    weightedScore = (assists + saves) / totalScore;
  } else if (role === 'Forward') {
    weightedScore = (scores + knockouts) / totalScore;
  } else {
    return 0
  }
  
  // Calculate the winning chance percentage
  let winningChance = (wins / totalMatches) * weightedScore * 100;

  // Cap the winning chance at 100%
  let cappedWinningChance = Math.min(winningChance, 100);

  return cappedWinningChance;
}
