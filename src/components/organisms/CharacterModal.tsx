'use client'

import { getcharacterFromDevName } from '@/core/relations/resolver'
import { Calculator, Globe, Graph, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import Character from '../atoms/Character'
import PilotStatBar from '../molecules/PilotStatBar'
import ContentBlock from '../templates/ContentBlock'
import PlaystyleChart from '../atoms/PlaystyleChart'
import { calculatePresence } from '@/core/mathUtils'

export interface CharacterModalProps {
  children: React.ReactNode
  characterData: STRIKR.API.PlayerCharacterRatingObjectType
  characterMastery: STRIKR.API.PlayerCharacterMasteryItemObjectType[]
}

export function CharacterModal({ children, characterData, characterMastery }: CharacterModalProps) {
  const charRelation = getcharacterFromDevName(characterData.character)
  const chracterMastery = characterMastery.find( (m) => m.characterAssetName === characterData.character)
  const characterStats = {
    assists: characterData.assists,
    knockouts: characterData.knockouts,
    saves: characterData.saves,
    scores: characterData.scores,
    mvp: characterData.mvp,
  }

  return <Dialog.Root>
  <Dialog.Trigger asChild>
    {children}
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="bg-primary-500/80 backdrop-blur-sm fixed inset-0 z-[98]" />
    <Dialog.Content className="fixed w-[90vw] h-[80vh] top-1/2 left-1/2 z-[99] focus:outline-none -translate-x-1/2 -translate-y-1/2">
      <div className='w-full h-full rounded-lg border bg-secondary border-secondary-border px-4 pb-4 relative gap-4 flex flex-col overflow-y-scroll overflow-x-visible'>
        <div className='flex flex-col xl:flex-row w-full gap-4 items-center xl:sticky top-0 bg-secondary py-4 border-b border-dashed border-subtle/10'>
          <Dialog.Title className='font-semibold flex items-center gap-4'>
            <Character id={characterData.character} background='accent' size='lg' />
            <div className='flex flex-col'>
              <span className='font-semibold text-4xl'>
                {charRelation?.name}
              </span>
              <span className='text-subtle text-xs'>{characterData.role === 'Forward' ? '🦐': '🥅'} {characterData.role}</span>
            </div>
          </Dialog.Title>
          <PilotStatBar
              showGameMode={false}
              assists={characterStats.assists}
              games={characterData.games}
              gamemode={characterData.gamemode}
              knockouts={characterStats.knockouts}
              losses={characterData.losses}
              mvp={characterStats.mvp}
              saves={characterStats.saves}
              scores={characterStats.scores}
              wins={characterData.wins}
              key={characterData.character}
            />
        </div>
        {chracterMastery && (
          <div className='flex flex-col xl:flex-row gap-4'>
            <div className='flex gap-1.5 flex-col w-full rounded-b-lg bg-secondary-darker py-4'>
              <div className='flex items-center justify-between w-full'>
                <span className='text-white/60'>Affinity Tier</span>
                <span className='text-lg font-semibold'>{chracterMastery.currentTier}</span>
              </div>
              <div className='flex items-center justify-between w-full'>
                <span className='text-white/60'>Current XP</span>
                <span className='text-lg font-semibold'>{chracterMastery.currentTierXp} <small className='text-sm text-white/60'>/ {chracterMastery.xpToNextTier + chracterMastery.currentTierXp} xp</small></span>
              </div>
            </div>
          </div>
        )}
        <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
          <ContentBlock
            title='Playstyle'
            subtitle='Raw values based on this character for this role'
            Icon={<Graph size={24} className='text-subtle' weight='fill' />}
          >
            {null}
            <PlaystyleChart
              forward={characterData.role === 'Forward' ? characterStats : undefined}
              goalie={characterData.role === 'Goalie' ? characterStats : undefined}
            />
          </ContentBlock>
          <ContentBlock
            title='Averages'
            subtitle='Calculated averages based on this character for this role'
            Icon={<Calculator size={24} className='text-subtle' weight='fill' />}
          >
            {null}
            <div className='flex flex-col xl:flex-row gap-4'>
              <div className='flex gap-1.5 flex-col w-full rounded-b-lg bg-secondary-darker py-4'>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60'>K.O&apos;s Per Match</span>
                  <span className='text-lg font-semibold'>{(characterStats.knockouts / characterData.games).toFixed(1)}<small className='text-sm text-white/60'>/match</small></span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60'>Scores Per Match</span>
                  <span className='text-lg font-semibold'>{(characterStats.scores / characterData.games).toFixed(1)}<small className='text-sm text-white/60'>/match</small></span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60'>Assists Per Match</span>
                  <span className='text-lg font-semibold'>{(characterStats.assists / characterData.games).toFixed(1)}<small className='text-sm text-white/60'>/match</small></span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60'>Saves Per Match</span>
                  <span className='text-lg font-semibold'>{(characterStats.saves / characterData.games).toFixed(1)}<small className='text-sm text-white/60'>/match</small></span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60'>MVP&apos;s Per Match</span>
                  <span className='text-lg font-semibold'>{(characterStats.mvp / characterData.games).toFixed(1)}<small className='text-sm text-white/60'>/match</small></span>
                </div>
                <div className='flex items-center justify-between w-full'>
                  <span className='text-white/60 flex flex-col'>
                    <i>Presence Significance</i>
                    <small className='text-xs font-subtle'>Player presence impact to match win</small>
                  </span>
                  <span className='text-lg font-semibold'>{calculatePresence(
                    characterData.role,
                    characterData.knockouts,
                    characterData.assists,
                    characterData.scores,
                    characterData.saves,
                    characterData.wins,
                    characterData.losses
                  ).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </ContentBlock>
          <ContentBlock
            title='World comparison'
            subtitle='Performance compared to the rest of the world with same character & role'
            Icon={<Globe size={24} className='text-subtle' weight='fill' />}
          >
            {null}
            <small className='text-xs'>Character leaderboard not accessible yet (coming soon™️)</small>
          </ContentBlock>
        </div>
      </div>
      <Dialog.Close className='absolute -right-4 -top-4 !outline-none !ring-0 focus-within:outline-none focus:outline-none peer-focus:outline-none group-focus:outline-none rounded-full bg-support border border-support-border w-8 aspect-square flex items-center justify-center hover:bg-loss duration-200 group'>
        <X className='w-4 h-4 pointer-events-none group-hover:text-secondary text-loss' />
      </Dialog.Close>
      
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

}