import { useState } from "react"
import CharacterCard from "./CharacterCard"
import { CharacterModal } from "../organisms/CharacterModal"

export interface CharacterBoardProps {
  latestCharacterRatings: Map<string, STRIKR.API.PlayerCharacterRatingObjectType>
  characterMasteries: STRIKR.API.PlayerCharacterMasteryItemObjectType[]
}

export default function CharacterBoard({ latestCharacterRatings, characterMasteries }: CharacterBoardProps) {
  return <div className='flex flex-col w-full bg-secondar bordery border-secondary-border rounded-lg gap-6'>
    <div className='flex w-full gap-4'>
      <div className='flex rounded-lg px-4 py-2 font-semibold text-primary-500 bg-forward w-10 md:w-14 whitespace-nowrap items-center justify-center'>
        <div className='-rotate-90'>
          🦐 Forward
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-4 w-full'>
        {Array.from(latestCharacterRatings).sort( (a, b) => a[1].games > b[1].games ? -1 : 1).map((char) => {
          const character = char[1]
          if (character.role !== 'Forward') return null

          return <CharacterModal
          key={character.character+character.role}
          characterData={character}
          characterMastery={characterMasteries}
        >
          <CharacterCard
            key={'card'+character.character+character.role}
            id = {character.character}
            losses={character.losses}
            wins={character.wins}
          />
        </CharacterModal>
        })}
      </div>
    </div>
    <div className='flex w-full gap-4'>
      <div className='flex rounded-lg font-semibold text-primary-500 bg-goalie w-10 md:w-14 whitespace-nowrap items-center justify-center'>
        <div className='-rotate-90'>
        🥅 Goalie
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-2 2xl:grid-cols-4 gap-4 w-full'>
        {Array.from(latestCharacterRatings).sort( (a, b) => a[1].games > b[1].games ? -1 : 1).map((char) => {
          const character = char[1]
          if (character.role !== 'Goalie') return null

          return <CharacterModal
            key={character.character+character.role}
            characterData={character}
            characterMastery={characterMasteries}
          >
            <CharacterCard
              key={'card'+character.character+character.role}
              id = {character.character}
              losses={character.losses}
              wins={character.wins}
            />
          </CharacterModal>
        })}
      </div>
    </div>
  </div>
}