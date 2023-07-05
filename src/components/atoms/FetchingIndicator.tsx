import Emoticon from '@/atoms/Emoticon'

export interface FetchinIndicatorProps {
  textContent: string
  subTextContent?: string
}

export default async function FetchingIndicator({ textContent, subTextContent }: FetchinIndicatorProps) {
  
  return <div 
    className='fixed top-20 px-4 py-2 rounded-lg shadow-lg bg-tertiary border-support-border left-1/2 -translate-x-1/2 flex items-center gap-4 z-[99] select-none'
  >
    <Emoticon 
      id='EmoticonData_AimiSweat'
      size='md'
      bg='transparent'
    />
    <p className='flex flex-col'>
      <span className='font-semibold text-base'>{textContent}</span>
      {subTextContent && <span className='text-subtle text-xs'>{subTextContent}</span> }
    </p>
  </div>
}