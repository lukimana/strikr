import GeneralLayout from '@/components/layout/General'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import HeroSection from '@/components/section/Hero'
import AwakeningsRotationSection from '@/components/section/AwakeningRotation'
import EsportsSection from '@/components/section/Esports'


export default function Home() {
  return (
    <GeneralLayout>
      <HeroSection />
      <div className='mt-10'>
        <AwakeningsRotationSection />
      </div>
      <EsportsSection />
    </GeneralLayout>
  )
}
