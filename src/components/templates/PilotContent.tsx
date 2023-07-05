import { RankIcon } from '@/components/atoms/Rank'
import RatingChart from '@/components/atoms/RatingChart'
import RatioChart from '@/components/atoms/RatioChart'
import ContentBlock from '@/components/templates/ContentBlock'
import PilotCard from '@/components/molecules/PilotCard'
import RankCard from '@/components/molecules/RankCard'
import { calculatePilotProperty, normalizePlaystyleAttributes } from '@/core/mathUtils'
import { ChartDonut, Graph, Person } from '@/atoms/PhosphorIcon'
import dayjs from 'dayjs'
import PlaystyleChart from '@/components/atoms/PlaystyleChart'
import { getRankFromLP } from '@/core/relations/resolver'
import PilotStatBar from '@/components/molecules/PilotStatBar'


export interface PilotContentProps {
  data: {
    ensurePlayer: STRIKR.API.PlayerObjectType
  }
  gamemode: string
  username: string
}

export default function PilotContent({ data, gamemode, username }: PilotContentProps) {
  const t = useTranslations('translation')
  const tt = useTranslations('title')

  const pilotData = data.ensurePlayer

  const pilotRatingsByNewest = [...pilotData.ratings].sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )
  const characterRatingsByNewest = [...pilotData.characterRatings].sort( (a, b) => dayjs(b.createdAt).isBefore(a.createdAt) ? -1 : 1 )

  const gamesAsForward = calculatePilotProperty(pilotData.characterRatings, gamemode, 'games', 'Forward')
  const gamesAsGoalie = calculatePilotProperty(pilotData.characterRatings, gamemode, 'games', 'Goalie')

  const currentRank = getRankFromLP(pilotRatingsByNewest[0].rating)

  const gamemodeScores = calculatePilotProperty(characterRatingsByNewest, gamemode, 'scores')
  const gamemodeSaves = calculatePilotProperty(characterRatingsByNewest, gamemode, 'saves')
  const gamemodeAssists = calculatePilotProperty(characterRatingsByNewest, gamemode, 'assists')
  const gamemodeKnockouts = calculatePilotProperty(characterRatingsByNewest, gamemode, 'knockouts')
  const gamemodeMvps = calculatePilotProperty(characterRatingsByNewest, gamemode, 'mvp')
  const gamemodeWins = calculatePilotProperty(characterRatingsByNewest, gamemode, 'wins')
  const gamemodeLosses = calculatePilotProperty(characterRatingsByNewest, gamemode, 'losses')
  const gamemodeGames = calculatePilotProperty(characterRatingsByNewest, gamemode, 'games')
  const gamemodeNormalizedAttributes = normalizePlaystyleAttributes({ 
    assists: gamemodeAssists, 
    knockouts: gamemodeKnockouts, 
    scores: gamemodeScores, 
    saves: gamemodeSaves 
  })

  const badges = [
    {
      name: t(`strikr.badge.${((gamesAsForward/gamemodeGames) * 100) > 60 ? 'forward' : ((gamesAsGoalie/gamemodeGames) * 100) > 60 ? 'goalie' : 'flex' }`),
    },
    {
      name: t(
        'strikr.badge.maincharacter', { 
          character: t(`character:${[...characterRatingsByNewest].sort( (a, b) => a.games > b.games ? -1 : 1)[0].character}`)
        }),
    },
  ]

  if (gamemodeNormalizedAttributes.scores >= 1.5) {
    badges.push({
      name: t('strikr.badge.scorer'),
    })
  }

  if (gamemodeNormalizedAttributes.knockouts >= 1.5) {
    badges.push({
      name: t('strikr.badge.brawler'),
    })
  }

  if (gamemodeNormalizedAttributes.assists >= 1.5) {
    badges.push({
      name: t('strikr.badge.support'),
    })
  }


  return <main className='px-4 mt-8'>
    <div 
      className='absolute inset-0 h-[40vh] bg-no-repeat z-[-1] pointer-events-none'
      style={{
        background: `radial-gradient(at top center, ${getRankFromLP(pilotRatingsByNewest[0].rating).rankObject.color + '33'} 0%, rgba(6, 0, 12, 0.0) 50%)`
      }}
    />
    <div className='flex flex-col xl:flex-row  gap-8 w-full'>
      <aside className='w-full xl:w-1/3 flex flex-col gap-4'>
        <PilotCard
          emoticon={pilotData.emoticonId || 'default'}
          title={tt(`${pilotData.titleId || 'default'}`)}
          username={username}
          currentMasteryXp={pilotData.mastery.currentLevelXp}
          masteryLevel={pilotData.mastery.currentLevel}
          nextMasteryXp={pilotData.mastery.xpToNextLevel}
          badges={badges}
          key={pilotData.id}
        />
        <RankCard
          losses={calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'losses')}
          wins={calculatePilotProperty(characterRatingsByNewest, 'RankedInitial', 'wins')}
          rank={pilotRatingsByNewest[0].rank}
          rating={pilotRatingsByNewest[0].rating}
          region={pilotData.region} 
        />
        <ContentBlock
          title={t('strikr.chart.ratinghistory')}
          subtitle='Based on Competitive Gamemode'
          Icon={<RankIcon className='!w-6 !h-6' />}
        >
          {null}
          <RatingChart
            data={pilotData.ratings.map( rating => {
              return {
                date: rating.createdAt,
                rating: rating.rating
              }
            })}
            bottomLine={currentRank.prevRankObject?.threshold}
            topLine={currentRank.nextRankObject?.threshold}
          />
        </ContentBlock>
        <ContentBlock
          title={t('strikr.chart.roleRatio')}
          subtitle='Based on selected gamemode'
          Icon={<ChartDonut size={24} weight='fill' className='text-subtle' />}
        >
          {null}
          <RatioChart
            data={[
              {
                label: 'game:forward',
                color: '#F69E18',
                percentile: gamesAsForward / (gamesAsForward + gamesAsGoalie) * 100,
              },
              {
                label: 'game:goalie',
                color: '#F66618',
                percentile: gamesAsGoalie / (gamesAsGoalie + gamesAsForward) * 100,
              }
            ]}
          />
        </ContentBlock>
        <ContentBlock
          title={t('strikr.chart.playstyle')}
          subtitle='Based on selected gamemode'
          Icon={<Graph size={24} weight='fill' className='text-subtle' />}
        >
          <></>
          <PlaystyleChart
            forward={{
              assists: calculatePilotProperty(characterRatingsByNewest, gamemode, 'assists', 'Forward'),
              knockouts: calculatePilotProperty(characterRatingsByNewest, gamemode, 'knockouts', 'Forward'),
              saves: calculatePilotProperty(characterRatingsByNewest, gamemode, 'saves', 'Forward'),
              scores: calculatePilotProperty(characterRatingsByNewest, gamemode, 'scores', 'Forward'),
            }}
            goalie={{
              assists: calculatePilotProperty(characterRatingsByNewest, gamemode, 'assists', 'Goalie'),
              knockouts: calculatePilotProperty(characterRatingsByNewest, gamemode, 'knockouts', 'Goalie'),
              saves: calculatePilotProperty(characterRatingsByNewest, gamemode, 'saves', 'Goalie'),
              scores: calculatePilotProperty(characterRatingsByNewest, gamemode, 'scores', 'Goalie'),
            }}
          />
        </ContentBlock>
      </aside>
      {/* <section className='w-full xl:w-2/3 flex flex-col gap-4'>
          <PilotStatBar
            assists={gamemodeAssists}
            knockouts={gamemodeKnockouts}
            saves={gamemodeSaves}
            scores={gamemodeScores}
            averageLP={0}
            gamemode={gamemode}
            games={gamemodeGames}
            losses={gamemodeLosses}
            mvp={gamemodeMvps}
            wins={gamemodeWins}
          />
          <ContentBlock
            title={t('strikr.chart.characters')}
            subtitle={t('strikr.chart.characterssub')}
            Icon={<Person size={24} weight='fill' className='text-subtle' />}
          >
            <></>
            <>{pilotData.characterRatings.map( rating => {
              if (rating.gamemode !== gamemode) { return }
              
              return <div className='flex flex-col' key={rating.character + rating.role + rating.id}>
                <span>{rating.character} as {rating.role} w: {rating.games}</span>
              </div>
            })}</>
          </ContentBlock>
      </section> */}
    </div>
  </main>
}