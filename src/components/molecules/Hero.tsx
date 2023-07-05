'use client'

import SearchInput from '@/atoms/SearchInput'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
export interface HeroProps {
  title: string
  searchPlaceholder: string
}

interface FormInput {
  pilotname: string
}

export default function Hero({ title, searchPlaceholder }: HeroProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>()
  const router = useRouter()

  const onSubmit = (data: FormInput) => {
    console.log('handle submit', data)
    router.push(`/pilot/${data.pilotname}`)
  }

  return <div 
    className='w-full p-4 -mt-20 h-[40vh] md:h-[50vh] lg:h-[60vh] bg-[url(/i/misc/ui_splash.png)] bg-cover bg-center bg-no-repeat relative flex flex-col py-20 justify-center gap-8'
  >
    <h1 className='text-3xl  xl:text-4xl font-semibold'>{title}</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <SearchInput
        size='lg'
        register={register}
        registerOptions={{
          required: 'This field is required',
        }}
        placeholder={searchPlaceholder}
        className='bg-tertiary/60 backdrop-blur-sm border-secondary-border'
      />
    </form>
  </div>
}