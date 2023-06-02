import { gql } from '@apollo/client'

export const ensurePlayer = gql`
query($pilotname: String!, $refresh: Boolean) {
  ensurePlayer(name: $pilotname, refresh: $refresh) {
    id
    username
    emoticonId
    titleId
    ratings {
      wins
      losses
      rank
      rating
      games
      masteryLevel
      createdAt
    }
    tags
    characterRatings {
      character
      assists
      knockouts
      wins
      losses
      mvp
      role
      saves
      scores
      gamemode
      games
      createdAt
    }
    mastery {
      currentLevel
      currentLevelXp
      totalXp
      xpToNextLevel
    }
    characterMastery {
      timestamp
      characterMasteries {
        currentTier
        currentTierXp
        xpToNextTier
        maxTier
        idxHighestTierCollected
      }
    }
    region
    createdAt
    updatedAt
  }
}
`