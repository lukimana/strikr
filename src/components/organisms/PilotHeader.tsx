import { getCharacterById } from '@/core/utils/parsing'
import PilotCard from '../charts/PilotCard'
import { getTitleLocale } from '@/core/relations/objects/titles'
import { title } from 'process'
import PilotLifetimeStats from '../molecules/PilotLifetimeStats'
import { calculateAverageRatingPerDay } from '@/core/utils/statistics'

interface PilotHeaderProps {
  emoticonId: string
  tags: string[]
  username: string
  titleId: string
  mainRole: '🥅 Goalie' | '🦐 Forward' | '✨ Flex'
  mainCharacter: string
  wins: number
  losses: number
  scores: number
  games: number
  assists: number
  knockouts: number
  gamemode: string
  averageRatingPerDay: number
  lastUpdate: string
}

const PilotHeader: React.FC<PilotHeaderProps> = ({
  emoticonId,
  tags,
  username,
  titleId,
  mainRole,
  mainCharacter,
  losses,
  wins,
  scores,
  games,
  assists,
  knockouts,
  averageRatingPerDay,
  lastUpdate
}) => {
  const character = getCharacterById(mainCharacter)

  return <div className='w-full flex flex-col xl:flex-row gap-4 lg:gap-6 items-center'>
    <div className='w-full xl:w-1/3 flex'>
      <PilotCard
        emoticonId={emoticonId}
        tags={tags}
        username={username}
        titleId={getTitleLocale(titleId, 'en')}
        mainRole={mainRole}
        mainCharacter={character?.name || 'Omega Strikers'}
      />
    </div>
    <div className='w-full xl:w-2/3 flex'>
      <PilotLifetimeStats
        assists={assists || 0}
        games={games || 0 }
        losses={losses || 0 }
        scores={scores || 0}
        wins={wins || 0 }
        knockouts={knockouts || 0}
        averageRatingPerDay={averageRatingPerDay}
        createdAt={lastUpdate}
      />
    </div>
  </div>
}

export default PilotHeader
