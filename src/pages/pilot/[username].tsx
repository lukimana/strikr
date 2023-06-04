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

import { getPlayer } from '@/core/queries/getPlayerCharacter'
import { ensurePlayer } from '@/core/queries/ensurePlayer'
import CharacterStatsModal from '@/components/character/CharacterStatsModal'

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

  const elo = getEloFromLP(pilot.rating)
  const roleRatio = pilot.roleRatio || {
    forwardPercentage: 50,
    goaliePercentage: 50
  }
  
  const OGURL = new URLSearchParams()
  OGURL.set('isVerified', String(pilot?.tags?.includes('verified') || 'false' ))
  OGURL.set('isStaff', String(pilot?.tags?.includes('STAFF') || 'false' ))
  OGURL.set('username', pilot.username || 'Unknown')
  OGURL.set('title', pilot.titleId || 'Unknown')
  OGURL.set('rank', String(pilot.rank || 'Unknown') )
  OGURL.set('lp', String(pilot.rating || 'Unknown') )
  OGURL.set('win', String(pilot.wins || 'Unknown') )
  OGURL.set('loss', String(pilot.losses || 'Unknown') )
  OGURL.set('region', pilot.region || 'Unknown')
  OGURL.set('emote', getEmoticonFromdata(pilot.emoticonId)?.image || '/i/emoticon/T_Emoticon_ThumbsUp-512x512.png')
  OGURL.set('elo', elo.rank || 'Unknown')
  OGURL.set('eloImage', getEloImage(elo.rank).replace('.png', ''))
  OGURL.set('eloColor', getEloColor(elo.rank) || 'Unknown')
  OGURL.set('role', roleRatio.forwardPercentage > 60 ? roleRatio.goaliePercentage > 60 ? '🥅 Goalie' : '🦐 Forward'  : '✨ Flex' || 'Unknown')
  OGURL.set('character', getCharacterById(pilot.mostPlayedCharacterId)?.name || 'Unknown')
  OGURL.set('characterImage', getCharacterById(pilot.mostPlayedCharacterId)?.goalscore.replace('.png', '') || 'Unknown')

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
      <div className='flex flex-col w-full gap-4 md:flex-row'>
        <div className='flex w-full md:w-1/3'>
          <PilotCard
            emoticonId={pilot.emoticonId}
            tags={pilot.tags}
            username={pilot.username}
            titleId={pilot.titleId}
            mainRole={roleRatio.forwardPercentage > 60 ? roleRatio.goaliePercentage > 60 ? '🥅 Goalie' : '🦐 Forward'  : '✨ Flex'}
            mainCharacter={getCharacterById(pilot.mostPlayedCharacterId)?.name || 'Omega Strikers'}
          />
        </div>
        <div className='flex flex-col w-full gap-4 md:w-2/3'>
          <div className='flex justify-between w-full'>
            <button className='flex items-center justify-between w-full gap-4 px-4 py-2 duration-200 rounded-lg md:justify-start md:w-min bg-secondary text-white/60 hover:text-white hover:bg-accent'>
              Ranked
              <CaretDown />
            </button>
          </div>
          <div className='flex flex-col justify-end w-full gap-8 p-4 rounded-lg md:flex-row bg-secondary'>
              <div className='flex flex-col w-1/2'>
                <h3 className='text-lg font-bold'>Lifetime Stats</h3>
                <span className='text-xs text-white/60'>Based on Ody collected data</span>
              </div>
              <div className='flex items-center justify-start w-full gap-8 md:justify-end md:w-1/2'>
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
      <div className='flex flex-col w-full gap-4 md:flex-row'>
        <aside className='flex flex-col w-full h-full gap-6 md:w-1/3'>
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
          </ChartLayout>
          {/* PLAYSTYLE */}
          <ChartLayout
            title='Playstyle'
            subtitle='Based on all time stats for this gamemode'
          >
            <div className='flex flex-col items-center justify-center w-full h-min'>
              {pilot && <PlayStyleChart
                assists={pilot.assists}
                goals={pilot.goals}
                knockouts={pilot.knockouts}
                saves={pilot.saves}
                gamemode={gamemode} 
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
        <div className='flex flex-col w-full gap-4 pt-6 md:pt-0 md:w-2/3'>
          {loadingCharacters && <div className='flex flex-col items-center justify-center w-full gap-2 py-16'>
            <img src='/i/emoticon/T_AimiSweat-512x512.webp' alt='aimiType' className='w-14 h-14'/>
            <span className='text-white/60'>Ai.Mi is working on this</span>
          </div>}
          {dataCharacters && <ChartLayout
              title='Character Stats'
              subtitle='Based on all time stats for this gamemode, ordered by most played'
            /> }
            <div className='flex flex-col gap-4'>
            {dataCharacters && <>
                <div className='flex flex-col pt-4'>
                  {[...dataCharacters.getPlayer.characterMastery.characterMasteries]
                    .sort((a, b) => b.currentTier - a.currentTier)
                    .map((character) => {
                      const goalieRating = [...dataCharacters.getPlayer.characterRatings]
                        .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
                        .find((rating) => {
                          return (
                            rating.character === character.characterAssetName &&
                            rating.gamemode === gamemode &&
                            rating.role === 'Goalie'
                          )
                        })

                      const forwardRating = [...dataCharacters.getPlayer.characterRatings]
                        .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
                        .find((rating) => {
                          return (
                            rating.character === character.characterAssetName &&
                            rating.gamemode === gamemode &&
                            rating.role === 'Forward'
                          )
                        })

                      return <>
                        <div
                          key={character.characterAssetName}
                          className='flex items-center gap-4 px-4 py-2 mb-2 duration-200 rounded-lg bg-secondary-darker hover:bg-tertiary'
                        >
                          <div className='flex items-center gap-4 w-max'>
                            <div
                              className='w-10 h-10 bg-center bg-no-repeat bg-contain rounded-lg'
                              style={{
                                backgroundImage: `url(${getCharacterById(character.characterAssetName)?.portrait})`,
                              }}
                            />
                            <p className='flex flex-col justify-center gap-2 text-lg font-bold whitespace-nowrap'>
                              <h6 className='flex items-center gap-2'>
                                {getCharacterById(character.characterAssetName)?.name}
                                <span className='flex px-2 py-1 text-xs rounded-lg bg-primary w-min h-min'>🥅 Goalie</span>
                              </h6>
                              <span className='text-sm font-normal text-white/60'>
                                {goalieRating?.games || '0' } Games <small className='text-xs text-white/40'>with</small> {((goalieRating?.wins || 0) / (goalieRating?.games || 1) * 100 || 0).toFixed()}% Winrate
                              </span>
                            </p>
                          </div>
                          <div className='flex w-full gap-4'>
                            <div className='flex justify-end w-full gap-8 text-end'>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Wins</h6>
                                <span className='text-xl font-bold'>{goalieRating?.wins || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Losses</h6>
                                <span className='text-xl font-bold'>{goalieRating?.losses || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Scores</h6>
                                <span className='text-xl font-bold'>{goalieRating?.scores || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Assists</h6>
                                <span className='text-xl font-bold'>{goalieRating?.assists || 0}</span>
                              </div>
                            </div>
                            <CharacterStatsModal
                              rating={goalieRating}
                              username={pilot.username}
                              mastery={character}
                              ratings={[...dataCharacters.getPlayer.characterRatings]
                                .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
                                .filter((rating) => rating.character === character.characterAssetName && rating.role === 'Goalie' && rating.gamemode === gamemode)
                              }
                              role='Goalie'
                            >
                              <div className='flex items-center justify-center h-10 rounded-lg cursor-pointer text-white/60 aspect-square bg-secondary hover:bg-accent hover:text-secondary'>
                                <ChartPieSlice size={22} weight='light' />
                              </div>
                            </CharacterStatsModal>
                          </div>
                        </div>

                        <div
                          key={character.characterAssetName + '-forward'}
                          className='flex items-center gap-4 px-4 py-2 duration-200 rounded-lg bg-secondary-darker/80 hover:bg-tertiary'
                        >
                          <div className='flex items-center gap-4 w-max'>
                            <div
                              className='w-10 h-10 bg-center bg-no-repeat bg-contain w-'
                              style={{
                                backgroundImage: `url(${getCharacterById(character.characterAssetName)?.portrait})`,
                              }}
                            />
                            <p className='flex flex-col justify-center gap-2 text-lg font-bold whitespace-nowrap'>
                              <h6 className='flex items-center gap-2'>
                                {getCharacterById(character.characterAssetName)?.name}
                                <span className='flex px-2 py-1 text-xs rounded-lg bg-primary w-min h-min'>🦐 Forward</span>
                              </h6>
                              <span className='text-sm font-normal text-white/60'>
                              {forwardRating?.games || '0' } Games <small className='text-xs text-white/40'>with</small> {((forwardRating?.wins || 0) / (forwardRating?.games || 1) * 100 || 0).toFixed()}% Winrate
                              </span>
                            </p>
                          </div>
                          <div className='flex w-full gap-4'>
                            <div className='flex justify-end w-full gap-8 text-end'>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Wins</h6>
                                <span className='text-xl font-bold'>{forwardRating?.wins || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Losses</h6>
                                <span className='text-xl font-bold'>{forwardRating?.losses || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Scores</h6>
                                <span className='text-xl font-bold'>{forwardRating?.scores || 0}</span>
                              </div>
                              <div className='flex flex-col'>
                                <h6 className='text-xs text-white/40'>Assists</h6>
                                <span className='text-xl font-bold'>{forwardRating?.assists || 0}</span>
                              </div>
                            </div>
                            <CharacterStatsModal
                              rating={forwardRating}
                              username={pilot.username}
                              mastery={character}
                              role='Forward'
                              ratings={[...dataCharacters.getPlayer.characterRatings]
                                .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
                                .filter((rating) => rating.character === character.characterAssetName && rating.role === 'Forward' && rating.gamemode === gamemode)
                              }
                            >
                              <div className='flex items-center justify-center h-10 rounded-lg cursor-pointer text-white/60 aspect-square bg-secondary hover:bg-accent hover:text-secondary'>
                                <ChartPieSlice size={22} weight='light' />
                              </div>
                            </CharacterStatsModal>
                          </div>
                        </div>

                        <hr className='w-11/12 mx-auto my-4 border border-dashed border-secondary' />
                      </>
                    })}
                </div>
            </>}
          </div>
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

    return {
      props: {
        pilot: {
          games: latestPilotRating.games,
          wins: latestPilotRating.wins,
          goals: calculateTotalGoals(query.data.ensurePlayer, 'RankedInitial'),
          assists: calculateTotalAssists(query.data.ensurePlayer, 'RankedInitial'),
          knockouts: calculateTotalKnockouts(query.data.ensurePlayer, 'RankedInitial'),
          saves: calculateTotalSaves(query.data.ensurePlayer, 'RankedInitial'),
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
          roleRatio: calculateGoalieForwardPercentage(query?.data?.ensurePlayer, 'RankedInitial') || {
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
