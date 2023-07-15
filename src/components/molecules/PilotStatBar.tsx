'use client'

import StatCounter from '@/atoms/StatCounter'
import { ArrowsClockwise } from '@/atoms/PhosphorIcon'
// import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export interface PilotStatBarProps {
  gamemode: string
  games: number
  wins: number
  losses: number
  scores: number
  assists: number
  knockouts: number
  mvp: number
  saves: number
  showGameMode?: boolean
}

export default function PilotStatBar({ gamemode, games, wins, losses, scores, assists, knockouts, mvp, saves, showGameMode = true }: PilotStatBarProps) {
  // const t = useTranslations('translation')
  // const tg = useTranslations('game')
  const router = useRouter()

  const winrate = (wins/(wins+losses)*100)
  return <div className='grid 2xl:justify-end 2xl:flex 2xl:flex-wrap grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-11 gap-y-2 gap-x-4 xl:gap-y-4 xl:gap-12 w-full'>
    {showGameMode && (
      <div className='flex flex-col text-end justify-end w-full 2xl:w-min 2xl:whitespace-nowrap bg-secondary border border-secondary-border xl:border-none xl:bg-transparent h-full p-4 xl:p-0 rounded-lg'>
        <div className='flex gap-2 text-end justify-end items-end'>
          <span 
            className='text-xl font-semibold'
          >
            {gamemode === 'RankedInitial' ? 'Ranked' : 'Normal'}
          </span>
          <button
            className='p-1 rounded-lg bg-secondary border border-secondary-border hover:bg-accent hover:text-primary-500 duration-200'
            onClick={() => {
              const queryParams = new URLSearchParams(window.location.search)
              queryParams.set('gamemode', gamemode === 'NormalInitial' ? 'RankedInitial' : 'NormalInitial')
              const newUrl = `${window.location.pathname}?${queryParams.toString()}`
          
              router.push(newUrl)
            }}
          >
            <ArrowsClockwise />
          </button>
        </div>
      <span className='text-xs text-subtle'>Gamemode</span>
      </div>
    )}
    <StatCounter
      label={'Games'}
      value={games}
    />
    <StatCounter
      label={'Wins'}
      value={wins}
    />
    <StatCounter
      label={'Losses'}
      value={losses}
    />
    <StatCounter
      label={'Winrate'}
      value={`${winrate.toFixed(1)}%`}
      valueClassName={winrate > 49.9 ? 'text-win' : 'text-loss'}
    />
    <StatCounter
      label={'Scores'}
      value={scores}
    />
    <StatCounter
      label={'Assists'}
      value={assists}
    />
    <StatCounter
      label={'Saves'}
      value={saves}
    />
    <StatCounter
      label={'Knockouts'}
      value={knockouts}
    />
    <StatCounter
      label={'Times MVP'}
      value={mvp}
    />
  </div>
}