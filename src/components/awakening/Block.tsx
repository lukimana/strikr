import awakenings from '@/core/relations/objects/awakenings'
import { getAwakeningLocale } from '@/core/relations/resolver'
import { parseStrikrMarkup } from '@/core/utils/parsing'
import * as Tooltip from '@radix-ui/react-tooltip'
import FloatingAwakeningTip from './Floating'
import Image from 'next/image'

interface AwakeninBlockProps {
  id: string
}


const AwakeninBlock: React.FunctionComponent<AwakeninBlockProps> = ({ id }) => {
  return <>
    {
        <FloatingAwakeningTip id={id} key={id}>
          <div className='flex flex-col'>
            <div className='relative flex items-center justify-center w-full p-2 duration-300 rounded-lg aspect-square bg-secondary hover:bg-tertiary cursor-help'>
              <img 
                className='w-full h-full bg-center bg-no-repeat bg-contain'
                src={`/i/awakening/${id}.png`}
                alt={getAwakeningLocale(id)}
                placeholder="blur"
              />
            </div>
            <span className='text-xs font-light opacity-60 mt-1.5'>{getAwakeningLocale(id)}</span>
          </div>
        </FloatingAwakeningTip>
    }
  </>

}

export default AwakeninBlock
