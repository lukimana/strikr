import dayjs from 'dayjs'
import { calculatePilotProperty } from './pilotStats'


export type StatType = 'scores' | 'saves' | 'knockouts' | 'mvp' | 'assists' | 'games' | 'wins'

export type PositionType = 'Goalie' | 'Forward'

export const defaultStrikerRating = {
  assists: 0,
  character: '-',
  createdAt: '-',
  gamemode: '-',
  games: 0,
  id: 0,
  knockouts: 0,
  losses: 0,
  mvp: 0,
  player: {
    
  },
  playerId: '-',
  role: '-',
  saves: 0,
  scores: 0,
  wins: 0,
}

const calculateStrikerWinrate = (characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode: string): number | null => {
  const latestRating = characterRatings
    .filter((rating) => rating.gamemode === gamemode)
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))[0]
  
  if (!latestRating) return null

  const totalGames = latestRating.games
  const wins = latestRating.wins

  return totalGames !== 0 ? (wins / totalGames) * 100 : 0
}

const calculateStrikerForwardGoalieRatio = (characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode: string) => {
  const latestRating = characterRatings
    .filter((rating) => rating.gamemode === gamemode)
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))[0]
  
  if (!latestRating) return null

  const goalieMatches = latestRating.games - latestRating.mvp
  const forwardMatches = latestRating.mvp

  return {
    goalieMatches,
    forwardMatches,
    ratio: forwardMatches !== 0 ? goalieMatches / forwardMatches : 0,
  }
}

export const calculateStrikeDescriptivePlaystyle = (characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode: string): string | null => {

  const scores = calculatePilotProperty(characterRatings, gamemode, 'scores') || 0
  const assists = calculatePilotProperty(characterRatings, gamemode, 'assists') || 0
  const knockouts = calculatePilotProperty(characterRatings, gamemode, 'knockouts') || 0
  const totalActions = scores + assists + knockouts  

  if (totalActions === 0) {
    return 'Unknown'
  }

  const assistRatio = assists / totalActions
  const knockoutRatio = knockouts / totalActions
  const scoreRatio = scores / totalActions

  if (assistRatio > 0.5) {
    return 'Assistive/Midfield Playstyle'
  } else if (knockoutRatio > 0.5) {
    return 'Aggressive Playstyle'
  } else if (scores > 0 && assistRatio >= 0.25 && assistRatio <= 0.5) {
    return 'Score sniper.'
  } else if (scores > 0 && knockouts > 0 && scoreRatio >= 0.25 && knockoutRatio >= 0.25 ) {
    return 'Agressive\n• Tends to score while knocking out opponents.\n• Be careful with map borders.\n• Play slightly advanced as goalie to avoid being shut down'
  } else {
    return 'Mixed Playstyle'
  }
}

const calculateStrikerGeometricStats = (characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[], gamemode: string): { goals: number, assists: number, knockouts: number } => {
  const latestRating = characterRatings
    .filter((rating) => rating.gamemode === gamemode)
    .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))[0]

  if (!latestRating) return { goals: 0, assists: 0, knockouts: 0 }

  const goals = latestRating.scores || 0
  const assists = latestRating.assists || 0
  const knockouts = latestRating.knockouts || 0

  // Calculate geometric mean
  const geometricMean = Math.pow(goals * assists * knockouts, 1 / 3)

  const stats = {
    goals: Math.round(geometricMean),
    assists: Math.round(geometricMean),
    knockouts: Math.round(geometricMean)
  }

  return stats
}


function getStatByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  stat: StatType,
  position: PositionType
): number {
  const filteredRatings = ratings.filter(
    (rating) => rating.gamemode === gamemode && rating.character === character
  )

  if (filteredRatings.length === 0) {
    return 0
  }

  const totalStat = filteredRatings.reduce((acc, rating) => {
    if (position === 'Goalie' && rating.role === 'Goalie') {
      return acc + rating[stat]
    } else if (position === 'Forward' && rating.role !== 'Goalie') {
      return acc + rating[stat]
    } else {
      return acc
    }
  }, 0)

  return totalStat
}

function getScoresByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'scores', position)
}

function getSavesByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'saves', position)
}

function getKnockoutsByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'knockouts', position)
}

function getMVPByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'mvp', position)
}

function getAssistsByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'assists', position)
}

function getGamesByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'games', position)
}

function getWinsByGamemodeAndCharacter(
  ratings: STRIKR.API.PlayerCharacterRatingObjectType[],
  gamemode: string,
  character: string,
  position: PositionType
): number {
  return getStatByGamemodeAndCharacter(ratings, gamemode, character, 'wins', position)
}