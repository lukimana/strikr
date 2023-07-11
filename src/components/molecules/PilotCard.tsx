'use client'

import Emoticon from '@/atoms/Emoticon'
import BadgePill from '@/atoms/BadgePill'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Image from 'next/image'
import { TitleLookup } from '@/core/relations/objects/titles'
import OverlayMenu from '../atoms/OverlayMenu'

export interface PilotCardProps {
  username: string,
  title: string,
  emoticon: string,
  badges?: {
    name: string,
    args?: Record<string, string>
  }[]
  masteryLevel?: number
  currentMasteryXp?: number
  nextMasteryXp?: number
  tags?: {
    verified?: boolean
    staff?: boolean
  }
}

export default function PilotCard({ username, title, emoticon, badges, masteryLevel, currentMasteryXp, nextMasteryXp, tags }: PilotCardProps) {
  return <div 
    className='w-full p-4 rounded-lg bg-secondary border border-secondary-border flex gap-6 relative'
  >
    <div className='relative w-min h-min'>
      <div className='absolute w-[6.2rem] h-[6.2rem] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <div className='w-[6.2rem] h-[6.2rem] overflow-hidden relative rounded-lg'>
          <div className='w-36 h-36 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 '>
            <CircularProgressbar 
              value={~~((currentMasteryXp || 1)/(nextMasteryXp || 1)*100)}
              strokeWidth={30}
              styles={buildStyles({
                backgroundColor: 'rgba(0,0,0,0)',
                pathColor: 'rgba(181,146,255,1)',
                pathTransitionDuration: 0.3,
              })}
            />
          </div>
        </div>
      </div>
      <div
        className=' bg-accent rounded-lg left-1/2 -translate-x-1/2 z-[0] top-1/2 -translate-y-1/2'
      />
      <Emoticon
        id={emoticon}
        bg='support'
        size='2xl'
        className='z-[1]'
      />
      { masteryLevel && (
        <div
          className='absolute -bottom-3 z-[1] left-1/2 -translate-x-1/2 rounded-lg text-xs bg-accent px-2 py-0.5 text-primary-500 font-semibold'
        >
          {masteryLevel}
        </div>
      )}
    </div>
    <div className='flex flex-col w-full gap-4'>
      <div>
        <h3 className='font-semibold text-2xl flex items-center gap-2'>
          {decodeURI(username)}
          { Boolean(tags?.staff) && <Image src='https://static.strikr.gg/file/Strikr/misc/staff.png' className="w-6 h-6" alt='ody' width={32} height={32} /> }
          { Boolean(tags?.verified) &&  <Image src='https://static.strikr.gg/file/Strikr/misc/verified.png' className="w-7 h-7" alt='creator' width={32} height={32} /> }
        </h3>
        <span className='text-subtle'>{TitleLookup[title as keyof typeof TitleLookup]?.en || 'No title'}</span>
      </div>
      <div className='flex gap-2 flex-wrap'>
        {badges && badges.map( badge => {
          return <BadgePill 
            key={`${username}-${badge.name}`}
            content={badge.name}
            className='!text-xs'
          />
        })}
      </div>
    </div>
    <div className='absolute right-2 top-2 hidden xl:flex w-10 h-10'>
      <OverlayMenu name={username} />
    </div>
  </div>
}