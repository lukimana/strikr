'use client'

import clsx from 'clsx'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'


export interface ISearchInputProps {
  className?: string
  placeholder?: string
  value?: string
  onFocus?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
}

export default function SearchInput({ className, placeholder, value, onFocus, size = 'sm', register, registerOptions }: ISearchInputProps) {
  return <div className='relative w-full'>
    <input 
      className={clsx(
        'w-full text-white ring-0 focus:outline-none peer placeholder:text-subtle bg-support border border-support-border rounded-lg focus:border-accent duration-200 focus:bg-tertiary',
        {
          'text-sm pl-11 pr-4 py-2': size === 'sm',
          'text-base pl-12 pr-6 py-4': size === 'md',
          'text-lg pl-[3.4rem] pr-6 py-4': size === 'lg',
          'text-xl px-8 py-4': size === 'xl',
        }, 
        className
      )}
      type='text'
      placeholder={placeholder || 'Search'}
      defaultValue={value}
      onFocus={onFocus}
      autoComplete='off'
      {...register('pilotname', registerOptions)}
    >
    </input>
    <MagnifyingGlass className={clsx(
      'absolute top-1/2 -translate-y-1/2 text-subtle peer-focus:text-white duration-200',
      {
        'left-4 w-4 h-4': size === 'sm',
        'left-4 w-5 h-5': size === 'md',
        'left-4 w-6 h-6': size === 'lg',
      }
    )
    }/>
  </div>
}