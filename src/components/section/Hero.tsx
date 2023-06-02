import { RocketLaunch } from '@phosphor-icons/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { motion, useScroll } from 'framer-motion'
import { useRef } from 'react'

type Inputs = {
  pilotname?: string
}

const HeroSection: React.FunctionComponent = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const router = useRouter()
  
  const { scrollYProgress } = useScroll({
    offset: ['10%', 'start']
  })
  
  const onSubmit: SubmitHandler<Inputs> = data => {
    router.push(`/pilot/${data.pilotname}`)
  }

  return <section 
    className='relative flex flex-col gap-8 px-20 pt-40 pb-28'
  >
    {/* BG Image */}
    <div 
      className='bg-center bg-cover bg-no-repeat bg-[url(/i/misc/T_UI_SPLASH.png)] absolute inset-0 w-full h-full z-[0] opacity-20' 
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
      <h1 className='text-3xl font-bold'>Search for pilot statistics & track progress</h1>
      <form 
        className='flex w-full gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <input 
          type='text' 
          placeholder='ex: Sonii' 
          {...register('pilotname', {required: true, maxLength: 80})}
          className='w-full px-6 py-4 text-xl text-white rounded-lg bg-[#2F3331]/40 backdrop-blur-md focus:ring-0 focus:outline-none focus:bg-[#2F3331]/80 duration-200 focus:font-medium peer placeholder:text-subtle/60'  
          
        />

        <button 
          type='submit'
          className='text-lg h-16 aspect-square items-center justify-center bg-[#2F3331]/40 backdrop-blur-md flex text-accent rounded-lg peer-focus:bg-[#2F3331]/80 duration-200'
        >
          <RocketLaunch 
            size={24}
            weight='duotone'
          />
        </button>
      </form>
    </motion.div>
  </section>
}

export default HeroSection
