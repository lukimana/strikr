'use client'

import { useEffect, useState } from 'react'
import Logo from '@/atoms/Logo'
import NavbarLink from '@/atoms/NavbarLink'
import SearchInput from '@/atoms/SearchInput'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import path from 'path'

export const NavbarLinkList = [
  {
    name: 'Home',
    href: '/',
    shouldBeActive: (pathname: string) => pathname === '/'
  },
  {
    name: 'Leaderboards',
    href: '/leaderboard',
    shouldBeActive: (pathname: string) => pathname.includes('/leaderboard')
  },
  // {
  //   name: 'Guides',
  //   href: '/guides',
  //   shouldBeActive: (pathname: string) => pathname.includes('/guide')
  // },
  // {
  //   name: 'Strikers',
  //   href: '/strikers',
  //   shouldBeActive: (pathname: string) => pathname.includes('/striker')
  // },
]

interface FormInput {
  pilotname: string
  region: string
}

export default function Navbar() {
  const [showShadow, setShowShadow] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const onSubmit = (data: FormInput) => {
    router.push(`/pilot/${data.pilotname}?region=${data.region}`)
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormInput>()
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
  
      if (!showShadow && scrollY > 30) {
        setShowShadow(true)
      }
      if (showShadow && scrollY < 30) {
        setShowShadow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showShadow])

  return <nav 
    className={clsx(
      'sticky w-full flex items-center p-4 z-[98] top-0 duration-200 h-20',
      {
        'backdrop-blur-md': showShadow
      }
    )}
    >
    <div className='flex w-full lg:w-1/3 gap-4'>
      <Logo
        size='sm'
      />
      <ul className='flex gap-4 items-center'>
        {NavbarLinkList.map(({ name, href, shouldBeActive: shouldBeActive }) => (
          <NavbarLink
            key={`link.${name}`}
            href={href}
            name={name}
            active={ shouldBeActive(pathname) }
          />
        ))}
      </ul>
    </div>
    <div className='hidden px-4 lg:flex w-full xl:w-1/3 gap-8 items-center'>
      { pathname !== '/' && (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <SearchInput
            placeholder='Search pilot by username'
            register={register}
            registerOptions={{
              required: true
            }}
            control={control}
          />
        </form>
      )}
    </div>
    <div className='flex w-min xl:w-1/3 gap-4 justify-end items-center'>
      {/* <LanguageSwitcher /> */}

    </div>
  </nav>
}