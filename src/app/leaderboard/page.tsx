import Emoticon from '@/components/atoms/Emoticon'
import { getClient } from '@/core/apolloclient'
import { gql } from '@apollo/client'
import { ListNumbers, Person, User } from '@/atoms/PhosphorIcon'
import { useRouter } from 'next/navigation'
import LeaderboardTable from '@/components/templates/LeaderboardTable'

export type PlayerItem = {
  createdAt: string
  emoticonId: string
  losses: number
  wins: number
  username: string
  rank: number
  rating: number
  region: string
  tags: string[]
}

export interface LeaderboardPageProps {
  searchParams: {
    page: number
    region: string
    filter: string
    sort: 'asc' | 'desc'
    startrank: number
  }
}

export const dynamic = 'force-dynamic',
  revalidate = 0

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  const { data } = await getClient().query<{
    getLeaderboard: {
      players: PlayerItem[],
      total: number
    }
  }>({
    query: gql`
    query($page: Int!, $region: String!, $filterBy: leaderboardFilters, $order: String!, $startrank: Int) {
      getLeaderboard(page: $page, limit: 50, region: $region, filterBy: $filterBy, order: $order, startrank: $startrank) {
        players {
          createdAt
          emoticonId
          losses
          wins
          username
          rank
          rating
          region
          socialUrl
          playerId
          tags
        }
        total
      }
    }
    `,
    variables: {
      region: searchParams.region || 'Global',
      page: Number(searchParams.page || 0),
      filterBy: searchParams.filter || 'rank',
      order: searchParams.sort || 'asc',
      startrank: Number(searchParams.startrank)
    },
  })
  
  return (
    <main className='px-4 flex flex-col relative min-h-screen py-20'>
      <LeaderboardTable
        players={data.getLeaderboard.players}
        total={data.getLeaderboard.total}
      />

    </main>
  )
}
