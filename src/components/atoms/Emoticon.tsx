import { getEmoticonFromdata } from '@/core/relations/resolver'
import clsx from 'clsx'
import Image from 'next/image'

export interface EmoticonProps {
  id: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl',
  bg?: 'transparent' | 'support' | 'secondary' | 'accent'
  className?: string
}

export default function Emoticon({ id, size = 'md', bg = 'secondary', className }: EmoticonProps) {
  const emoticonObject = getEmoticonFromdata(id)

  return <div
    className={clsx(
      className,
      'bg-contain bg-no-repeat bg-center rounded-lg relative overflow-hidden',
      {
        'w-8 h-8': size === 'sm',
        'w-12 h-12': size === 'md',
        'w-16 h-16': size === 'lg',
        'w-20 h-20': size === 'xl',
        'w-24 h-24': size === '2xl',
        'w-32 h-32': size === '3xl',
        'bg-support': bg === 'support',
        'bg-secondary': bg === 'secondary',
        'bg-accent': bg === 'accent',
        'bg-transparent': bg === 'transparent',
      }
    )}
  >
    <Image src={emoticonObject?.image || ''} alt={emoticonObject?.id} width={128} height={128} className='w-full h-full' />
  </div>
}