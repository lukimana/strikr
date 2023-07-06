import Character from '@/atoms/Character'
import { getcharacterFromDevName } from '@/core/relations/resolver'
import clsx from 'clsx'

export interface CharacterCardProps {
  id: string
  wins: number
  losses: number
  onClick?: () => void
}

export default async function CharacterCard({ id, wins, losses, onClick }: CharacterCardProps) {
  const character = getcharacterFromDevName(id)
  const winrate = (wins/(wins+losses)*100)

  return <div className={clsx('w-full p-2 bg-support flex flex-col md:flex-row gap-2 md:gap-4 rounded-lg overflow-hidden', {
    'cursor-pointer hover:bg-support-border duration-200 select-none': !!onClick,
    'pointer-events-none': !onClick,
  })}>
    <Character
      background='accent'
      size='lg'
      id={id}
    />
    <div className='flex-col gap-0.5 hidden md:flex'>
      <h6 className='font-semibold text-xl'>{character.name}</h6>
      <p className='text-xs flex gap-1 font-semibold'>
        <span>{wins}W</span>
        <span>{losses}L</span>
        <span className={clsx('whitespace-nowrap',{
          'text-win': winrate > 50,
          'text-loss': winrate < 50,
          'text-yellow-200': winrate === 50,
        })}>({winrate.toFixed(1)}%)</span>
      </p>
      <p className='text-sm md:text-xs gap-1 flex'>
        <span className='whitespace-nowrap text-subtle'>Total: {wins + losses} Games</span>
      </p>
    </div>
    <div className='flex-wrap gap-0.5 flex-row md:hidden'>
      <p className='text-xs flex-col flex white whitespace-nowrap'>
          <span className='text-base font-semibold'>{character.name}</span>
          <span className='text-white/80'>{wins + losses} Games</span>
          <span className={clsx({
            'text-win': winrate > 50,
            'text-loss': winrate < 50,
            'text-yellow-200': winrate === 50,
          })}>{isNaN(winrate) ? '0' : winrate.toFixed()}% WR</span>
        </p>
    </div>
  </div>
}