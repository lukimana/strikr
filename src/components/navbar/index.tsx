import Link from 'next/link'
import clsx from 'clsx'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

const links = [
  { 
    name: 'Home',
    href: '/'
  },
  {
    name: 'Guides',
    href: '/guides'
  },
  {
    name: 'Strikers',
    href: '/characters'
  },
  {
    name: 'Leaderboards',
    href: '/leaderboards'
  },
  // {
  //   name: 'Download',
  //   href: '/download'
  // }
]

type Inputs = {
  pilotname?: string
}

const Navbar: React.FunctionComponent<{showSearch?: boolean}> = ({ showSearch }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const router = useRouter()

  const onSubmit = (data: Inputs) => { router.push(`/pilot/${data.pilotname}`) }
  
  return <nav 
    className={clsx({
      'fixed z-50 flex items-center justify-between w-[calc(100%-10rem)] py-2 mt-8 duration-200 rounded-lg': true,
      'bg-primary/20 backdrop-blur-md mx-20 px-4': showSearch,
      'bg-transparent mx-20': !showSearch
    })}
  >
    {/* LEFT SIDE */}
    <div className='flex items-center gap-4'>
      <Link href='/'><img className='opacity-40' src='/i/misc/logo.svg' alt='Strikr logo' draggable={false}/></Link>
      <div className='flex items-center gap-6'>
        <AnimatePresence>
          <motion.form
            initial={{
              pointerEvents: 'none',
              opacity: 0,
              width: 0
            }}
            animate={{
              pointerEvents: showSearch ? 'auto' : 'none',
              opacity: showSearch ? 1 : 0,
              width: showSearch ? 'auto' : 0
            }}
            exit={{
              pointerEvents: 'none',
              opacity: 0,
              width: 0,
              transition: {
                delay: 0.2
              }
            }}
            transition={{
              bounce: true,
              duration: 0.2,
              ease: 'easeInOut'
            }}
            className='flex w-full'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input 
              type='text' 
              placeholder='Search pilot by name' 
              {...register('pilotname', {required: true, maxLength: 80})}
              className='w-full px-6 py-4 text-sm text-white rounded-lg bg-[#2F3331]/50 focus:ring-0 focus:outline-none focus:bg-[#2F3331]/80 duration-200 focus:font-medium peer placeholder:text-subtle/60'
              
            />
          </motion.form>
        </AnimatePresence>
        {links.map( item => {
          return <Link 
            href={item.href} 
            key={`nav.item.${item.name}`}
            className={clsx({
              'font-normal opacity-60 hover:opacity-100 duration-200 hover:text-accent': true,
              '!font-bold !opacity-100': router.asPath === item.href
            })}
          >
            {item.name}
          </Link>
        })}
      </div>
    </div>
  </nav>
}

export default Navbar
