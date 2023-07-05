import clsx from 'clsx'
import Image from 'next/image'

export interface ILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'isotype' | 'full'
}

export default function Logo({ size, type = 'isotype' }: ILogoProps) {
  return <div
    className={clsx({
      'w-8 h-8': size === 'sm' && type === 'isotype',
      'w-12 h-12': size === 'md' && type === 'isotype',
      'w-16 h-16': size === 'lg' && type === 'isotype',
      'w-20 h-20': size === 'xl' && type === 'isotype',
      'h-8 w-28': size === 'sm' && type === 'full',
      'h-12 w-36': size === 'md' && type === 'full',
      'h-16 w-52': size === 'lg' && type === 'full',
      'h-20': size === 'xl' && type === 'full'
    },
      'bg-contain bg-no-repeat bg-center relative'
    )}
  >
    <Image src={type === 'isotype' ? '/i/misc/logo.svg' : '/i/misc/logo_full.svg'} width={80} height={80} alt='logo' className='h-full w-full' />
  </div>
}