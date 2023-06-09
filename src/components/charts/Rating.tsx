import { RankObject, getRegionLocale } from '@/core/relations/resolver'
import { useRef } from 'react'

interface IRatingChartProps {
  color: string
  rank?: number
  rating: number
  wins: number
  losses: number
  elo: RankObject
  games: number
  region: string
}

const RatingChart: React.FunctionComponent<IRatingChartProps> = ({ color, elo, rank, games, rating, wins, losses, region}) => {
  const pilotWinrate = useRef( (wins / games * 100).toFixed(2) )

  return <div 
  className='relative flex items-center justify-between w-full h-24 overflow-hidden rounded-lg bg-secondary'
>
  <div 
    className='absolute inset-0 w-full h-full bg-center bg-no-repeat bg-contain opacity-20 z-[0]'
    style={{
      backgroundColor: color
    }}
  />
  <div className='relative flex w-1/2 h-full z-[1] px-2 md:px-4 items-center gap-4 whitespace-nowrap'>
    <div
      className='w-12 h-12 bg-center bg-no-repeat bg-contain md:w-16 md:h-16 aspect-square'
      style={{
        backgroundImage: `url('${elo.image}')`
      }}
    />
    <div className='flex flex-col'>
      <h6 
        className='text-xl font-bold'
        style={{
          color: color
        }}
      >
        {elo.name}
      </h6>
      <span className='text-xs text-white/60'>{rating} LP {rank && `@ top ${(rank/10000 * 100).toFixed()}`}%</span>
      <p className='flex gap-1.5 text-xs uppercase text-white/60'>
        <span>{wins}W</span>
        <span>{losses}L</span>
        <span className={`font-semibold ${parseInt(pilotWinrate.current) >= 50 ? 'text-win' : 'text-loss'}`}>{pilotWinrate.current}%</span>
      </p>
    </div>
  </div>
  <hr className='border border-subtle/40 h-2/6 z-[1] hidden 2xl:block' />
  <div className='w-1/2 z-[1] flex md:hidden flex-col items-end justify-center text-end pr-4 2xl:flex'>
        <span className='text-lg font-bold text-white'>#{rank}</span>
        <span className='text-sm text-white/60'>{getRegionLocale(region)?.en}</span>
  </div>
</div>
}

export default RatingChart
