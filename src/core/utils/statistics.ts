import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function calculateMostPlayedCharacter(player: STRIKR.API.PlayerObjectType): string {

  let mostPlayedCharacter: string | null = null
  let mostMatches = 0

  for (const stats of player.characterRatings) {
    if (stats.games > mostMatches) {
      mostPlayedCharacter = stats.character
      mostMatches = stats.games
    }
  }

  return mostPlayedCharacter || ''
}

export function calculateWinRate(player: STRIKR.API.PlayerObjectType): number {
  const totalMatches = player.matches.length
  const totalWins = player.ratings.reduce((sum, rating) => sum + rating.wins, 0)
  
  if (totalMatches === 0) {
    return 0
  }
  
  return (totalWins / totalMatches) * 100
}

export function calculateAverageRating(player: STRIKR.API.PlayerObjectType): number {
  const totalRatings = player.ratings.length
  const totalRatingSum = player.ratings.reduce((sum, rating) => sum + rating.rating, 0)
  
  if (totalRatings === 0) {
    return 0 // To avoid division by zero
  }
  
  return totalRatingSum / totalRatings
}

export function calculateTotalMatches(player:  STRIKR.API.PlayerObjectType): number {
  return player.matches.length
}

export function calculateTotalGoals(player: STRIKR.API.PlayerObjectType, gamemode: string): number {
  const scannedCharacters = new Set<string>()

  return player.characterRatings
    .filter(rating => {
      if (rating.gamemode === gamemode) {
        if (scannedCharacters.has(rating.character)) {
          return false
        }
        scannedCharacters.add(rating.character)
        return true
      }
    })
    .reduce((sum, rating) => sum + rating.scores, 0)
}

export function calculateTotalSaves(player: STRIKR.API.PlayerObjectType, gamemode: string): number {
  const scannedCharacters = new Set<string>()

  return player.characterRatings
    .filter(rating => {
      if (rating.gamemode === gamemode) {
        if (scannedCharacters.has(rating.character)) {
          return false
        }
        scannedCharacters.add(rating.character)
        return true
      }
    })
    .reduce((sum, rating) => sum + rating.saves, 0)
}

export function calculateTotalAssists(player: STRIKR.API.PlayerObjectType, gamemode: string): number {
  const scannedCharacters = new Set<string>()

  return player.characterRatings
    .filter(rating => {
      if (rating.gamemode === gamemode) {
        if (scannedCharacters.has(rating.character)) {
          return false
        }
        scannedCharacters.add(rating.character)
        return true
      }
    })
    .reduce((sum, rating) => sum + rating.assists, 0)
}

export function calculateTotalKnockouts(player: STRIKR.API.PlayerObjectType, gamemode: string): number {
  const scannedCharacters = new Set<string>()

  return player.characterRatings
    .filter(rating => {
      if (rating.gamemode === gamemode) {
        if (scannedCharacters.has(rating.character)) {
          return false
        }
        scannedCharacters.add(rating.character)
        return true
      }
    })
    .reduce((sum, rating) => sum + rating.knockouts, 0)
}

export function calculateAverageRatingPerDay(player: STRIKR.API.PlayerObjectType): number {
  const ratingsByDay: { [date: string]: number[] } = {}

  for (const rating of player.ratings) {
    const date = dayjs(rating.createdAt).format('YYYY-MM-DD') // Parse and format the date

    if (date) {
      if (!ratingsByDay[date]) {
        ratingsByDay[date] = []
      }

      ratingsByDay[date].push(rating.rating)
    }
  }

  let totalRating = 0
  let totalDays = 0

  for (const date in ratingsByDay) {
    const ratings = ratingsByDay[date]
    const sum = ratings.reduce((acc, val) => acc + val, 0)
    totalRating += sum
    totalDays++
  }

  if (totalDays === 0) {
    return 0 // To avoid division by zero
  }

  const averageRatingPerDay = totalRating / totalDays
  return averageRatingPerDay
}

export function getOldestRating(player: STRIKR.API.PlayerObjectType): STRIKR.API.PlayerRatingObjectType | undefined {
  let oldestRating: STRIKR.API.PlayerRatingObjectType | undefined = undefined
  let oldestDate: Date | undefined = undefined

  for (const rating of player.ratings) {
    const ratingDate = dayjs(rating.createdAt).toDate()

    if (!oldestDate || ratingDate < oldestDate) {
      oldestRating = rating
      oldestDate = ratingDate
    }
  }

  return oldestRating
}

export function calculateGoalieForwardPercentage(player: STRIKR.API.PlayerObjectType, gamemode: string): { goaliePercentage: number; forwardPercentage: number } | null {
  const latestDate = player.characterRatings.reduce((latest, rating) => {
    const ratingDate = dayjs.utc(rating.createdAt).toDate()

    if (rating.gamemode === gamemode && (!latest || ratingDate > latest)) {
      return ratingDate
    }
    return latest
  }, null as Date | null)

  if (!latestDate) {
    return null
  }

  let goalieCount = 0
  let forwardCount = 0

  for (const rating of player.characterRatings) {
    const ratingDate = dayjs.utc(rating.createdAt).toDate()

    if (rating.gamemode === gamemode && ratingDate.getTime() === latestDate.getTime()) {
      if (rating.role === 'Goalie') {
        goalieCount += rating.games
      } else if (rating.role === 'Forward') {
        forwardCount += rating.games
      }
    }
  }

  const totalGames = goalieCount + forwardCount
  const goaliePercentage = totalGames > 0 ? (goalieCount / totalGames) * 100 : 0
  const forwardPercentage = totalGames > 0 ? (forwardCount / totalGames) * 100 : 0

  return { goaliePercentage, forwardPercentage }
}