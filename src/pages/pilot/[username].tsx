import GeneralLayout from '@/components/layout/General'
import client from '@/core/services/apolloService'
import { getCharacterById } from '@/core/utils/parsing'
import { calculateGoalieForwardPercentage, calculateTotalGoals, calculateTotalAssists, calculateTotalSaves, calculateTotalKnockouts } from '@/core/utils/statistics'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import PlayStyleChart from '@/components/charts/Playstyle'
import dayjs from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'
import { getEloColor, getEloFromLP, getEloImage, getEmoticonFromdata } from '@/core/relations/resolver'
import { ArrowClockwise, CaretDown, ChartLine, ChartPieSlice, ClockCountdown, Eye } from '@phosphor-icons/react'
import RatingChart from '@/components/charts/Rating'
import ChartLayout from '@/components/layout/Chart'
import RatingHistoryChart from '@/components/charts/RatingHistory'
import PilotCard from '@/components/charts/PilotCard'
import Head from 'next/head'
import clsx from 'clsx'

import { getPlayer } from '@/core/queries/getPlayerCharacter'
import { ensurePlayer } from '@/core/queries/ensurePlayer'
// import CharacterStatsModal from '@/components/character/CharacterStatsModal'
import { motion } from 'framer-motion'
import CharacterStat from '@/components/character/CharacterPortrait'
import PlayerCharacterStats from '@/components/character/PlayerCharacterStats'
import CharacterPortrait from '@/components/character/CharacterPortrait'

dayjs.extend(relative)

interface PilotQuery {
    ensurePlayer: STRIKR.API.PlayerObjectType
}

interface IPilotPageProps {
  pilot: {
    games: number
    wins: number
    losses: number
    rank: number
    rating: number
    masteryLevel: number
    username: string
    region: string
    tags: string[]
    matches: number
    goals: number
    assists: number
    knockouts: number
    saves: number
    emoticonId: string
    titleId: string
    ratingGraphData: number[]
    ratingGraphLabels: string[]
    mostPlayedCharacterId: string
    updatedAt: string
    roleRatio: { goaliePercentage: number, forwardPercentage: number }
    playerId: string
  },
  characters: {

  },
  gamemode: 'RankedInitial'
}

const PilotPage: React.FunctionComponent<IPilotPageProps> = ({ pilot }) => {
  const [gamemode, setGamemode] = useState('RankedInitial')
  const { loading: loadingCharacters, error: errorCharacters, data: dataCharacters } = useQuery<{
    getPlayer: {
      characterMastery: STRIKR.API.PlayerCharacterMasteryObjectType,
      characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[]
    }
  }>(getPlayer, {
    variables: {
      id: pilot.playerId
    },
    fetchPolicy: 'no-cache'
  })
  const [selectedCharacter, selectCharacter] = useState<string | undefined>()

  const elo = getEloFromLP(pilot.rating)
  const roleRatio = pilot.roleRatio || {
    forwardPercentage: 50,
    goaliePercentage: 50
  }

  // const OGURL = new URLSearchParams()
  // OGURL.set('isVerified', String(pilot?.tags?.includes('verified') || 'false' ))
  // OGURL.set('isStaff', String(pilot?.tags?.includes('STAFF') || 'false' ))
  // OGURL.set('username', pilot.username || 'Unknown')
  // OGURL.set('title', pilot.titleId || 'Unknown')
  // OGURL.set('rank', String(pilot.rank || 'Unknown') )
  // OGURL.set('lp', String(pilot.rating || 'Unknown') )
  // OGURL.set('win', String(pilot.wins || 'Unknown') )
  // OGURL.set('loss', String(pilot.losses || 'Unknown') )
  // OGURL.set('region', pilot.region || 'Unknown')
  // OGURL.set('emote', getEmoticonFromdata(pilot.emoticonId)?.image || '/i/emoticon/T_Emoticon_ThumbsUp-512x512.png')
  // OGURL.set('elo', elo.rank || 'Unknown')
  // OGURL.set('eloImage', getEloImage(elo.rank).replace('.png', ''))
  // OGURL.set('eloColor', getEloColor(elo.rank) || 'Unknown')
  // OGURL.set('role', roleRatio.forwardPercentage > 60 ? roleRatio.goaliePercentage > 60 ? '🥅 Goalie' : '🦐 Forward'  : '✨ Flex' || 'Unknown')
  // OGURL.set('character', getCharacterById(pilot.mostPlayedCharacterId)?.name || 'Unknown')
  // OGURL.set('characterImage', getCharacterById(pilot.mostPlayedCharacterId)?.goalscore.replace('.png', '') || 'Unknown')

  const totalGoalieStats = [...dataCharacters?.getPlayer.characterRatings || []]
  .filter( rating => {
    return rating.gamemode === gamemode && rating.role === 'Goalie'
  })

  const sumGoalieStats = {
    scores: totalGoalieStats.reduce((a, b) => a + b.scores, 0),
    assists: totalGoalieStats.reduce((a, b) => a + b.assists, 0),
    saves: totalGoalieStats.reduce((a, b) => a + b.saves, 0),
    knockouts: totalGoalieStats.reduce((a, b) => a + b.knockouts, 0)
  }

  const totalForwardStats = [...dataCharacters?.getPlayer.characterRatings || []]
  .filter( rating => {
    return rating.gamemode === gamemode && rating.role === 'Forward'
  })

  const sumForwardStats = {
    scores: totalForwardStats.reduce((a, b) => a + b.scores, 0),
    assists: totalForwardStats.reduce((a, b) => a + b.assists, 0),
    saves: totalForwardStats.reduce((a, b) => a + b.saves, 0),
    knockouts: totalForwardStats.reduce((a, b) => a + b.knockouts, 0)
  }


  if (!pilot) return <GeneralLayout>
  </GeneralLayout>

  return <>
  <Head>
        <title>{`${pilot.username} - Strikr.gg`}</title>
        <meta name="description" content={`${pilot.username} Statistics, guides & playstyle @ strikr.gg`} key="desc" />
        <meta property="og:title" content={`${pilot.username} - Main ${roleRatio.forwardPercentage > 60 ? roleRatio.goaliePercentage > 60 ? 'Goalie' : 'Forward'  : '✨ Flex' || 'Unknown'} ${getCharacterById(pilot.mostPlayedCharacterId)?.name} @ ${pilot.rating}LP (${elo.rank})`} />
        <meta
          property="og:description"
          content="Strikr.gg Analyze your GamePlay, track your progress and improve your skills."
        />
        {/* <meta
          property="og:image"
          content={`https://strikr.gg/api/pilotcard?${OGURL.toString()}`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
  </Head>
  <GeneralLayout>
    <div 
      className='absolute inset-0 w-full h-screen bg-no-repeat z-[0]' 
      style={{
        backgroundImage: `linear-gradient(to top, #101211 60%, #101211CC), url('${getCharacterById(pilot.mostPlayedCharacterId)?.goalscore}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      />
    <div className='absolute inset-0 w-full h-full backdrop-blur-sm z-[1]' />
    <section className='flex flex-col w-full gap-6 px-4 md:px-20 pt-36 z-[2]' >
      <div className='flex flex-col w-full gap-4 xl:flex-row'>
        <div className='flex w-full xl:w-1/3'>
          <PilotCard
            emoticonId={pilot.emoticonId}
            tags={pilot.tags}
            username={pilot.username}
            titleId={pilot.titleId}
            mainRole={roleRatio.goaliePercentage > 60 ? '🥅 Goalie' : roleRatio.forwardPercentage > 60 ? '🦐 Forward'  : '✨ Flex'}
            mainCharacter={getCharacterById(pilot.mostPlayedCharacterId)?.name || 'Omega Strikers'}
          />
        </div>
        <div className='flex flex-col w-full gap-4 xl:w-2/3'>
          <div className='flex justify-between w-full'>
            <button className='flex items-center justify-between w-full gap-4 px-4 py-2 duration-200 rounded-lg lg:justify-start lg:w-min bg-secondary text-white/60 hover:text-white hover:bg-accent'>
              {gamemode}
              <CaretDown />
            </button>
          </div>
          <div className='flex flex-col justify-end w-full gap-8 p-4 rounded-lg lg:flex-row bg-secondary'>
              <div className='flex flex-col w-1/2'>
                <h3 className='text-lg font-bold'>Lifetime Stats</h3>
                <span className='text-xs text-white/60'>Based on Ody collected data</span>
              </div>
              <div className='flex items-center justify-start w-full gap-8 lg:justify-end lg:w-1/2'>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Games</h6>
                  <span className='text-xl font-bold'>{pilot.games}</span>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Winrate</h6>
                  <span className='text-xl font-bold'>{(pilot.wins / pilot.games * 100).toFixed(2)}</span>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Wins</h6>
                  <span className='text-xl font-bold'>{pilot.wins}</span>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Losses</h6>
                  <span className='text-xl font-bold'>{pilot.losses}</span>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Scores</h6>
                  <span className='text-xl font-bold'>{pilot.goals}</span>
                </div>
                <div className='flex flex-col'>
                  <h6 className='text-xs text-white/40'>Assists</h6>
                  <span className='text-xl font-bold'>{pilot.assists}</span>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full gap-4 xl:flex-row'>
        <aside className='flex flex-col w-full h-full gap-6 xl:w-1/3'>
          <RatingChart
            color={getEloColor(elo.rank)}
            losses={pilot.losses}
            rating={pilot.rating}
            region={pilot.region}
            wins={pilot.wins}
            rank={pilot.rank}
            games={pilot.games}
            elo={elo.rank}
          />
           <ChartLayout
            title='Rating History'
            subtitle='Based on Strikr collected data'
          >
            <RatingHistoryChart
              data={
                pilot.ratingGraphData?.reverse()
              }
              labels={
                pilot.ratingGraphLabels?.reverse()
              }
              bottomLine={Number(elo.closestBottomLine)}
            />
            <span className='absolute hidden text-xs -translate-x-1/2 -bottom-2 left-1/2 opacity-60 whitespace-nowrap md:flex'>Scroll to zoom | Hold Ctrl to pan | Hold Shift to select & zoom</span>
          </ChartLayout>
          {/* PLAYSTYLE */}
          <ChartLayout
            title='Playstyle'
            subtitle='Based on all time stats for this gamemode'
          >
            <div className='flex flex-col items-center justify-center w-full min-h-[40vh] lg:min-h-[0px]'>
              {pilot && <PlayStyleChart
                forward={sumForwardStats}
                goalie={sumGoalieStats}
              /> }
            </div>

          </ChartLayout>
          {/* ROLE RATIO */}
          <ChartLayout
            title='Role Ratio'
            subtitle='Based on all time stats for this gamemode'
          >
            <div className='flex w-full h-min'>
                <div 
                  className='h-8 bg-primary'
                  style={{
                    width: `${(roleRatio?.goaliePercentage || 0).toFixed(0)}%`
                  }}
                />
                <div 
                  className='h-8 bg-tertiary'
                  style={{
                    width: `${(roleRatio?.forwardPercentage || 0).toFixed(0)}%`
                  }}
                />
            </div>
            <div className='flex items-center gap-4'>
              <span className='flex items-center gap-2 text-xs text-white/60'><div className='w-4 h-4 bg-primary' /> 
              Goalie [{(roleRatio?.goaliePercentage || 0).toFixed(0)}%]</span>
              <span className='flex items-center gap-2 text-xs text-white/60'><div className='w-4 h-4 bg-tertiary' /> 
              Forward [{(roleRatio?.forwardPercentage || 0).toFixed(0)}%]</span>
            </div>
          </ChartLayout>

        </aside>
        <div className='flex flex-col w-full gap-4 pt-6 lg:pt-0 xl:w-2/3'>
          {loadingCharacters && <div className='flex flex-col items-center justify-center w-full gap-2 py-16'>
            <img src='/i/emoticon/T_AimiSweat-512x512.webp' alt='aimiType' className='w-14 h-14'/>
            <span className='text-white/60'>Ai.Mi is working on this</span>
          </div>}
            {dataCharacters && <ChartLayout
              title='Character Stats'
              subtitle='Based on all time stats for this gamemode, ordered by most played'
            >
                <div 
                  className='grid w-full grid-cols-4 gap-4 lg:grid-cols-6 xl:grid-cols-10 2xl:grid-cols-12'
                >
                  {
                    !selectedCharacter &&
                    [...dataCharacters.getPlayer.characterMastery.characterMasteries]
                    .sort( (a,b) => {
                      const characterRatingsA = [...dataCharacters.getPlayer.characterRatings].filter( rating => rating.character === a.characterAssetName)
                        .map( rating => rating.games)
                        .reduce( (a,b) => a + b, 0)
                      const characterRatingsB = [...dataCharacters.getPlayer.characterRatings].filter( rating => rating.character === b.characterAssetName)
                      .map( rating => rating.games)
                      .reduce( (a,b) => a + b, 0)

                      return (characterRatingsB || 1 ) - (characterRatingsA || 1)
                    })
                    .map((character) => {
                        return (
                          <CharacterPortrait
                            characterId={character.characterAssetName}
                            color={ selectedCharacter === character.characterAssetName ? 'accent' : 'tertiary'}
                            size='fluid'
                            key={character.characterAssetName}
                            onClick={() => selectCharacter(character.characterAssetName)}
                          />
                        )
                    })
                  }
                </div>
                {selectedCharacter && (
                  <PlayerCharacterStats
                    username={pilot.username}
                    goalieRating={dataCharacters.getPlayer.characterRatings.filter( rating => (rating.character === selectedCharacter) && (rating.role === 'Goalie') && (rating.gamemode === gamemode))}
                    forwardRating={dataCharacters.getPlayer.characterRatings.filter( rating => (rating.character === selectedCharacter) && (rating.role  === 'Forward') && (rating.gamemode === gamemode))}
                    onBack={() => selectCharacter(undefined)}
                    mastery={dataCharacters.getPlayer.characterMastery.characterMasteries.find( mastery => mastery.characterAssetName === selectedCharacter) || {
                      characterAssetName: selectedCharacter,
                      currentTier: 0,
                      currentTierXp: 0,
                      idxHighestTierCollected: 0,
                      maxTier: 0,
                      totalXp: 0,
                      xpToNextTier: 0
                    }}
                  />
                )}
            </ChartLayout>}
        </div>
      </div>
    </section>
  </GeneralLayout>
  </>
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultRatingObject = {
    rating: 0,
    games: 0,
    wins: 0,
    losses: 0,
    rank: 10_001,
    masteryLevel: 0,
    createdAt: new Date().toISOString()
  }
  try {
    if (!context.query.username) { return { props: {} } }
    
    const query = await client.query<PilotQuery>({
      query: ensurePlayer,
      variables: {
        pilotname: context.query.username as string,
        refresh: true
      },
      fetchPolicy: 'no-cache'
    })
        
    const orderedPilotRatings = [...query.data.ensurePlayer.ratings].sort((a, b) => { return dayjs(b.createdAt).unix() -  dayjs(a.createdAt).unix() })
    const latestPilotRating = orderedPilotRatings?.[0] || defaultRatingObject
    const ratingGraphData = orderedPilotRatings.map( rating => rating.rating )
    const ratingGraphLabels: string[] = orderedPilotRatings.map( rating => dayjs(rating.createdAt).format('MM/DD @ hh:MM A') )

    console.log('Query Data', query.data.ensurePlayer.characterRatings)

    return {
      props: {
        pilot: {
          games: latestPilotRating.games,
          wins: latestPilotRating.wins,
          goals: calculateTotalGoals(query.data.ensurePlayer, context.query?.gamemode as string || 'RankedInitial'),
          assists: calculateTotalAssists(query.data.ensurePlayer, context.query?.gamemode as string || 'RankedInitial'),
          knockouts: calculateTotalKnockouts(query.data.ensurePlayer, context.query?.gamemode as string || 'RankedInitial'),
          saves: calculateTotalSaves(query.data.ensurePlayer, context.query?.gamemode as string || 'RankedInitial'),
          losses: latestPilotRating.losses,
          rank: latestPilotRating.rank,
          rating: latestPilotRating.rating, // LP
          masteryLevel: latestPilotRating.masteryLevel,
          username: context.query.username,
          region: query.data.ensurePlayer.region || 'Global',
          tags: query.data.ensurePlayer.tags || [],
          emoticonId: query.data.ensurePlayer.emoticonId,
          titleId: query.data.ensurePlayer.titleId,
          ratingGraphData,
          ratingGraphLabels,
          mostPlayedCharacterId: [...query.data.ensurePlayer.characterRatings].sort( (a, b) => b.games - a.games )[0].character,
          updatedAt: latestPilotRating.createdAt,
          roleRatio: calculateGoalieForwardPercentage(query?.data?.ensurePlayer, context.query?.gamemode as string || 'RankedInitial') || {
            forwardPercentage: 50,
            goaliePercentage: 50
          },
          playerId: query.data.ensurePlayer.id,
        },
        characters: {

        },
        gamemode: 'RankedInitial'
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        pilot: {}
      }
    }
  }
}

export { getServerSideProps }
export default PilotPage
