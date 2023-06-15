import GeneralLayout from '@/components/layouts/General'
import client from '@/core/services/apolloService'
import { getCharacterById } from '@/core/utils/parsing'
import { calculateGoalieForwardPercentage, calculateTotalGoals, calculateTotalAssists, calculateTotalSaves, calculateTotalKnockouts } from '@/core/utils/statistics'
import { useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useEffect, useRef, useState } from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'  
import PlayStyleChart from '@/components/molecules/PlaystyleChart'
import dayjs from 'dayjs'
import relative from 'dayjs/plugin/relativeTime'
import { getEmoticonFromdata, getRankFromLP } from '@/core/relations/resolver'
import { ArrowClockwise, CaretDown, ChartLine, ChartPieSlice, ClockCountdown, Eye } from '@phosphor-icons/react'
import RatingChart from '@/components/molecules/RatingChart'
import ChartLayout from '@/components/layouts/Chart'
import RatingHistoryChart from '@/components/molecules/RatingHistoryChart'
import PilotCard from '@/components/charts/PilotCard'
import Head from 'next/head'
import clsx from 'clsx'

import { getPlayer } from '@/core/queries/getPlayerCharacter'
import { ensurePlayer } from '@/core/queries/ensurePlayer'
// import CharacterStatsModal from '@/components/character/CharacterStatsModal'
import { motion } from 'framer-motion'
import CharacterStat from '@/components/atoms/CharacterPortrait'
import PlayerCharacterStats from '@/components/layouts/PlayerCharacterStats'
import CharacterPortrait from '@/components/atoms/CharacterPortrait'
import { calculatePilotAverageGamesPerDay, calculatePilotProperty, calculatePilotRatingGainPerDay, defaultPilotRating } from '@/core/statistics/pilotStats'
import PilotHeader from '@/components/organisms/PilotHeader'
import ContentLayout from '@/components/layouts/Content'
import characters from '@/core/relations/objects/characters'
import { getLatestCharacterMasterySamples } from '@/core/statistics/math'
import { calculateStrikeDescriptivePlaystyle, defaultStrikerRating } from '@/core/statistics/strikerStats'
import { useRouter } from 'next/router'
import { selectedGamemode } from '@/core/stores/pilotSearch'
import { useAtom } from 'jotai'
import StrikerRatingList from '@/components/organisms/StrikerRatingList'

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
    scores: number
    assists: number
    knockouts: number
    saves: number
    emoticonId: string
    titleId: string
    ratingGraphData: {
      value: number,
      date: string
    }[]
    mostPlayedCharacterId: string
    updatedAt: string
    roleRatio: { goaliePercentage: number, forwardPercentage: number }
    playerId: string,
    averagePointsPerDay: number,
    averageGamesPerDay: number,
  },
  characters: {

  },
  gamemode: 'RankedInitial'
}

const PilotPage: React.FunctionComponent<IPilotPageProps> = ({ pilot }) => {
  const router = useRouter()
  const [gamemode, setGamemode] = useAtom(selectedGamemode)
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
  const pilotRank = getRankFromLP(pilot.rating)

  
  useEffect(()=>{
    if (!router.isReady) { return }
    setGamemode(router.query?.gamemode as string || 'RankedInitial')
  }, [router, setGamemode])

  if (!pilot) return <GeneralLayout>
  </GeneralLayout>

  return <>
  <Head>
        <title>{`${pilot.username} - Strikr.gg`}</title>
        <meta name="description" content={`${pilot.username} Statistics, guides & playstyle @ strikr.gg`} key="desc" />
        <meta property="og:title" content={`${pilot.username} - Main ${pilot?.roleRatio?.forwardPercentage > 60 ? pilot.roleRatio.goaliePercentage > 60 ? '🥅 Goalie' : '🦐 Forward'  : '✨ Flex' || 'Unknown'}`}  />
        <meta
          property="og:description"
          content="Strikr.gg Analyze your GamePlay, track your progress and improve your skills."
        />
  </Head>
  <GeneralLayout>
    <div 
      className='absolute inset-0 w-full h-screen bg-no-repeat z-[0]' 
      style={{
        backgroundImage: `linear-gradient(to top, #101211 30%, #101211CC), url('${getCharacterById(pilot.mostPlayedCharacterId)?.goalscore}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      />
    <div className='absolute inset-0 w-full h-full backdrop-blur-sm z-[1]' />
    <ContentLayout>
      <div className='z-[5] mt-36 flex gap-8 flex-col'>
        <PilotHeader 
           emoticonId={pilot.emoticonId}
           tags={pilot.tags}
           username={pilot.username}
           titleId={pilot.titleId}
           mainRole={
            pilot?.roleRatio?.forwardPercentage > 60 ? '🦐 Forward' : pilot?.roleRatio?.goaliePercentage > 60 ? '🥅 Goalie' : '✨ Flex'
           }
           mainCharacter={pilot.mostPlayedCharacterId}
           games={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'games')}
           wins={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'wins')}
           losses={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'losses')}
           scores={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'scores')}
           assists={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'assists')}
           knockouts={calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'knockouts')}
           gamemode={gamemode}
           averageRatingPerDay={pilot.averagePointsPerDay}
           lastUpdate={pilot.updatedAt}
        />
        <div className='flex w-full gap-8'>
          <div className='w-full gap-8 flex flex-col 2xl:w-5/12'>
            <RatingChart
              color={pilotRank.rankObject.color}
              games={pilot.games}
              losses={pilot.losses}
              rating={pilot.rating}
              region={pilot.region}
              wins={pilot.wins}
              rank={pilot.rank}
            />
            <ChartLayout
              title='Rating History'
              subtitle='Calculated & Stored by Strikr'
            >
              <RatingHistoryChart
                data={pilot.ratingGraphData}
                bottomLine={pilotRank.prevRankObject?.threshold || 800}
                topLine={pilotRank.nextRankObject?.threshold}
              />
            </ChartLayout>
            <ChartLayout
              title='Playstyle'
              subtitle='Calculated from every striker on this gamemode'
            >
              <PlayStyleChart
                forward={{
                  assists: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'assists', 'Forward'),
                  knockouts: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'knockouts', 'Forward'),
                  scores: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'scores', 'Forward'),
                  saves: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'saves', 'Forward'),
                }}
                goalie={{
                  assists: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'assists', 'Goalie'),
                  knockouts: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'knockouts', 'Goalie'),
                  scores: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'scores', 'Goalie'),
                  saves: calculatePilotProperty(dataCharacters?.getPlayer.characterRatings, gamemode, 'saves', 'Goalie'),
                }}
              />
            </ChartLayout>
            <ChartLayout
            title='Role Ratio'
            subtitle='Based on all time stats for this gamemode'
          >
            <div className='flex w-full h-min'>
                <div 
                  className='h-8 bg-primary'
                  style={{
                    width: `${(pilot?.roleRatio?.goaliePercentage || 0).toFixed(0)}%`
                  }}
                />
                <div 
                  className='h-8 bg-tertiary'
                  style={{
                    width: `${(pilot?.roleRatio?.forwardPercentage || 0).toFixed(0)}%`
                  }}
                />
            </div>
            <div className='flex items-center gap-4'>
              <span className='flex items-center gap-2 text-xs text-white/60'><div className='w-4 h-4 bg-primary' /> 
              Goalie [{(pilot?.roleRatio?.goaliePercentage || 0).toFixed(0)}%]</span>
              <span className='flex items-center gap-2 text-xs text-white/60'><div className='w-4 h-4 bg-tertiary' /> 
              Forward [{(pilot?.roleRatio?.forwardPercentage || 0).toFixed(0)}%]</span>
            </div>
          </ChartLayout>
          {/* <ChartLayout
            title='Descriptive Playstyle'
            subtitle='Based on AI analysis of the playstyle graph distribution'
          >
            {calculateStrikeDescriptivePlaystyle(dataCharacters?.getPlayer.characterRatings || [], gamemode)}
          </ChartLayout> */}
          </div>
          <div className='w-full gap-8 flex flex-col wxl:w-7/12'>
            <ChartLayout
              title='Character ratings'
              subtitle='Ordered by most played, based on current gamemode. (Click to see details)'
            >
              {loadingCharacters && <div className='flex flex-col items-center justify-center w-full gap-2 py-16'>
                <img src='/i/emoticon/T_AimiSweat-512x512.webp' alt='aimiType' className='w-14 h-14'/>
                <span className='text-white/60'>Ai.Mi is working on this</span>
              </div>}
              <div className='w-full flex flex-col lg:flex-row gap-4'>
                {dataCharacters && !selectedCharacter && (<>
                  {/* /* FORWARD */}
                  <StrikerRatingList
                    dataCharacters={dataCharacters}
                    gamemode={gamemode}
                    role='Forward'
                    selectCharacter={selectCharacter}
                  />
                  {/* /* GOALIE */}
                  <StrikerRatingList
                    dataCharacters={dataCharacters}
                    gamemode={gamemode}
                    role='Goalie'
                    selectCharacter={selectCharacter}
                  />
              </>)}
                {dataCharacters && selectedCharacter && <PlayerCharacterStats
                  username={pilot.username}
                   goalieRating={dataCharacters.getPlayer.characterRatings.filter( rating => (rating.character === selectedCharacter) && (rating.role === 'Goalie') && (rating.gamemode === gamemode))}
                   forwardRating={dataCharacters.getPlayer.characterRatings.filter( rating => (rating.character === selectedCharacter) && (rating.role  === 'Forward') && (rating.gamemode === gamemode))}
                   onBack={() => { selectCharacter(undefined) }}
                   mastery={
                    dataCharacters.getPlayer.characterMastery.characterMasteries.find( mastery => mastery.characterAssetName === selectedCharacter) || {
                    characterAssetName: selectedCharacter,
                    currentTier: 0,
                    currentTierXp: 0,
                    idxHighestTierCollected: 0,
                    maxTier: 0,
                    totalXp: 0,
                    xpToNextTier: 0
                  }}
                />}
              </div>
            </ChartLayout>
          </div>
        </div>
      </div>
    </ContentLayout>
  </GeneralLayout>
  </>
}

const getServerSideProps: GetServerSideProps = async (context) => {
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
    const latestPilotRating = orderedPilotRatings.sort( (a, b) => dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1)[0]
    const ratingGraphData = orderedPilotRatings.map( rating => { return {
      value: rating.rating,
      date: rating.createdAt
    } })
    console.log('Gamemode:', context.query?.gamemode )
    return {
      props: {
        pilot: {
          games: latestPilotRating?.games,
          wins: latestPilotRating?.wins,
          losses: latestPilotRating?.losses,
          rank: latestPilotRating?.rank,
          rating: latestPilotRating?.rating, // LP
          masteryLevel: latestPilotRating?.masteryLevel,
          username: context.query.username,
          region: query.data.ensurePlayer.region || 'Global',
          tags: query.data.ensurePlayer.tags || [],
          emoticonId: query.data.ensurePlayer.emoticonId,
          titleId: query.data.ensurePlayer.titleId,
          ratingGraphData,
          mostPlayedCharacterId: [...query.data.ensurePlayer.characterRatings].sort( (a, b) => b.games - a.games )[0].character,
          updatedAt: latestPilotRating?.createdAt,
          roleRatio: {
            forwardPercentage: calculatePilotProperty(query.data.ensurePlayer.characterRatings, context?.query?.gamemode as string || 'RankedInitial', 'games', 'Forward') / calculatePilotProperty(query.data.ensurePlayer.characterRatings, context?.query?.gamemode as string || 'RankedInitial', 'games') * 100,
            goaliePercentage: calculatePilotProperty(query.data.ensurePlayer.characterRatings, context?.query?.gamemode as string || 'RankedInitial', 'games', 'Goalie') / calculatePilotProperty(query.data.ensurePlayer.characterRatings, context?.query?.gamemode as string || 'RankedInitial', 'games') * 100
          },
          playerId: query.data.ensurePlayer.id,
          averagePointsPerDay: calculatePilotRatingGainPerDay(query.data.ensurePlayer),
          averageGamesPerDay: calculatePilotAverageGamesPerDay(query.data.ensurePlayer)
        },
        gamemode: context.query?.gamemode || 'RankedInitial'
      }
    }
  } catch (e) {
    return {
      props: {
        pilot: {}
      }
    }
  }
}

export { getServerSideProps }
export default PilotPage
