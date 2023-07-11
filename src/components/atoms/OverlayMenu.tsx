 'use client'

import { Cards, Copy } from '@/atoms/PhosphorIcon'
import * as Popover from '@radix-ui/react-popover'
import { useEffect, useState } from 'react'
import * as Switch from '@radix-ui/react-switch'
import clsx from 'clsx'

export default function OverlayMenu({ name }: { name: string }) {
  const [url, setUrl] = useState(`https://strikr.gg/pilot/overlay/${name}?showProfileCard=false&showCredit=false`)
  const [copied, setCopied] = useState(false)

  const handleCheckedChange = (checked: boolean, paramName: string) => {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set(paramName, String(checked));
      setUrl(parsedUrl.toString());
    } catch (error) {
      console.error('Error parsing URL:', error);
    }
  }

  useEffect(()=>{
    if (!copied) { return }

    const timeout = setTimeout(() => {
      setCopied(false)
    }
    , 1500)

    return () => clearTimeout(timeout)
  }, [copied])

  return <Popover.Root>
    <Popover.Trigger asChild>
      <div 
        className='flex items-center justify-center w-10 h-10 rounded-lg bg-support border border-support-border text-subtle  cursor-pointer hover:bg-accent hover:text-primary-500 duration-200'
      >
        <Cards size={24} />
      </div>
    </Popover.Trigger>
    <Popover.Anchor />
    <Popover.Portal>
      <Popover.Content 
        align='center'
        className='p-2 min-h-100 bg-support border border-support-border rounded-lg shadow-2xl outline-none ring-0 focus:ring-0 focus:outline-none flex flex-col max-w-[400px] gap-6 z-[99]'
      >
        <div className='flex flex-col'>
          <span className='text-subtle'>Stream Overlay Generator</span>
          <span className='text-xs text-subtle'>Use the generated URL on browser source [OBS].<br />Adjust the source width to your liking, the overlay is responsive.</span>
        </div>
        <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault() } }>
          <div className="flex items-center w-full justify-between" style={{ display: 'flex', alignItems: 'center' }}>
            <label className="text-white text-[15px] leading-none pr-[15px]" htmlFor="airplane-mode">
              Show Profile Card
            </label>
            <Switch.Root
              className="w-[42px] h-[25px] bg-tertiary rounded-full relative data-[state=checked]:bg-accent outline-none cursor-default"
              id="airplane-mode"
              onCheckedChange={(checked) => handleCheckedChange(checked, 'showProfileCard')}
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-subtle data-[state=checked]:bg-primary-500 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
          <div className="flex items-center w-full justify-between" style={{ display: 'flex', alignItems: 'center' }}>
            <label className="text-white text-[15px] leading-none pr-[15px]" htmlFor="airplane-mode">
              Show &quot;powered by strikr.gg&quot;
            </label>
            <Switch.Root
              className="w-[42px] h-[25px] bg-tertiary rounded-full relative data-[state=checked]:bg-accent outline-none cursor-default"
              id="airplane-mode"
              onCheckedChange={(checked) => handleCheckedChange(checked, 'showCredit')}
            >
              <Switch.Thumb className="block w-[21px] h-[21px] bg-subtle data-[state=checked]:bg-primary-500 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </div>
        </form>
        <div 
          className='flex gap-2 relative h-10'
        >
          <input
            disabled
            className={clsx(
              'bg-tertiary rounded-lg px-3 flex border border-secondary-border text-subtle text-xs w-full duration-200',
              copied && 'border-win text-win'
            )}
            value={copied ? 'Copied!' : encodeURI(url)}
          />
          <button 
            className='w-12 aspect-square rounded-lg bg-accent hover:bg-secondary hover:text-white duration-200 flex items-center justify-center text-secondary'
            onClick={() => { navigator.clipboard.writeText(encodeURI(url)); setCopied(true)} }
          >
            <Copy size={16} weight='duotone' />
          </button>
        </div>
        <Popover.Arrow className='fill-support-border' />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>

}