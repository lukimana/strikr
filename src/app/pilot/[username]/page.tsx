import { RankIcon } from '@/components/atoms/Rank';
import RatingChart from '@/components/atoms/RatingChart';
import PilotCard from '@/components/molecules/PilotCard';
import RankCard from '@/components/molecules/RankCard';
import ContentBlock from '@/components/templates/ContentBlock';
import { getClient } from '@/core/apolloclient';
import { gql } from '@apollo/client';
import { ChartDonut, Graph, Person, Warning } from '@/atoms/PhosphorIcon';
import { Content } from 'next/font/google';
import RatioChart from '@/components/atoms/RatioChart';
import { calculatePilotProperty, getLatestCharacterMasterySamples } from '@/core/mathUtils';
import PlaystyleChart from '@/components/atoms/PlaystyleChart';
import CharacterCard from '@/components/molecules/CharacterCard';
import PilotStatBar from '@/components/molecules/PilotStatBar';
import { getcharacterFromDevName } from '@/core/relations/resolver';

export default async function Page({
  params: { username },
  searchParams: { gamemode = 'RankedInitial' },
}: {
  params: { username: string }
  searchParams: { gamemode: string }
}) {
  const { data } = await getClient().query<{
    ensurePlayer: STRIKR.API.PlayerObjectType;
  }>({
    query: gql`
      query ($pilotname: String!, $refresh: Boolean) {
        ensurePlayer(name: $pilotname, refresh: $refresh) {
          id
          username
          emoticonId
          titleId
          ratings {
            wins
            losses
            rank
            rating
            games
            masteryLevel
            createdAt
          }
          tags
          characterRatings {
            character
            assists
            knockouts
            wins
            losses
            mvp
            role
            saves
            scores
            gamemode
            games
            createdAt
          }
          mastery {
            currentLevel
            currentLevelXp
            totalXp
            xpToNextLevel
          }
          characterRatings {
            assists
            character
            createdAt
            gamemode
            games
            knockouts
            losses
            id
            mvp
            role
            saves
            scores
            wins
          }
          region
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      pilotname: username,
      refresh: true
    },
    fetchPolicy: 'no-cache'
  });
  const pilotData = data.ensurePlayer
  const gamesAsForward = calculatePilotProperty(pilotData.characterRatings, gamemode, 'games', 'Forward' )
  const gamesAsGoalie = calculatePilotProperty(pilotData.characterRatings, gamemode, 'games', 'Goalie' )
  const forwardRatio = gamesAsForward/ (gamesAsForward + gamesAsGoalie) * 100
  const latestCharacterRatings = getLatestCharacterMasterySamples(pilotData.characterRatings, gamemode)
  const mainCharacter = Array.from(latestCharacterRatings.values()).filter( r => r.gamemode === gamemode).sort( (a, b) => b.games - a.games)[0].character
  const pilotBadges: {
    name: string
  }[] = []

  
  pilotBadges.push({
    name: forwardRatio > 59.9 ? '🦐 Forward' : forwardRatio < 40.1 ? '🥅 Goalie' : '💫 Flex'
  })

  pilotBadges.push({
    name: `${getcharacterFromDevName(mainCharacter).name} Enjoyer`
  })


  return <main className='flex flex-col xl:flex-row min-h-screen w-full h-full gap-8 p-4'>
    <aside className='flex flex-col gap-4 w-full xl:w-1/3'>
      <PilotCard
        emoticon={pilotData.emoticonId || 'default'}
        title={pilotData.titleId || 'default'}
        username={username}
        badges={pilotBadges}
        currentMasteryXp={pilotData.mastery.currentLevelXp}
        masteryLevel={pilotData.mastery.currentLevel}
        nextMasteryXp={pilotData.mastery.xpToNextLevel}
        tags={{
          verified: pilotData.tags.includes('verified'),
          staff: pilotData.tags.includes('STAFF'),
        }}
      />
      <div className='bg-secondary rounded-lg p-2 text-subtle text-xs flex items-center gap-2'>
        <Warning className='w-4 h-4' weight='duotone' /> 
        <p>Due to how data is provided we are limited to showing ranked stats only for the top 10k players of each region.</p>
      </div>
      <RankCard
        losses={pilotData.ratings[0].losses}
        rank={pilotData.ratings[0].rank}
        rating={pilotData.ratings[0].rating}
        region={pilotData.region}
        wins={pilotData.ratings[0].wins}
        key={pilotData.ratings[0].id}
      />
      <ContentBlock
        title='Rating History'
        subtitle='Based in Ranked games'
        Icon={<RankIcon className='!w-6 !h-6' />}
      >
        {null}
        <RatingChart
          data={pilotData.ratings.map((rating) => ({ date: rating.createdAt, rating: rating.rating }))}
        />
      </ContentBlock>
      <ContentBlock
        title='Role Ratio'
        subtitle='Based on currently selected gamemode'
        Icon={<ChartDonut className='text-subtle' size={24} weight='fill' />}
      >
        {null}
        <RatioChart
          data={[
            {
              color: '#F66618',
              label: 'Forward',
              percentile: (gamesAsForward / (gamesAsForward + gamesAsGoalie)) * 100
            },
            {
              color: '#F69E18',
              label: 'Goalie',
              percentile: (gamesAsGoalie / (gamesAsForward + gamesAsGoalie)) * 100
            }
          ]}
        />
      </ContentBlock>
      <ContentBlock
        title='Playstyle'
        subtitle='Geometric average for current gamemoede'
        Icon={<Graph size={24} className='text-subtle' weight='fill' />}
      >
        {null}
        <PlaystyleChart
          forward={{
            assists: calculatePilotProperty(pilotData.characterRatings, gamemode, 'assists', 'Forward'),
            knockouts: calculatePilotProperty(pilotData.characterRatings, gamemode, 'knockouts', 'Forward'),
            saves: calculatePilotProperty(pilotData.characterRatings, gamemode, 'saves', 'Forward'),
            scores: calculatePilotProperty(pilotData.characterRatings, gamemode, 'scores', 'Forward'),
            mvp: calculatePilotProperty(pilotData.characterRatings, gamemode, 'mvp', 'Forward'),
          }}
          goalie={{
            assists: calculatePilotProperty(pilotData.characterRatings, gamemode, 'assists', 'Goalie'),
            knockouts: calculatePilotProperty(pilotData.characterRatings, gamemode, 'knockouts', 'Goalie'),
            saves: calculatePilotProperty(pilotData.characterRatings, gamemode, 'saves', 'Goalie'),
            scores: calculatePilotProperty(pilotData.characterRatings, gamemode, 'scores', 'Goalie'),
            mvp: calculatePilotProperty(pilotData.characterRatings, gamemode, 'mvp', 'Goalie'),
          }}
        />
      </ContentBlock>
    </aside>
    <div className='w-full flex flex-col xl:w-2/3 gap-4'>
      <PilotStatBar
        assists={calculatePilotProperty(pilotData.characterRatings, gamemode, 'assists')}
        knockouts={calculatePilotProperty(pilotData.characterRatings, gamemode, 'knockouts')}
        saves={calculatePilotProperty(pilotData.characterRatings, gamemode, 'saves')}
        scores={calculatePilotProperty(pilotData.characterRatings, gamemode, 'scores')}
        mvp={calculatePilotProperty(pilotData.characterRatings, gamemode, 'mvp')}
        games={calculatePilotProperty(pilotData.characterRatings, gamemode, 'games')}
        gamemode={gamemode}
        losses={calculatePilotProperty(pilotData.characterRatings, gamemode, 'losses')}
        wins={calculatePilotProperty(pilotData.characterRatings, gamemode, 'wins')}
        averageLP={0}
      />
      <ContentBlock
        title='Character Stats'
        subtitle='Based on currently selected gamemode, ordered by most played for each role [CLICK FOR DETAILS]'
        Icon={<Person weight='fill' size={24} className='text-subtle' />}
      >
        {null}
        <div className='flex flex-col w-full bg-secondar bordery border-secondary-border rounded-lg gap-6'>
          <div className='flex w-full gap-4'>
            <div className='flex rounded-lg px-4 py-2 font-semibold text-primary-500 bg-forward w-14 whitespace-nowrap items-center justify-center'>
              <div className='-rotate-90'>
                🦐 Forward
              </div>
            </div>
            <div className='grid grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 gap-4 w-full'>
              {Array.from(latestCharacterRatings.values()).sort( (a, b) => a.games < b.games ? 1 : -1).map((character) => {
                if (character.role !== 'Forward') return null

                return <CharacterCard
                  id={character.character}
                  losses={character.losses}
                  wins={character.wins}
                  key={character.character+character.role}
                />
              })}
            </div>
          </div>
          <div className='flex w-full gap-4'>
            <div className='flex rounded-lg font-semibold text-primary-500 bg-goalie w-14 whitespace-nowrap items-center justify-center'>
              <div className='-rotate-90'>
              🥅 Goalie
              </div>
            </div>
            <div className='grid grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 gap-4 w-full'>
              {Array.from(latestCharacterRatings.values()).sort( (a, b) => a.games < b.games ? 1 : -1).map((character) => {
                if (character.role !== 'Goalie') return null

                return <CharacterCard
                  id={character.character}
                  losses={character.losses}
                  wins={character.wins}
                  key={character.character+character.role}
                  // onClick={() => {}}
                />
              })}
            </div>
          </div>
        </div>
      </ContentBlock>
    </div>
  </main>;
}
