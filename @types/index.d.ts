namespace STRIKR {
  namespace API {
    interface PlayerMasteryObjectType {
      timestamp: string
      playerId: string
      currentLevel: number
      currentLevelXp: number
      xpToNextLevel: number
      totalXp: number
    }

    interface PlayerCharacterMasteryItemObjectType {
      characterAssetName: string
      totalXp: number
      maxTier: number
      idxHighestTierCollected: number
      currentTier: number
      currentTierXp: number
      xpToNextTier: number
    }

    interface PlayerCharacterMasteryObjectType {
      timestamp: string
      playerId: string
      characterMasteries: PlayerCharacterMasteryItemObjectType[]
    }

    interface  PlayerObjectType {
      id: string
      userId?: number
      username: string
      user: UserObjectType
      ratings: PlayerRatingObjectType[]
      characterRatings: PlayerCharacterRatingObjectType[]
      matches: MatchOnPlayerObjectType[]
      logoId?: string
      nameplateId?: string
      emoticonId?: string
      titleId?: string
      createdAt?: string
      upstringdAt?: string
      region: string
      mastery: PlayerMasteryObjectType
      tags: string[]
      characterMastery: PlayerCharacterMasteryObjectType
    }

    interface PlayerRatingObjectType {
      id: number
      playerId: string
      rating: number
      masteryLevel: number
      games: number
      rank: number
      wins: number
      losses: number
      createdAt?: string
    }

    interface PilotAutocompleteObjectType {
      username: string
      emoticonId: string
      region: string
      tags: string[]
    }

    interface MatchOnPlayerObjectType {
      id: number
      playerId: string
      matchId: string
      createdAt?: string
      match: MatchObjectType
    }

    interface PlayerCharacterRatingObjectType {
      id: number
      playerId: string
      player: PlayerObjectType
      character: string
      role: 'Forward' | 'Goalie'
      games: number
      assists: number
      knockouts: number
      losses: number
      mvp: number
      saves: number
      scores: number
      wins: number
      gamemode: string
      createdAt: string
    }
  }
}