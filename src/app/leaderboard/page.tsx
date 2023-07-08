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
  }
}

export default async function LeaderboardPage({
  searchParams,
}: LeaderboardPageProps) {
  console.log({
    region: searchParams.region || 'Global',
    page: searchParams.page || 0,
    filterBy: searchParams.filter || 'rank',
    order: 'asc',
  })
  const { data } = await getClient().query<{
    getLeaderboard: PlayerItem[]
  }>({
    query: gql`
    query($page: Int!, $region: String!, $filterBy: leaderboardFilters, $order: String!) {
      getLeaderboard(page: $page, limit: 50, region: $region, filterBy: $filterBy, order: $order) {
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
    }
    `,
    variables: {
      region: searchParams.region || 'Global',
      page: Number(searchParams.page || 0),
      filterBy: searchParams.filter || 'rank',
      order: searchParams.sort || 'asc',
    },
  })
  
  return (
    <main className='px-4 flex flex-col relative min-h-screen py-20'>
      <LeaderboardTable
        players={data.getLeaderboard}
      />

    </main>
  )
}
