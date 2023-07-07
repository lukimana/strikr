'use client'

import clsx from 'clsx'
import * as Popover from '@radix-ui/react-popover'
import { getAwakeningFromdata } from '@/core/relations/resolver'
import Image from 'next/image'
import { parseStrikrMarkup } from '@/core/parserUtils'

import '@/styles/markup.scss'
import useHoverDelay from '@/core/hooks/useHoverDelay'
import { useRef, useState } from 'react'

export interface AwakeningProps {
  id: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'fluid';
  bg?: 'transparent' | 'support' | 'secondary' | 'accent';
  showName?: boolean;
  interactive?: boolean;
}

export function AwakeningIcon({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'w-8 h-8 bg-[url(/i/misc/awakening_icon.svg)] bg-center bg-no-repeat bg-contain',
        className
      )}
    />
  )
}

export default function Awakening({
  id,
  size = 'md',
  bg = 'secondary',
  showName,
  interactive
}: AwakeningProps) {
  const awakeningObject = getAwakeningFromdata(id)
  // const t = useTranslations('awakening')
  const awakeningRef = useRef<any>(null)
  const isHovered= useHoverDelay(200, awakeningRef)
  const [wasTapped, setTapped] = useState(false)

  if (!awakeningObject) { return <>
  </>}

  return (
      <Popover.Root
        open={isHovered || wasTapped}
      >
        <Popover.Trigger 
          ref={awakeningRef}
          onClick={() => setTapped(!wasTapped)}
          asChild
        >
          <div
            
            className={clsx('flex flex-col gap-1', {
              'w-8': size === 'sm',
              'w-12': size === 'md',
              'w-16': size === 'lg',
              'w-20': size === 'xl',
              'w-24': size === '2xl',
              'w-32': size === '3xl',
              'w-full': size === 'fluid',
            })}
          >
            <div
              className={clsx(
                'bg-contain bg-no-repeat bg-center rounded-lg bg-support p-2',
                {
                  'w-8 h-8': size === 'sm',
                  'w-12 h-12': size === 'md',
                  'w-16 h-16': size === 'lg',
                  'w-20 h-20': size === 'xl',
                  'w-24 h-24': size === '2xl',
                  'w-32 h-32': size === '3xl',
                  'w-full aspect-square': size === 'fluid',
                  'bg-support': bg === 'support',
                  'bg-secondary': bg === 'secondary',
                  'bg-accent': bg === 'accent',
                  'bg-transparent': bg === 'transparent',
                  'cursor-help hover:bg-accent duration-200': interactive,
                  '!bg-accent': wasTapped
                }
              )}
            >
              <Image 
                src={awakeningObject.image || ''} 
                alt={`${awakeningObject.id}`}
                width={256}
                height={256}
              />
            </div>

            {showName && (
              <span className={clsx('text-subtle text-xs')}>
                {awakeningObject?.name.en}
              </span>
            )}
          </div>
        </Popover.Trigger>
        {interactive && (
          <Popover.Portal>
            <Popover.Content 
              sideOffset={8} 
              className='outline-none' 
              data-side='top'
              onInteractOutside={() => setTapped(false)}
            >
              <div className='flex rounded-lg bg-support border border-support-border p-4 gap-4'>
                <picture>
                  <Image
                    src={awakeningObject?.image || 'default'}
                    alt={awakeningObject?.name.en || 'Awakening'}
                    width={256}
                    height={256}
                    className='w-16 h-16'
                  />
                </picture>
                <div className='flex flex-col max-w-[300px] justify-center'>
                  <h4 className='font-semibold'>{awakeningObject?.name.en}</h4>
                  <p className='text-xs whitespace-pre-line' dangerouslySetInnerHTML={{ __html: parseStrikrMarkup(awakeningObject?.description.en || '') }} />
                </div>
              </div>
              <Popover.Arrow className='fill-support-border stroke-support-border' />
            </Popover.Content>
          </Popover.Portal>
        )}
      </Popover.Root>
  )
}


