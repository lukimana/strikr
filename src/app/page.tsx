import rotationAwakenings from '@/core/relations/objects/awakeningRotation'
import awakeningFormer from '@/core/relations/objects/awakeningFormer'
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
        <div className='bg-support text-xs text-subtle p-4 rounded-lg'>
          <span className='font-semibold text-sm'>We are back!<br /></span>
          - You can find out more information about why and how in the FAQ down below. <br />
          - The site is still stuck in time just after the release of Finii! New Emoticons are still being added!<br />
          - If you know TypeScript and/or NextJS and want to help with the resurrection of Strikr, please get in touch!<br />
        </div>
        <ContentBlock
          title='All Current Awakenings'
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
          title='All Former Awakenings'
        >
          {null}
          <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 2xl:grid-cols-16 gap-4'>
              {awakeningFormer.map((awakening) => {
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
          title={'Tournaments'}
          Icon={<Trophy className='text-subtle' weight='fill' size={24} />}
        >
          <></>
          <span className='text-subtle text-xs'>
            More events soon™️
          </span>
        </ContentBlock>
      </div>
    </main>
    <Footer />
  </>
}
