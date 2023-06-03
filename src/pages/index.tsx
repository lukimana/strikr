import GeneralLayout from '@/components/layout/General'
import HeroSection from '@/components/section/Hero'
import AwakeningsRotationSection from '@/components/section/AwakeningRotation'
import EsportsSection from '@/components/section/Esports'
import Head from 'next/head'

export default function Home() {
  return <>
    <Head>
      <title>Strikr</title>
      <meta name="description" content="OS Statistics & community hub." />
    </Head>
    <GeneralLayout>
      <HeroSection />
      <AwakeningsRotationSection />
      <EsportsSection />
    </GeneralLayout>
  </>
}
