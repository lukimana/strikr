import { RocketLaunch } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'
import PilotSearchInput from '../atoms/PilotSearchInput'
import PilotSearchForm from './PilotSearchForm'

type Inputs = {
  pilotname?: string
}

const HeroSection: React.FunctionComponent = () => {
  const router = useRouter()
  
  const { scrollYProgress } = useScroll({
    offset: ['10%', 'start']
  })
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    router.push(`/pilot/${data.pilotname}`)
  }

  return <section 
    className='relative flex flex-col gap-8 px-6 pt-40 pb-10 sm:pb-20 lg:px-20'
  >
    {/* BG Image */}
    <div 
      className='bg-center bg-cover bg-no-repeat bg-[url(/i/misc/ui_splash.png)] absolute inset-0 w-full h-full z-[0] opacity-20' 
    />
    {/* SHADE CURTAIN */}
    <div
      className='absolute inset-0 w-full h-full bg-gradient-to-t from-primary z-[2]'
    />
    {/* CONTENT */}
    <motion.div 
      className='w-full h-full flex flex-col z-[3] gap-8'
      initial={{
        opacity: 1,
        pointerEvents: 'auto'
      }}
      style={{
        opacity: scrollYProgress
      }}
    >
      <h1 className='font-bold sm:text-3xl'>Search for pilot statistics & track progress</h1>
      <PilotSearchForm
        onSubmit={onSubmit}
        inputSize='lg'
      />
    </motion.div>
  </section>
}

export default HeroSection
