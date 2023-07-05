'use client'

import { ArrowSquareOut, CalendarCheck, Globe, Play, Video, VideoCamera } from '@phosphor-icons/react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export interface EventCardProps {
  title: string
  region: string
  date: string | Date
  coverUrl: string
  streamUrl?: string
  bracketUrl?: string
}

function IconWrapper({ children, text }: { children: React.ReactNode, text: string }) {
  return <div className='flex gap-2 text-subtle items-center'>
    <div className="p-1 rounded-lg bg-secondary-border text-subtle gap-2 w-min">
      {children}
    </div>
    {text}
  </div>
}

export default function EventCard({ title, region, date, coverUrl, streamUrl, bracketUrl}: EventCardProps) {
  return <div className='flex flex-col rounded-lg overflow-hidden w-full'>
    <div 
      className='w-full aspect-video bg-center bg-cover'
      style={{
        backgroundImage: `url('${coverUrl}')`
      }}
    />
    <div className='w-full px-2 py-6 bg-support-border font-semibold justify-between text-xl flex items-center'>
      <h3>{title}</h3>
      { bracketUrl && <a href={bracketUrl}>
        <ArrowSquareOut
          className='text-subtle hover:text-white duration-200'
        />
      </a> }
    </div>
    <div className='w-full px-2 py-4 flex flex-col bg-support gap-2 text-sm'>
        <IconWrapper text={region}> <Globe weight='duotone' /> </IconWrapper>
        <IconWrapper text={dayjs(date).format('ll')}> <CalendarCheck weight='duotone' /> </IconWrapper>
        { streamUrl && <IconWrapper text={streamUrl}> <Play weight='duotone' /> </IconWrapper> }
    </div>
  </div>
}