import { getRankFromLP } from '@/core/relations/resolver'
import Rank from '../atoms/Rank'
import { parseStrikrMarkup } from '@/core/parserUtils'
import '@/styles/markup.scss'

export interface RankCardProps {
  rating: number
  rank: number
  wins: number
  losses: number
  region: string
}

export default async function RankCard({ rating, rank, wins, losses, region }: RankCardProps) {
  const rankData = getRankFromLP(rating)
  const winrate = (wins/(wins+losses) * 100).toFixed(1)

  const regionTable = {
    'NorthAmerica': 'North America',
    'Europe': 'Europe',
    'Asia': 'Asia',
    'SouthAmerica': 'South America',
    'Oceania': 'Oceania',
    'JapaneseTextLanguage': 'Japan'
  }

  return <div className='flex w-full rounded-lg border bg-secondary border-secondary-border overflow-hidden relative p-4'>
    <div
      className='absolute inset-0 w-full h-full opacity-20 z-[0]'
      style={{
        backgroundColor: rankData.rankObject.color
      }}
    />

    <div 
      className='flex w-1/2 items-center gap-1 z-[1]'
    >
      <Rank
        rating={rating}
        size='xl'
      />
      <div className='flex flex-col text-semibold'>
        <h3 
          className='font-bold text-2xl mb-2'
          style={{
            color: rankData.rankObject.color
          }}
        >
          {rankData.rankObject.name}
        </h3>
        <span className='text-white/80 text-sm'>
          {rating} LP (top {(rank / 1000).toFixed(1)}%)
        </span>
        <span 
          className='text-white/80 text-sm'
          dangerouslySetInnerHTML={{
            __html: parseStrikrMarkup(`${wins}W ${losses}L ${parseFloat(winrate) > 49.9 ? `{win:(${parseFloat(winrate).toFixed(2)})}` : `{loss:${parseFloat(winrate).toFixed(2)}}`}`)
          }}
        />
      </div>
    </div>
    <div 
      className='flex w-1/2 flex-col items-end justify-center text-end z-[1]'
    >
      <h3 className='font-semibold text-2xl mb-2'> #{rank} </h3>
      <span className='text-subtle'> {regionTable[region as keyof typeof regionTable] || 'Global'} </span>
    </div>
  </div>
}