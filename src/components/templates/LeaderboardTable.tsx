'use client'

import { PlayerItem } from '@/app/leaderboard/page'
import {
  CaretDown,
  ChartLineUp,
  Check,
  GlobeHemisphereEast,
  HeartBreak,
  LinkBreak,
  ListNumbers,
  Trophy,
  User,
  UserFocus,
} from '@phosphor-icons/react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import Emoticon from '../atoms/Emoticon'
import Image from 'next/image'
import { getRankFromLP } from '@/core/relations/resolver'
import Rank from '../atoms/Rank'
import { useRouter } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Pagination } from '../atoms/Pagination';
import * as Select from '@radix-ui/react-select'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export default function LeaderboardTable({
  players,
}: {
  players: PlayerItem[]
}) {
  const [timeUntilUpdate, setTimeUntilUpdate] = useState('in 6 hours')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(()=>{
    const originalTime = players[0].createdAt
    const timeUntil  = `${dayjs(originalTime).add(6, 'hours').fromNow()}`

    const interval = setInterval(() => {
      setTimeUntilUpdate(timeUntil)
    }, 1000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTimeUntilUpdate])

  const region = searchParams.get('region') || 'Global'
  const filter = searchParams.get('filter') || 'rank'
  const sort = searchParams.get('sort') || 'desc'
  const page = searchParams.get('page') || '0'

  return (
    <div className='relative flex flex-col gap-6 select-none'>
      <div className='flex gap-4 items-center justify-between'>
        <Select.Root onValueChange={(value)=>{
          const urlParams = new URLSearchParams(
            window.location.search
          )
          urlParams.set('region', value)
          window.location.search = urlParams.toString()
        }}>
          <Select.Trigger asChild>
            <div className='p-2 px-6 flex items-center gap-2 bg-secondary border border-secondary-border w-min whitespace-nowrap rounded-lg shadow-md cursor-pointer hover:bg-accent/60 duration-200'>
              <Select.Value placeholder={region === 'Global' ? 'Change Region' : region} />
              <Select.Icon className='text-subtle'>
                <CaretDown size={16} />
              </Select.Icon>
            </div>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className='overflow-hidden bg-support' position='popper'>
              <Select.ScrollUpButton />
              <Select.Viewport className='p-2'>
                <SelectItem value='Global'> Global </SelectItem>
                <SelectItem value='NorthAmerica'> North America </SelectItem>
                <SelectItem value='SouthAmerica'> South America </SelectItem>
                <SelectItem value='Europe'> Europe </SelectItem>
                <SelectItem value='Asia'> Asia </SelectItem>
                <SelectItem value='Oceania'> Oceania </SelectItem>
                <SelectItem value='JapaneseLanguageText'> Japan </SelectItem>
              </Select.Viewport>
              <Select.ScrollDownButton />
              <Select.Arrow />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <h1 className='font-semibold text-3xl flex flex-col items-end'>
          Next leaderboard update {timeUntilUpdate}
          <span className='text-xs text-subtle'>({dayjs(players[0]?.createdAt || 0).add(6, 'hours').format('lll')})</span>
        </h1>
      </div>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left'>
          <thead className='text-subtle bg-support border border-support-border'>
            <tr>
              {/* RANK */}
              <th
                scope='col'
                className={clsx('px-6 py-6', {
                  'font-semibold text-white':
                    filter === 'rank',
                })}
              >
                <div
                  className='flex items-center'
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search
                    )
                      console.log(urlParams.get('filter'), searchParams.get('sort'))
                    if (urlParams.get('filter') === 'rank') {
                      urlParams.set(
                        'sort',
                        sort === 'desc' ? 'asc' : 'desc'
                      )
                      window.location.search = urlParams.toString()
                    } else {
                      urlParams.set('filter', 'rank')
                      window.location.search = urlParams.toString()
                    }
                  }}
                >
                  <ListNumbers size={16} weight='fill' className='mr-4' /> Rank
                  <svg
                    className='ml-1 w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </div>
              </th>
              {/* REGION */}
              <th scope='col' className='px-6 py-6'>
                <div className='flex gap-2 items-center'>
                  <GlobeHemisphereEast size={16} weight='duotone' /> Region
                </div>
              </th>
              {/* PROFILE */}
              <th scope='col' className='px-6 py-6 w-min'>
                <div className='flex gap-2 items-center'>
                  <UserFocus size={16} weight='fill' /> Profile
                </div>
              </th>
              {/* RATING */}
              <th
                scope='col'
                className={clsx('px-6 py-6', {
                  'font-semibold text-white':
                    filter === 'rating',
                })}
              >
                <div
                  className='flex items-center'
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search
                    )

                    if (urlParams.get('filter') === 'rating') {
                      urlParams.set(
                        'sort',
                        searchParams.get('sort') === 'desc' ? 'asc' : 'desc'
                      )
                      window.location.search = urlParams.toString()
                    } else {
                      urlParams.set('filter', 'rating')
                      window.location.search = urlParams.toString()
                    }
                  }}
                >
                  <ChartLineUp size={16} weight='duotone' className='mr-4' />{' '}
                  Rating
                  <svg
                    className='ml-1 w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </div>
              </th>
              {/* WINS */}
              <th scope='col' className='px-6 py-6'>
                <div
                  className='flex items-center'
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search
                    )

                    if (urlParams.get('filter') === 'wins') {
                      urlParams.set(
                        'sort',
                        sort === 'desc' ? 'asc' : 'desc'
                      )
                      window.location.search = urlParams.toString()
                    } else {
                      urlParams.set('filter', 'wins')
                      window.location.search = urlParams.toString()
                    }
                  }}
                >
                  <Trophy size={16} weight='duotone' className='mr-4' /> Wins
                  <svg
                    className='ml-1 w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </div>
              </th>
              {/* LOSSES */}
              <th scope='col' className='px-6 py-6'>
                <div
                  className='flex items-center'
                  onClick={() => {
                    const urlParams = new URLSearchParams(
                      window.location.search
                    )

                    if (urlParams.get('filter') === 'wins') {
                      urlParams.set(
                        'sort',
                        sort === 'desc' ? 'asc' : 'desc'
                      )
                      window.location.search = urlParams.toString()
                    } else {
                      urlParams.set('filter', 'losses')
                      window.location.search = urlParams.toString()
                    }
                  }}
                >
                  <HeartBreak size={16} weight='duotone' className='mr-4' /> Losses
                  <svg
                    className='ml-1 w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map( player => {
              const currentRank = getRankFromLP(player.rating)

              return <tr className='bg-secondary border border-secondary-border' key={`player.${player.rank}.region.${player.region}`}>
              <th
                scope='row'
                className='px-6 py-4 font-medium whitespace-nowrap '
              >
                {player.rank}
              </th>
              <td className='px-6 py-4'>{player.region}</td>
              <td 
                className='px-6 py-4 hover:bg-support duration-200 rounded-lg cursor-pointer'
                onClick={()=>{ router.push(`/pilot/${player.username}`)}}
              >
                <div className='flex gap-4 items-center'>
                  <Emoticon
                    id={player.emoticonId}
                    bg='support'
                    className='p-0.5'
                  />
                  <div className='text-lg font-semibold flex items-center gap-1'>
                    <span>{player.username}</span>
                    { Boolean(player.tags.includes('STAFF')) && <Image 
                      src='https://static.strikr.gg/file/Strikr/misc/staff.png'
                      className="w-6 h-6"
                      alt='ody'
                      width={16}
                      height={16}
                    /> }
                    { Boolean(player.tags?.includes('verified')) &&  <Image 
                      src='https://static.strikr.gg/file/Strikr/misc/verified.png' 
                      className="w-6 h-6" 
                      alt='creator' 
                      width={24} 
                      height={24} 
                    /> }
                  </div>
                </div>
              </td>
              <td className='px-6 py-4'>
                <div 
                  className='flex items-center gap-2'
                  style={{
                    color: currentRank.rankObject.color
                  }}
                >
                  <Rank
                    rating={player.rating}
                    size='sm'
                  />
                  <span>
                    {player.rating} ({currentRank.rankObject.name})
                  </span>
                </div>
              </td>
              <td className='px-6 py-4'>{player.wins}</td>
              <td className='px-6 py-4'>{player.losses}</td>
            </tr>
            })}
          </tbody>
        </table>
        <Pagination 
          totalItems={10000} 
          itemsPerPage={50}     
          currentPage={page ? parseInt(page) : 1}   
        />
      </div>
    </div>
  )
}

interface SelectItemProps {
   children: React.ReactNode
   className?: string
   props?: any 
   value: string
}
const SelectItem = forwardRef(
  (
    { children, className, ...props }: SelectItemProps, 
    forwardedRef
  ) => {
  return (
    <Select.Item
      className={clsx(
        'leading-none px-4 py-4 ring-0 hover:ring-0 outline-none hover:outline-none hover:bg-accent duration-200 rounded-lg cursor-pointer justify-between w-full flex items-center gap-4',
        className
      )}
      {...props}
      //@ts-expect-error
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="inline-flex items-center justify-center">
        <Check size={16} weight='duotone' />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem'
