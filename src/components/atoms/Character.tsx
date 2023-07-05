import { getcharacterFromDevName } from '@/core/relations/resolver'
import clsx from 'clsx'
import Image from 'next/image'

export interface CharacterProps {
  id: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl',
  background: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'transparent'
  className?: string
}

export default function Character({ id, background = 'transparent', size = 'md', className }: CharacterProps) {
  const characterData = getcharacterFromDevName(id)

  return <div 
    className={clsx(
      'flex rounded-lg bg-center bg-contain relative overflow-hidden',
      {
        'bg-transparent': background === 'transparent',
        'bg-primary-500': background === 'primary',
        'bg-secondary': background === 'secondary',
        'bg-tertiary': background === 'tertiary',
        'bg-accent': background === 'accent',
        'w-8 h-8 min-w-[2rem] min-h-[2rem]': size === 'sm',
        'w-12 h-12 min-w-[3rem] min-h-[3rem]': size === 'md',
        'w-16 h-16 min-w-[4rem] min-h-[4rem]': size === 'lg',
        'w-20 h-20 min-w-[5rem] min-h-[5rem]': size === 'xl',
        'w-24 h-24 min-w-[6rem] min-h-[6rem]': size === '2xl',
        'w-32 h-32 min-w-[8rem] min-h-[8rem]': size === '3xl',
      },
      className
    )}
  >
    <Image width={128} height={128} src={characterData?.portrait || ''} alt={characterData?.name || 'Character portrait'} className='w-full h-full' />
  </div>
}