import { gql } from '@apollo/client'

export const getPlayer = gql`
query($id: String!) {
  getPlayer(id: $id) {
    characterMastery {
      timestamp
      characterMasteries {
        characterAssetName
        currentTier
        currentTierXp
        maxTier
        xpToNextTier
      }
    }
    characterRatings {
      createdAt
      character
      gamemode
      assists
      games
      mvp
      knockouts
      saves
      scores
      wins
      losses
      role
    }
  }
}
`