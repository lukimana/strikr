import { getCharacterById } from '@/core/utils/parsing'
import clsx from 'clsx'

interface ICharacterPortraitProps {
  size:  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid'
  color: 'primary' | 'secondary' | 'tertiary' | 'secondary-darker' | 'accent'
  characterId: string
  className?: string
  showName?: boolean
  onClick?: () => void
}

const CharacterPortrait: React.FunctionComponent<ICharacterPortraitProps> = ({ size, color, characterId, onClick, className, showName = true }) => {

  const character = getCharacterById(characterId)

  const classes = clsx(className, {
    'rounded-lg overflow-hidden group duration-300': true,
    'bg-primary hover:bg-secondary': color === 'primary',
    'bg-secondary hover:bg-tertiary': color === 'secondary',
    'bg-tertiary hover:bg-primary': color === 'tertiary',
    'bg-accent hover:bg-primary': color === 'accent',
    'bg-secondary-darker hover:bg-secondary': color === 'secondary-darker',  
  })
  
  return <div 
    onClick={onClick}
  >
    <div
      className={classes}
    >
      <div
        className={clsx({
          'rounded-lg bg-contain bg-center group-hover:scale-110 duration-700': true,
          'w-16 h-16': size === 'xs',
          'w-24 h-24': size === 'sm',
          'w-32 h-32': size === 'md',
          'w-40 h-40': size === 'lg',
          'w-48 h-48': size === 'xl',
          'w-56 h-56': size === '2xl',
          'w-full aspect-square': size === 'fluid',
          'cursor-pointer': !!onClick
        })}
        style={{
          backgroundImage: `url('${character?.portrait}')`
        }}
      />
    </div>
    {showName && <span className='text-xs duration-300 text-white/60 group-hover:text-white'>{character?.name}</span>}
  </div>
}

export default CharacterPortrait
