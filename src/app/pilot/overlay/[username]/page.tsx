import PilotCard from '@/components/molecules/PilotCard'
import RankCard from '@/components/molecules/RankCard'
import { getClient } from '@/core/apolloclient'
import { gql } from '@apollo/client'
import { calculatePilotProperty, getLatestCharacterMasterySamples, normalizePlaystyleAttributes } from '@/core/mathUtils'
import { getRankFromLP, getcharacterFromDevName } from '@/core/relations/resolver'
import dayjs from 'dayjs'

export const dynamic = 'force-dynamic',
  revalidate = 0

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Page({
  params: { username },
  searchParams: { showProfile = 'false', showCredit = 'true' },
}: {
  params: { username: string }
  searchParams: { showProfile: 'false' | 'true', showCredit: 'false' | 'true' }
}) {
  // await sleep(10000)
  const { data } = await getClient().query<{
    ensurePlayer: STRIKR.API.PlayerObjectType
  }>({
    query: gql`
      query ($pilotname: String!, $refresh: Boolean) {
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
          characterRatings {
            assists
            character
            createdAt
            gamemode
            games
            knockouts
            losses
            id
            mvp
            role
            saves
            scores
            wins
          }
          region
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      pilotname: username,
      refresh: true
    },
    fetchPolicy: 'no-cache'
  })
  const pilotData = data.ensurePlayer
  
  const pilotRatingsByNewest = [...pilotData.ratings].sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )
  const characterRatingsByNewest = [...pilotData.characterRatings].sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )

  const gamesAsForward = calculatePilotProperty(pilotData.characterRatings, 'RankedInitial', 'games', 'Forward')
  const gamesAsGoalie = calculatePilotProperty(pilotData.characterRatings, 'RankedInitial', 'games', 'Goalie')

  const mainCharacter = Array.from(characterRatingsByNewest.values()).filter( r => r.gamemode === 'RankedInitial').sort( (a, b) => b.games - a.games)[0].character
  const forwardRatio = gamesAsForward / (gamesAsForward + gamesAsGoalie) * 100
  const gamemodeScores = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'scores')
  const gamemodeAssists = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'assists')
  const gamemodeKnockouts = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'knockouts')
  const rankedWins = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'wins')
  const rankedLosses = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'losses')
  const gamemodeGames = calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'games')
  const pilotBadges: {
    name: string
  }[] = []
  
  pilotBadges.push({
    name: `${getcharacterFromDevName(mainCharacter)?.name || 'Omega Strikers'} Enjoyer`
  })

  pilotBadges.push({
    name: forwardRatio > 59.9 ? '🦐 Forward' : forwardRatio < 40.1 ? '🥅 Goalie' : '💫 Flex'
  })


  if (gamemodeScores / gamemodeGames >= 3) {
    pilotBadges.push({
      name: '🎯 Scorer',
    })
  }

  if (gamemodeKnockouts / gamemodeGames >= 4) {
    pilotBadges.push({
      name: '🥊 Brawller',
    })
  }

  if (gamemodeAssists / gamemodeGames >= 3) {
    pilotBadges.push({
      name:  '🤝 Pass King',
    })
  }


  return <main className='flex flex-col w-full h-full'>
    <div className='flex flex-col gap-2 w-full'>
      {showProfile !== 'false' && (
        <PilotCard
          emoticon={pilotData.emoticonId || 'default'}
          title={pilotData.titleId || 'default'}
          username={username}
          badges={pilotBadges}
          currentMasteryXp={pilotData.mastery.currentLevelXp}
          masteryLevel={pilotData.mastery.currentLevel}
          nextMasteryXp={pilotData.mastery.xpToNextLevel}
          tags={{
            verified: pilotData.tags.includes('verified'),
            staff: pilotData.tags.includes('STAFF'),
          }}
        />
      )}
      <RankCard
        losses={rankedLosses}
        rank={pilotRatingsByNewest[0].rank}
        rating={pilotRatingsByNewest[0].rating}
        region={pilotData.region}
        wins={rankedWins}
        key={pilotRatingsByNewest[0].id}
      />
      {showCredit !== 'false' && (
        <span className='text-subtle text-sm ml-auto drop-shadow-lg shadow-black'>Powered by <b className='font-semibold'>strikr.pro</b> (/pilot/overlay/{decodeURI(username)})</span>
      )}
    </div>
  </main>
}
