import { getEmoticonFromdata } from '@/core/relations/resolver'
import { getTitleLocale } from '@/core/relations/titles'
import { getCharacterById } from '@/core/utils/parsing'

interface IPilotProps {
  emoticonId?: string
  tags: string[]
  username: string
  titleId?: string
  mainRole: '🦐 Forward' | '🥅 Goalie' | '✨ Flex'
  mainCharacter: string
}

const PilotCard: React.FunctionComponent<IPilotProps> = ({ emoticonId, tags, username, titleId, mainRole, mainCharacter}) => {
  return <div className='flex w-full gap-4'>
  <picture className='w-24 h-24 p-3 rounded-lg md:w-32 md:h-32 bg-secondary'>
    <img src={`${getEmoticonFromdata(emoticonId || 'default').image}`} alt='Emoticon' />
  </picture>
  <div className='flex flex-col gap-1.5'>
    <h1 className='flex items-center gap-1.5 text-3xl font-bold'>
      {username}
      {tags?.includes('STAFF') && <div className='w-6 h-6 bg-center bg-contain bg-no-repeat bg-[url(/i/misc/staff.png)]' /> }
      {tags?.includes('verified') && <div className='w-8 h-8 bg-center bg-contain bg-no-repeat bg-[url(/i/misc/verified.png)]' /> }
    </h1>
    <ul className='flex gap-1.5 items-center mb-1.5'>
      <li className='px-2 py-1 text-xs rounded-lg bg-secondary-darker text-white/60 '>{mainRole} Player</li>
      <li className='px-2 py-1 text-xs rounded-lg bg-secondary-darker text-white/60'>{mainCharacter} Enjoyer</li>
    </ul>
    <h2 className='text-white/60'>{getTitleLocale(titleId || 'default')}</h2>
  </div>
</div>
}

export default PilotCard
