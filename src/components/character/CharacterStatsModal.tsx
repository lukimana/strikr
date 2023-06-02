import { getCharacterById } from '@/core/utils/parsing'
import * as Dialog from '@radix-ui/react-dialog'
import PlayStyleChart from '../charts/Playstyle'
import ChartLayout from '../layout/Chart'
import RatingHistoryChart from '../charts/RatingHistory'
import dayjs from 'dayjs'

interface ICharacterStatsModalProps {
  children: React.ReactNode
  rating?: STRIKR.API.PlayerCharacterRatingObjectType
  username: string
  mastery: STRIKR.API.PlayerCharacterMasteryItemObjectType
  role: 'Goalie' | 'Forward'
  ratings?: STRIKR.API.PlayerCharacterRatingObjectType[]
} 

const CharacterStatsModal: React.FunctionComponent<ICharacterStatsModalProps> = ({children, rating, ratings, username, mastery, role}) => {
  return  <Dialog.Root>
    <Dialog.Trigger asChild>
      {children}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='absolute inset-0 z-[51] w-full h-full bg-primary/40 backdrop-blur-sm'/>
      <Dialog.Content className='p-8 fixed top-[50%] left-[50%] w-[70vw] h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none bg-secondary-darker z-[52] flex flex-col  gap-8 overflow-hidden'>
        <div className='relative flex h-full'>
          <div className='relative flex items-center w-full'>
            <div className='flex flex-col justify-center w-1/2 h-full gap-8 aspect-square'>
              <div>
                <Dialog.Title className='text-2xl font-bold'>
                  {username}&apos;s {role} {getCharacterById(rating?.character || 'default')?.name}
                </Dialog.Title>
                <Dialog.Description className='w-max text-white/60'>
                  Statistics based on this character in the current gamemode.
                </Dialog.Description>
              </div>
              <div 
                className='flex flex-grow w-full h-full bg-center bg-no-repeat bg-contain'
                style={{
                  backgroundImage: `url('${getCharacterById(rating?.character || 'default')?.bodyShot}')`
                }}
              />
            </div>
            <div className='flex flex-col w-1/2 h-full gap-2 overflow-y-auto'>
                <ChartLayout 
                      title='Affinity information'
                      subtitle='Based on the most recent sample'
                >
                  <div className='flex gap-1.5 flex-col w-full'>
                    <div className='flex items-center justify-between w-full'>
                      <span className='text-white/60'>Affinity Tier</span>
                      <span className='text-lg font-semibold'>{mastery.currentTier}</span>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <span className='text-white/60'>Current XP</span>
                      <span className='text-lg font-semibold'>{mastery.currentTierXp} <small className='text-sm text-white/60'>/ {mastery.xpToNextTier + mastery.currentTierXp}</small></span>
                    </div>
                  </div>
                </ChartLayout>
                <ChartLayout
                  title='Performance over time'
                  subtitle='Based on average performance over all samples'
                >
                  <RatingHistoryChart
                    data={ratings?.map( rating => rating.wins / rating.games * 100) || [0, 0, 0]}
                    labels={ratings?.map( rating => dayjs(rating.createdAt).format('DD MMM, HH:MM')) || ['1', '2', '3']}
                  />
                </ChartLayout>
                <ChartLayout 
                  title={'Playstyle'} 
                  subtitle={'Based on the most recent sample'}
                >
                  <PlayStyleChart
                    assists={rating?.assists || 0}
                    gamemode={rating?.gamemode || 'None'}
                    goals={rating?.scores || 0}
                    knockouts={rating?.knockouts || 0}
                    saves={rating?.saves || 0}
                  />

                </ChartLayout>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}

export default CharacterStatsModal
