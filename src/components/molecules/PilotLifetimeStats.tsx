import PilotStatItem from '@/atoms/PilotStatItem'
import Button from '../atoms/Button'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { useAtom, useAtomValue } from 'jotai'
import { selectedGamemode } from '@/core/stores/pilotSearch'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export type PilotLifetimeStatsProps = {
  games: number
  wins: number
  losses: number
  scores: number
  assists: number
  knockouts: number
  averageRatingPerDay: number
  createdAt: string
}

const PilotLifetimeStats: React.FC<PilotLifetimeStatsProps> = ({ games, wins, losses, scores, assists, knockouts, averageRatingPerDay, createdAt }) => {
  const [gamemode, setGamemode] = useAtom(selectedGamemode)

  return (
    <div className="flex flex-col justify-end items-center w-full gap-4 rounded-lg lg:flex-row">
      <div className="flex items-center justify-between w-full lg:justify-end flex-wrap gap-4 xl:gap-6 2xl:gap-8 ">
        <PilotStatItem title="Gamemode" value={gamemode} />
        <PilotStatItem title="Last update" value={dayjs(createdAt).fromNow(true)} />
        <PilotStatItem title="Winrate" value={`${(wins / games * 100).toFixed(2)}%`} color={(wins / games * 100) > 50 ? 'text-win' : 'text-loss'} />
        <PilotStatItem title="Average Rating Per Day" value={typeof averageRatingPerDay !== 'number' ? '?' : averageRatingPerDay.toFixed(0)} />
        <PilotStatItem title="Games" value={games} />
        <PilotStatItem title="Wins" value={wins} />
        <PilotStatItem title="Losses" value={losses} />
        <PilotStatItem title="Scores" value={scores} />
        <PilotStatItem title="Assists" value={assists} />
        <PilotStatItem title="Knockouts" value={typeof knockouts !== 'number' ? '?' : knockouts} />
      </div>
    </div>
  )
}

export default PilotLifetimeStats