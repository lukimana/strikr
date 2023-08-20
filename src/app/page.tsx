import rotationAwakenings from '@/core/relations/objects/awakeningRotation'
import Awakening from '@/components/atoms/Awakening'
import Hero from '@/components/molecules/Hero'
import ContentBlock from '@/templates/ContentBlock'
import Image from 'next/image'
import { Trophy } from '@/components/atoms/PhosphorIcon'
import Navbar from '@/components/molecules/Navbar'
import Footer from '@/components/molecules/Footer'

export default function Home() {
  return <>
    <Navbar />
    <main className="flex min-h-screen flex-col">
      <Hero
        title='Search for pilot statistics & track your progress'
        searchPlaceholder='e.g. Sonii'
      />
      <div className='flex flex-col px-4 gap-4'>
        <div className='bg-secondary text-xs text-subtle p-4 rounded-lg'>
          Updates:<br />
          Pilot Page should be easier on low-end hardware now.<br />
          Any endpoint using Strikr Smart Cache is now available to everyone without limits. [ For proxy endpoints (those will query the game directly) you must have a valid JWT token.]
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
    <Footer />
  </>
}
