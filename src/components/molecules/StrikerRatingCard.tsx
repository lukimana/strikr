import { getCharacterById } from '@/core/utils/parsing'
import CharacterPortrait from '@/atoms/CharacterPortrait'
import dayjs from 'dayjs'


interface CharacterCardProps {
  rating: STRIKR.API.PlayerCharacterRatingObjectType;
  selectCharacter: (characterId: string) => void;
}

const ForwardCharacterCard: React.FC<CharacterCardProps> = ({
  rating,
  selectCharacter,
}) => {
  const { character, games, wins } = rating

  return (
    <div
      key={`character.${rating}.overall.forward`}
      className="flex w-full p-2 rounded-lg bg-secondary gap-2 cursor-pointer hover:bg-secondary-darker duration-100"
      onClick={() => {
        selectCharacter(character)
      }}
    >
      <CharacterPortrait characterId={character} color="tertiary" size="xs" showName={false} />
      <div className="flex flex-col h-full justify-between">
        <span className="font-bold">{getCharacterById(character)?.name}</span>
        <div className="flex w-full gap-1.5 text-sm items-center flex-wrap">
          {games} Games <span className="opacity-40 text-xs">@</span>{~~(rating.wins / (rating.wins + rating.losses) * 100)}% WR
        </div>
        <span className='text-xs text-white/20'>{rating.wins}W {rating.losses}L</span>
      </div>
    </div>
  )
}

export default ForwardCharacterCard