import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import NavbarLink from '../atoms/NavbarLink'
import { AnimatePresence, motion } from 'framer-motion'
import PilotSearchInput from '../atoms/PilotSearchInput'

type Inputs = { 
  pilotname?: string
}

export const navbarLinksList = [
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

const Navbar: React.FC<{ showSearch?: boolean }> = ({ showSearch }) => {
  const formMethods = useForm()
  const router = useRouter()

  const onSubmit = (data: Inputs) => {
    router.push(`/pilot/${data.pilotname}`)
  }

  return (
    <nav
      className={clsx({
        'fixed z-50 flex items-center w-full md:w-[calc(100%-4rem)] lg:w-[calc(100%-10rem)] py-2 mt-0 md:mt-8 duration-200 rounded-lg min-h-[4rem] justify-center md:justify-start': true,
        'bg-primary/20 backdrop-blur-md xl:backdrop mx-0 md:mx-8 lg:mx-20 px-2 lg:px-4': showSearch,
        'bg-transparent md:mx-4 lg:mx-20 px-0': !showSearch,
      })}
    >
      <div className='flex items-center gap-4'>
        {/* LEFT SIDE */}
        <NavbarLink
          href='/'
          isActive={false}
          className='hidden opacity-40 lg:block'
        >
          <img src='/i/misc/logo.svg' alt='Strikr logo' draggable={false} />
        </NavbarLink>
        {/* MIDDLE */}
        <div className='flex items-center'>
          <AnimatePresence>
            <FormProvider {...formMethods}>
              <motion.form
                initial={{
                  pointerEvents: 'none',
                  opacity: 0,
                  width: 0,
                }}
                animate={{
                  pointerEvents: showSearch ? 'auto' : 'none',
                  opacity: showSearch ? 1 : 0,
                  width: showSearch ? 'auto' : 0,
                }}
                exit={{
                  pointerEvents: 'none',
                  opacity: 0,
                  width: 0,
                  transition: {
                    delay: 0.3,
                  },
                }}
                transition={{
                  bounce: false,
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className='w-full hidden md:mr-4 md:block'
                onSubmit={formMethods.handleSubmit(onSubmit)}
              >
                  <PilotSearchInput 
                    maxLength={26} 
                    name='pilotname' 
                    placeholder='Search pilot by name' 
                  />
              </motion.form>
            </FormProvider>
          </AnimatePresence>
          <div className='flex gap-8 md:gap-6'>
            {navbarLinksList.map((item) => (
              <NavbarLink 
                key={`nav.item.${item.name}`} 
                href={item.href} 
                isActive={router.asPath === item.href}
              >
                {item.name}
              </NavbarLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar