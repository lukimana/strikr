import { RankIcon } from '@/components/atoms/Rank'
import RatingChart from '@/components/atoms/RatingChart'
import PilotCard from '@/components/molecules/PilotCard'
import RankCard from '@/components/molecules/RankCard'
import ContentBlock from '@/components/templates/ContentBlock'
import { getClient } from '@/core/apolloclient'
import { gql } from '@apollo/client'
import { ChartDonut, Graph, Person, Warning } from '@/atoms/PhosphorIcon'
import RatioChart from '@/components/atoms/RatioChart'
import PlaystyleChart from '@/components/atoms/PlaystyleChart'
import PilotStatBar from '@/components/molecules/PilotStatBar'
import { getRankFromLP, getcharacterFromDevName } from '@/core/relations/resolver'
import dayjs from 'dayjs'
import CharacterBoard from '@/components/molecules/CharacterBoard'

export const dynamic = 'force-dynamic',
  revalidate = 0

export interface StrikrParsedPilotData {
  playerId: string
  tags: string[]
  title?: string
  emoticonId?: string
  level?: number
  currentXp?: number
  nextXp?: number
  ratings: {
    rating: number
    date: string
    ratingName: string
    ratingColor: string
    ratingImage: string
    rank: number
    wins: number
    losses: number
  }[]
  characterRatings: {
    character: string
    games: number
    wins: number
    losses: number
    winrate: number
    scores: number
    assists: number
    saves: number
    knockouts: number
    mvp: number
    createdAt: string
    role: 'forward' | 'goalie'
    gamemode: string
  }[]
  rankedData: {
    wins: number
    losses: number
  }
  gamemodeRatings: {
    forward: {
      games: number
      wins: number
      losses: number
      winrate: number
      scores: number
      assists: number
      saves: number
      knockouts: number
      mvp: number
    }
    goalie: {
      games: number
      wins: number
      losses: number
      winrate: number
      scores: number
      assists: number
      saves: number
      knockouts: number
      mvp: number
    }
    gamemode: string
  }
  mostPlayedCharacters: {
    character: string
    wins: number
    losses: number
  }[] 
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export default async function Page({
  params: { username },
  searchParams: { gamemode = 'RankedInitial' },
}: {
  params: { username: string }
  searchParams: { gamemode: string }
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
          characterMastery {
            characterMasteries {
              characterAssetName
              currentTier
              currentTierXp
              totalXp
              xpToNextTier
            }
          }
          mastery {
            currentLevel
            currentLevelXp
            totalXp
            xpToNextLevel
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
  pilotData.ratings.sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )
  pilotData.characterRatings.sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )

  const parsedPilotInformation: StrikrParsedPilotData = {
    playerId: pilotData?.id || '???????',
    tags: pilotData?.tags || [],
    title: pilotData.titleId || 'default',
    emoticonId: pilotData.emoticonId || 'default',
    level: pilotData.mastery.currentLevel,
    currentXp: pilotData.mastery.currentLevelXp,
    nextXp: pilotData.mastery.xpToNextLevel,
    ratings: pilotData.ratings.map( rating => {
      const rank = getRankFromLP(rating.rating)
  
      return {
        rating: rating.rating,
        date: rating.createdAt,
        wins: rating.wins,
        losses: rating.losses,
        ratingName: rank.rankObject.name,
        ratingColor: rank.rankObject.color,
        ratingImage: rank.rankObject.image,
        rank: rating.rank
      }
    }),
    characterRatings: [
      { 
        assists: 0,
        character: 'TD_DefaultStriker',
        createdAt: new Date().toISOString(),
        gamemode: gamemode,
        games: 0,
        knockouts: 0,
        losses: 0,
        mvp: 0,
        role: 'forward',
        saves: 0,
        scores: 0,
        winrate: 0,
        wins: 0
      }
    ],
    rankedData: {
      wins: 0,
      losses: 0
    },
    gamemodeRatings: {
      forward: {
        assists: 0,
        knockouts: 0,
        saves: 0,
        scores: 0,
        mvp: 0,
        games: 0,
        wins: 0,
        losses: 0,
        winrate: 0, 
      },
      goalie: {
        assists: 0,
        knockouts: 0,
        saves: 0,
        scores: 0,
        mvp: 0,
        games: 0,
        wins: 0,
        losses: 0,
        winrate: 0,
      },
      gamemode: gamemode,
    },
    mostPlayedCharacters: [],
  }


    pilotData.characterRatings.forEach( rating => {

      // If we already processed this character rating on this gamemode & role, skip it
      if (
        parsedPilotInformation.characterRatings.find( 
          cr => cr.character === rating.character && cr.role === rating.role.toLowerCase()
        )
      ) { 
        return 
      }
      
      // Gamemode is ranked, save wins and losses for later
      if (rating.gamemode === 'RankedInitial') {
        parsedPilotInformation.rankedData.wins += rating.wins
        parsedPilotInformation.rankedData.losses += rating.losses
      }

      // If the rating is not from the selected gamemode, skip it. We already have ranked information
      if (rating.gamemode !== gamemode) { return }
      
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].games += rating.games
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].wins += rating.wins
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].losses += rating.losses
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].scores += rating.scores
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].assists += rating.assists
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].saves += rating.saves
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].knockouts += rating.knockouts
      parsedPilotInformation.gamemodeRatings[rating.role === 'Forward' ? 'forward' : 'goalie'].mvp += rating.mvp


      parsedPilotInformation.characterRatings.push({
        character: rating.character,
        assists: rating.assists,
        knockouts: rating.knockouts,
        wins: rating.wins,
        losses: rating.losses,
        mvp: rating.mvp,
        saves: rating.saves,
        scores: rating.scores,
        games: rating.games,
        winrate: rating.wins / rating.games * 100,
        createdAt: rating.createdAt,
        role: rating.role === 'Forward' ? 'forward' : 'goalie',
        gamemode: rating.gamemode
      })

      const characterLine = parsedPilotInformation.mostPlayedCharacters.find( mpc => mpc.character === rating.character )
      if (characterLine) {
        characterLine.wins += rating.wins
        characterLine.losses += rating.losses
      } else {
        parsedPilotInformation.mostPlayedCharacters.push({
          character: rating.character,
          wins: rating.wins,
          losses: rating.losses
        })
      }
    })


  parsedPilotInformation.mostPlayedCharacters.sort( (a, b) => a.wins + a.losses > b.wins + b.losses ? -1 : 1 )
  const gamesAsForward = parsedPilotInformation.gamemodeRatings.forward.games || 0
  const gamesAsGoalie = parsedPilotInformation.gamemodeRatings.goalie.games || 0
  const forwardRatio = gamesAsForward / (gamesAsForward + gamesAsGoalie) * 100

  // CUSTOM PILOT BADGES PARSING / ADDING
  const pilotBadges: {
    name: string
  }[] = []
  
  pilotBadges.push({
    name: `${getcharacterFromDevName(parsedPilotInformation.mostPlayedCharacters?.[0]?.character)?.name || 'Omega Strikers'} Enjoyer`
  })

  pilotBadges.push({
    name: forwardRatio > 59.9 ? '🦐 Forward' : forwardRatio < 40.1 ? '🥅 Goalie' : '💫 Flex'
  })

  // FORWARD ROLES
  if (parsedPilotInformation.gamemodeRatings.forward.games > 100) {
    if (parsedPilotInformation.gamemodeRatings.forward.scores / parsedPilotInformation.gamemodeRatings.forward.games >= 3) {
      pilotBadges.push({
        name: '🎯 Scorer',
      })
    }
    if (parsedPilotInformation.gamemodeRatings.forward.knockouts / parsedPilotInformation.gamemodeRatings.forward.games >= 4) {
      pilotBadges.push({
        name: '🥊 Brawller',
      })
    }
    if (parsedPilotInformation.gamemodeRatings.forward.assists / parsedPilotInformation.gamemodeRatings.forward.games >= 3) {
      pilotBadges.push({
        name:  '🤝 Pass King',
      })
    }
  }
  
  // GOALIE ROLES
  if (parsedPilotInformation.gamemodeRatings.goalie.games > 100) {
    if (parsedPilotInformation.gamemodeRatings.goalie.saves / parsedPilotInformation.gamemodeRatings.goalie.games >= 45) {
      pilotBadges.push({
        name: '🧤 Keeper',
      })
    }
  }


  return <main className='flex flex-col xl:flex-row min-h-screen w-full h-full gap-8 p-4'>
    <div 
      className='absolute inset-0 h-[40vh] bg-no-repeat z-[-1] pointer-events-none'
      style={{
        background: `radial-gradient(at top center, ${parsedPilotInformation.ratings[0].ratingColor + '33'} 0%, rgba(6, 0, 12, 0.0) 50%)`
      }}
    />
    <aside className='flex flex-col gap-4 w-full xl:w-1/3'>
      <PilotCard
        emoticon={parsedPilotInformation.emoticonId || 'default'}
        title={parsedPilotInformation.title || 'default'}
        username={username}
        badges={pilotBadges}
        currentMasteryXp={parsedPilotInformation.currentXp}
        masteryLevel={parsedPilotInformation.level}
        nextMasteryXp={parsedPilotInformation.nextXp}
        tags={{
          verified: pilotData.tags.includes('verified'),
          staff: pilotData.tags.includes('STAFF'),
        }}
        key={`profile.card.${parsedPilotInformation.playerId}`}
      />
      <div className='bg-secondary rounded-lg p-2 text-subtle text-xs flex items-center gap-2'>
        <Warning className='w-4 h-4' weight='duotone' /> 
        <p>Due to how data is provided we are limited to showing ranked stats only for the top 10k players of each region.</p>
      </div>
      <RankCard
        rating={parsedPilotInformation.ratings[0].rating}
        rank={parsedPilotInformation.ratings[0].rank}
        region={pilotData.region}
        wins={parsedPilotInformation.rankedData.wins}
        losses={parsedPilotInformation.rankedData.losses}
        key={`profile.rankcard.${parsedPilotInformation.playerId}`}
      />
      <ContentBlock
        title='Rating History'
        subtitle='Based in Ranked games'
        Icon={<RankIcon className='!w-6 !h-6' />}
      >
        {null}
        <RatingChart
          data={pilotData.ratings.map((rating) => ({ date: rating.createdAt, rating: rating.rating }))}
        />
      </ContentBlock>
      <ContentBlock
        title='Role Ratio'
        subtitle='Based on currently selected gamemode'
        Icon={<ChartDonut className='text-subtle' size={24} weight='fill' />}
      >
        {null}
        <RatioChart
          data={[
            {
              color: '#F66618',
              label: 'Forward',
              percentile: forwardRatio || 0
            },
            {
              color: '#F69E18',
              label: 'Goalie',
              percentile: 100 - forwardRatio || 0
            }
          ]}
        />
      </ContentBlock>
      <ContentBlock
        title='Playstyle'
        subtitle='Geometric average for current gamemoede'
        Icon={<Graph size={24} className='text-subtle' weight='fill' />}
      >
        {null}
        <PlaystyleChart
          forward={{
            assists: parsedPilotInformation.gamemodeRatings.forward.assists,
            knockouts: parsedPilotInformation.gamemodeRatings.forward.knockouts,
            saves: parsedPilotInformation.gamemodeRatings.forward.saves,
            scores: parsedPilotInformation.gamemodeRatings.forward.scores,
            mvp: parsedPilotInformation.gamemodeRatings.forward.mvp,
          }}
          goalie={{
            assists: parsedPilotInformation.gamemodeRatings.goalie.assists,
            knockouts: parsedPilotInformation.gamemodeRatings.goalie.knockouts,
            saves: parsedPilotInformation.gamemodeRatings.goalie.saves,
            scores: parsedPilotInformation.gamemodeRatings.goalie.scores,
            mvp: parsedPilotInformation.gamemodeRatings.goalie.mvp,
          }}
        />
      </ContentBlock>
    </aside>
    <div className='w-full flex flex-col xl:w-2/3 gap-4'>
      <PilotStatBar
        assists={parsedPilotInformation.gamemodeRatings.forward.assists + parsedPilotInformation.gamemodeRatings.goalie.assists}
        knockouts={parsedPilotInformation.gamemodeRatings.forward.knockouts + parsedPilotInformation.gamemodeRatings.goalie.knockouts}
        saves={parsedPilotInformation.gamemodeRatings.forward.saves + parsedPilotInformation.gamemodeRatings.goalie.saves}
        scores={parsedPilotInformation.gamemodeRatings.forward.scores + parsedPilotInformation.gamemodeRatings.goalie.scores}
        mvp={parsedPilotInformation.gamemodeRatings.forward.mvp + parsedPilotInformation.gamemodeRatings.goalie.mvp}
        games={parsedPilotInformation.gamemodeRatings.forward.games + parsedPilotInformation.gamemodeRatings.goalie.games}
        gamemode={gamemode}
        losses={parsedPilotInformation.gamemodeRatings.forward.losses + parsedPilotInformation.gamemodeRatings.goalie.losses}
        wins={parsedPilotInformation.gamemodeRatings.forward.wins + parsedPilotInformation.gamemodeRatings.goalie.wins}
      />
      <ContentBlock
        title='Character Stats'
        subtitle='Based on currently selected gamemode, ordered by most played for each role [CLICK FOR DETAILS]'
        Icon={<Person weight='fill' size={24} className='text-subtle' />}
      >
        {null}
        <CharacterBoard
          latestCharacterRatings={parsedPilotInformation.characterRatings}
          characterMasteries={pilotData.characterMastery.characterMasteries}
        />
      </ContentBlock>
    </div>
  </main>
}
