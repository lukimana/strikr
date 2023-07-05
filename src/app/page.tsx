import rotationAwakenings from '@/core/relations/objects/awakeningRotation'
import Awakening from '@/components/atoms/Awakening'
import Hero from '@/components/molecules/Hero'
import ContentBlock from '@/templates/ContentBlock'
import Image from 'next/image'
import { Trophy } from '@/components/atoms/PhosphorIcon'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero
        title='Search for pilot statistics & track your progress'
        searchPlaceholder='e.g. Sonii'
      />
      <div className='flex flex-col px-4 gap-4'>
        <div className='bg-secondary text-xs text-subtle p-4 rounded-lg'>
          This is version of Strikr has been written from the ground up. Please have some patience while we are rolling the previous & future features one by one.<br />
          I hope to make this a better experience for everyone & allow creators to better utilize our API&apos;s.<br /><br />
          💖 Thx for you support.
        </div>
        <ContentBlock
          title='Awakening Rotation'
        >
          {null}
          <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 2xl:grid-cols-16 gap-4'>
              {rotationAwakenings.map((awakening) => {
                return <Awakening
                  key={`${awakening}`}
                  id={awakening}
                  size='fluid'
                  interactive
                />
              })}
            </div>
        </ContentBlock>
        <ContentBlock
          title={'eSports'}
          Icon={<Trophy className='text-subtle' weight='fill' size={24} />}
        >
          <></>
          <span className='text-subtle text-xs'>
            More E-Sports events soon™️
          </span>
        </ContentBlock>
      </div>
    </main>
  )
}
