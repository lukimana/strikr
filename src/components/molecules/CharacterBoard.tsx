import { useState } from "react"
import CharacterCard from "./CharacterCard"
import { CharacterModal } from "../organisms/CharacterModal"

export interface CharacterBoardProps {
  latestCharacterRatings: {
      character: string;
      games: number;
      wins: number;
      losses: number;
      winrate: number;
      scores: number;
      assists: number;
      saves: number;
      knockouts: number;
      mvp: number;
      createdAt: string;
      role: "forward" | "goalie";
      gamemode: string;
  }[]
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
        {latestCharacterRatings.sort( (a, b) => a.games > b.games ? -1 : 1).map((char) => {
          if (char.role !== 'forward') return null
          return <CharacterModal
          key={char.character+char.role}
          characterData={char}
          characterMastery={characterMasteries}
        >
          <CharacterCard
            key={'card'+char.character+char.role}
            id = {char.character}
            losses={char.losses}
            wins={char.wins}
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
        {latestCharacterRatings.sort( (a, b) => a.games > b.games ? -1 : 1).map((char) => {
          if (char.role !== 'goalie') return null
          return <CharacterModal
            key={char.character+char.role}
            characterData={char}
            characterMastery={characterMasteries}
          >
            <CharacterCard
              key={'card'+char.character+char.role}
              id = {char.character}
              losses={char.losses}
              wins={char.wins}
            />
          </CharacterModal>
        })}
      </div>
    </div>
  </div>
}