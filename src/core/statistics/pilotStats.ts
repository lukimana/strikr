import dayjs from 'dayjs'

import { getLatestCharacterMasterySamples } from './math'
import { defaultStrikerRating } from './strikerStats'

export const defaultPilotRating = {
  createdAt: dayjs().toISOString(),
  games: 0,
  id: 0,
  losses: 0,
  masteryLevel: 0,
  playerId: 0,
  rank: 0,
  rating: 0,
  wins: 0
}

export const defaultPilot = {
  characterMastery: {
    characterMateries: [defaultStrikerRating],
    playerId: '-',
    createdAt: dayjs()
  },
  characterRatings: [defaultStrikerRating],
  createdAt: dayjs(),
  emoticonId: '-',
  id: '-',
  logoId: '-',
  mastery: undefined,
  matches: [],
  nameplateId: '-',
  ratings: [],
  region: 'Global',
  tags: [],
  titleId: '-',
  updatedAt: dayjs(),
  userId: 1,
  username: '-'
}

export function calculatePilotProperty(
  ratings?: STRIKR.API.PlayerCharacterRatingObjectType[], 
  gameMode?: string, 
  property?: 'scores'| 'assists' | 'saves' | 'wins' | 'losses' | 'mvp' | 'games' | 'knockouts',
  role?: 'Forward' | 'Goalie'
  ): number {
  if (!ratings || !gameMode || !property) {
    return 0
  }
  const gamemodeRatings = ratings.filter(rating => ( rating.gamemode === gameMode && (role ? rating.role === role : true) ) )
  const latestRatings = getLatestCharacterMasterySamples(gamemodeRatings)
  let total = 0

  // We could map the ratings to an array and use reduce, but this is more readable
  // Apparently this is faster too: https://jsperf.com/map-reduce-vs-foreach // https://leanylabs.com/blog/js-forEach-map-reduce-vs-for-for_of/
  latestRatings.forEach((rating, characterId) => {
    total += rating[property]
  })

  return total
}

export const calculatePilotAverageGamesPerDay = (pilot: STRIKR.API.PlayerObjectType): number =>  {
  // Sort the array based on createdAt
  pilot.characterRatings.sort((a, b) => dayjs(a.createdAt!).valueOf() - dayjs(b.createdAt!).valueOf())

  let totalWeightedGamesDifference = 0
  let totalTimeDifferenceInDays = 0

  for (let i = 1; i < pilot.characterRatings.length; i++) {
    const prevSnapshot = pilot.characterRatings[i - 1]
    const currentSnapshot = pilot.characterRatings[i]

    const gamesDifference = currentSnapshot.games - prevSnapshot.games
    const timeDifferenceInDays = dayjs(currentSnapshot.createdAt!).diff(dayjs(prevSnapshot.createdAt!), 'day', true)

    totalWeightedGamesDifference += gamesDifference * timeDifferenceInDays
    totalTimeDifferenceInDays += timeDifferenceInDays
  }

  return totalTimeDifferenceInDays > 0 ? totalWeightedGamesDifference / totalTimeDifferenceInDays : 0
}

export const calculatePilotRatingGainPerDay = (pilot: STRIKR.API.PlayerObjectType): number => {
  pilot.ratings.sort((a, b) => dayjs(a.createdAt!).valueOf() - dayjs(b.createdAt!).valueOf())

  let totalWeightedRatingDifference = 0
  let totalTimeDifferenceInDays = 0

  for (let i = 1; i < pilot.ratings.length; i++) {
    const prevSnapshot = pilot.ratings[i - 1]
    const currentSnapshot = pilot.ratings[i]

    const ratingDifference = currentSnapshot.rating - prevSnapshot.rating
    const timeDifferenceInDays = dayjs(currentSnapshot.createdAt!).diff(dayjs(prevSnapshot.createdAt!), 'day', true)
    totalWeightedRatingDifference += ratingDifference * timeDifferenceInDays
    totalTimeDifferenceInDays += timeDifferenceInDays
  }

  return totalTimeDifferenceInDays > 0 ? totalWeightedRatingDifference / totalTimeDifferenceInDays : 0
}
