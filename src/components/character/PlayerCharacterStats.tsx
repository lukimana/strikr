import { getCharacterById } from '@/core/utils/parsing'
import { ArrowElbowLeft, CaretLeft } from '@phosphor-icons/react'
import clsx from 'clsx'
import CharacterPortrait from './CharacterPortrait'
import ChartLayout from '../layout/Chart'
import RatingHistoryChart from '../charts/RatingHistory'
import dayjs from 'dayjs'
import PlayStyleChart from '../charts/Playstyle'

interface IPlayerCharacterStatsProps {
  mastery: STRIKR.API.PlayerCharacterMasteryItemObjectType
  goalieRating: STRIKR.API.PlayerCharacterRatingObjectType[]
  forwardRating: STRIKR.API.PlayerCharacterRatingObjectType[]
  username: string
  onBack?: () => void
}

const PlayerCharacterStats: React.FunctionComponent<IPlayerCharacterStatsProps> = ({
  goalieRating,
  forwardRating,
  username,
  onBack,
  mastery
}) => {
  
  const charRelation = getCharacterById(mastery.characterAssetName)
  const defaultRating = { assists: 0, character: mastery.characterAssetName, createdAt: new Date(), games: 0, scores: 0, saves: 0, losses: 0, wins: 0, knockouts: 0 }
  const goalieRatingObj = goalieRating?.length > 0 && goalieRating[0] || defaultRating
  const forwardRatingObj = forwardRating?.length > 0 && forwardRating[0] || defaultRating
  console.log(goalieRatingObj, forwardRatingObj)
  return <div
    className='flex flex-col w-full gap-8 md:gap-4'
  >
    <div className='flex items-center justify-end w-full md:justify-start'>
      <button 
        className='flex items-center w-full gap-4 px-4 py-6 duration-300 rounded-lg bg-secondary-darker hover:bg-accent hover:text-primary text-white/60'
        onClick={onBack}
      >
        <CaretLeft size={24} /> Return to selection
      </button>
    </div>
    <div className='flex flex-col w-full gap-4 p-4 overflow-hidden rounded-lg lg:items-center lg:flex-row bg-secondary-darker'>
      <div className='flex w-full gap-4'>
        <CharacterPortrait 
          characterId={mastery.characterAssetName}
          color='tertiary'
          size='xs'
          showName={false}
        />
        <div className='flex flex-col'>
          <h2 className='text-2xl font-semibold'>{username}&apos;s {charRelation?.name}</h2>
          <span className='text-sm text-white/60 whitespace-nowrap'>{}</span>
        </div>
      </div>
      <div className='flex items-center justify-start w-full gap-8 lg:justify-end'>
        <div className='flex flex-col'>
          <h6 className='text-xs text-white/40'>Games</h6>
          <span className='text-xl font-bold'>{goalieRatingObj.games + forwardRatingObj.games}</span>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-xs text-white/40'>Winrate</h6>
          <span className='text-xl font-bold'>{((goalieRatingObj.wins + forwardRatingObj.wins) / (goalieRatingObj.games + forwardRatingObj.games) * 100).toFixed(2)}</span>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-xs text-white/40'>Wins</h6>
          <span className='text-xl font-bold'>{goalieRatingObj.wins + forwardRatingObj.wins}</span>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-xs text-white/40'>Losses</h6>
          <span className='text-xl font-bold'>{goalieRatingObj.losses + forwardRatingObj.losses}</span>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-xs text-white/40'>Assists</h6>
          <span className='text-xl font-bold'>{goalieRatingObj.assists + forwardRatingObj.assists}</span>
        </div>
      </div>
    </div>
    <div className='flex flex-col w-full gap-2 lg:flex-row'>
      <div className='w-full lg:w-1/2 '>
        <div 
          className='flex items-center justify-center w-full px-4 py-2 font-semibold text-white rounded-t-lg'
          style={{
            backgroundColor: 'rgba(240, 84, 79,0.4)'
          }}
        >
          🦐 Forward
        </div>
        <div 
          className='flex flex-col w-full gap-6 px-4 py-6 rounded-b-lg'
          style={{
            backgroundColor: 'rgba(240, 84, 79,0.1)'
          }}
        >
          <div className='flex items-center justify-center w-full gap-8 py-4'>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Games</h6>
              <span className='text-xl font-bold'>{forwardRatingObj.games}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Winrate</h6>
              <span className='text-xl font-bold'>{((forwardRatingObj.wins) / (forwardRatingObj.games) * 100).toFixed(2)}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Wins</h6>
              <span className='text-xl font-bold'>{forwardRatingObj.wins}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Losses</h6>
              <span className='text-xl font-bold'>{forwardRatingObj.losses}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Assists</h6>
              <span className='text-xl font-bold'>{forwardRatingObj.assists}</span>
            </div>
          </div>
          <ChartLayout
            title='Performance Over Time'
            subtitle=''
          >
            <RatingHistoryChart 
              data={[...forwardRating].sort((a,b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()).map( rating => rating.wins)}
              labels={[...forwardRating].sort((a,b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()).map( rating => dayjs(rating.createdAt).format('MM/DD/YY @ HH:mm A'))}
            />
          </ChartLayout>
          <ChartLayout
            title='Playstyle'
            subtitle=''
          >
            <PlayStyleChart
              forward={{
                assists: forwardRatingObj.assists,
                scores: forwardRatingObj.scores,
                knockouts: forwardRatingObj.knockouts,
                saves: forwardRatingObj.saves,
              }}
            />
          </ChartLayout>
        </div>
      </div>
      <div className='w-full lg:w-1/2'>
        <div 
          className='flex items-center justify-center w-full px-4 py-2 font-semibold text-white rounded-t-lg'
          style={{
            backgroundColor: 'rgba(191, 182, 252,0.4)'
          }}
        >
          🥅 Goalie
        </div>
        <div           
          className='flex flex-col w-full gap-6 px-4 py-6 rounded-b-lg'
          style={{
            backgroundColor: 'rgba(191, 182, 252,0.1)'
          }}>
        <div className='flex items-center justify-center w-full gap-8 py-4'>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Games</h6>
              <span className='text-xl font-bold'>{goalieRatingObj.games}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Winrate</h6>
              <span className='text-xl font-bold'>{((goalieRatingObj.wins || 0) / (goalieRatingObj.games || 1) * 100).toFixed(2)}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Wins</h6>
              <span className='text-xl font-bold'>{goalieRatingObj.wins}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Losses</h6>
              <span className='text-xl font-bold'>{goalieRatingObj.losses}</span>
            </div>
            <div className='flex flex-col'>
              <h6 className='text-xs text-white/40'>Assists</h6>
              <span className='text-xl font-bold'>{goalieRatingObj.assists}</span>
            </div>
          </div>
          <ChartLayout
            title='Performance Over Time'
            subtitle=''
          >
            <RatingHistoryChart 
              data={[...goalieRating].sort((a,b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()).map( rating => rating.wins)}
              labels={[...goalieRating].sort((a,b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()).map( rating => dayjs(rating.createdAt).format('MM/DD/YY @ HH:mm A'))}
            />
          </ChartLayout>
          <ChartLayout
            title='Playstyle'
            subtitle=''
          >
            <PlayStyleChart
              goalie={{
                assists: goalieRatingObj.assists,
                scores: goalieRatingObj.scores,
                knockouts: goalieRatingObj.knockouts,
                saves: goalieRatingObj.saves,
              }}
            />
          </ChartLayout>
        </div>
      </div>
    </div>
  </div>
}

export default PlayerCharacterStats
