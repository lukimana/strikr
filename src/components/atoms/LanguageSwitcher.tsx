'use client'

import { Translate } from '@phosphor-icons/react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
// import setLanguage from 'next-translate/setLanguage'


const languageRelation = {
  'en': {
    name: 'English',
    emoji: '🇬🇧'
  },
  'ja': {
    name: '日本語',
    emoji: '🇯🇵'
  },
  'zh': {
    name: '中文',
    emoji: '🇨🇳'
  },
  'ko': {
    name: '한국어',
    emoji: '🇰🇷'
  },
  'fr': {
    name: 'Français',
    emoji: '🇫🇷'
  },
  'de': {
    name: 'Deutsch',
    emoji: '🇩🇪'
  },
  'pt': {
    name: 'Português',
    emoji: '🇧🇷'
  }
}

export default function LanguageSwitcher() {
  return   <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <div className='text-subtle w-10 aspect-square p-2'>
        <Translate className='w-full h-full' />
      </div>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content 
        className='flex p-1 flex-col min-w-[150px] bg-support border-support-border rounded-lg gap-1 z-[99]'
        collisionPadding={16}
      >
        {/* {activeLanguage} */}
        <DropdownMenu.Label />
        {/* {locales.map( (language) => {
          const relationalLanguage = languageRelation?.[language as keyof typeof languageRelation]

          return <div 
            className='cursor-pointer'
            onClick={async () => {}}
            key={language}
          >
            <DropdownMenu.Item
            className='px-3 py-1 rounded-lg hover:bg-accent hover:text-primary-500 hover:border-tertiary-border select-none outline-none cursor-pointer gap-2 flex'
          > 
              {relationalLanguage && (
                <span>{relationalLanguage.emoji}</span>
              )}
              <span>{relationalLanguage?.name || language}</span>
          </DropdownMenu.Item>
          </div>
        })} */}

        <DropdownMenu.Arrow className='stroke-support fill-support' />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
}