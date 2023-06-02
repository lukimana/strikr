import awakenings from '@/core/relations/awakenings'
import { getAwakeningLocale } from '@/core/relations/resolver'
import { parseStrikrMarkup } from '@/core/utils/parsing'
import * as Tooltip from '@radix-ui/react-tooltip'

interface IFloatingAwakeningTipProps {
  children: React.ReactNode
  id: string
}

const FloatingAwakeningTip: React.FunctionComponent<IFloatingAwakeningTipProps> = ({ children, id }) => {
  return <Tooltip.Provider
  
  >
  <Tooltip.Root
    delayDuration={200}
  >
    <Tooltip.Trigger 
      asChild

    >
          {children}
      </Tooltip.Trigger>
        <Tooltip.Portal className='w-full h-full'>
          <Tooltip.Content
            className='flex w-full p-2 rounded-lg bg-tertiary/90 backdrop-blur-md z-[60] gap-4 items-center'
            sideOffset={8}
          >
            <div className='h-full aspect-square'>
              <div 
                  className='w-16 h-16 bg-center bg-no-repeat bg-contain'
                  style={{
                    backgroundImage: `url('/i/awakening/${id}.png')`
                  }}
                />
            </div>
            <div className='flex flex-col w-64 gap-1.5'>
                  <h4 className='text-lg font-semibold'>{getAwakeningLocale(id)}</h4>
                  <p
                    className='text-xs leading-snug whitespace-pre-wrap'
                    dangerouslySetInnerHTML={{
                      __html: parseStrikrMarkup(awakenings.find(awakening => awakening.id === id)?.description.en || 'No description yet').replaceAll('\n', '<br/>')
                    }}
                  >
                  </p>
            </div>
            <Tooltip.Arrow className="fill-tertiary/60 " />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
}

export default FloatingAwakeningTip
