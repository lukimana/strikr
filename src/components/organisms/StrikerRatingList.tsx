import { getLatestCharacterMasterySamples } from '@/core/statistics/math'
import StrikerRatingCard from '@/molecules/StrikerRatingCard'
import clsx from 'clsx'

interface StrikerRatingListProps {
  dataCharacters: {
    getPlayer: {
      characterMastery: STRIKR.API.PlayerCharacterMasteryObjectType;
      characterRatings: STRIKR.API.PlayerCharacterRatingObjectType[];
    }
  },
  role: 'Forward' | 'Goalie'
  gamemode: string;
  selectCharacter: (characterId: string) => void;
}

const StrikerRatingList: React.FC<StrikerRatingListProps> = ({
  dataCharacters,
  gamemode,
  selectCharacter,
  role
}) => {

  const roleCharacters = Array.from(getLatestCharacterMasterySamples(dataCharacters?.getPlayer.characterRatings, gamemode))
    .filter((m) => {
      const [, rating] = m
      return rating.role === role
    })
    .sort((a, b) => b[1].games - a[1].games)

  return (
    <div className={clsx(
        'w-1/2 rounded-lg flex flex-col pb-4', {
        'bg-forward/5': role === 'Forward',
        'bg-goalie/5': role === 'Goalie'
      })
    }>
      <div className={clsx(
        'p-2 text-center w-full bg-forward/40 rounded-t-lg', {
        'bg-forward/40': role === 'Forward',
        'bg-goalie/40': role === 'Goalie'
        }
      )}>
        <span className='font-semibold text-lg'>
          { role === 'Forward' ? '🦐 Forward' : '🥅 Goalie' }
        </span>
      </div>
      <div className='w-full px-2 pt-2 grid grid-cols-2 gap-2'>
        {roleCharacters.map((m) => {
          const [, rating] = m
          return <StrikerRatingCard 
            key={`character.${rating.character}.overall.${role}`}
            rating={rating}
            selectCharacter={selectCharacter} 
          />
        })}
      </div>
    </div>
  )
}

export default StrikerRatingList
