import { FormProvider, useForm } from 'react-hook-form'
import { RocketLaunch } from '@phosphor-icons/react'

import Input from '../atoms/PilotSearchInput'
import Button from '../atoms/Button'
import { useState } from 'react'
import clsx from 'clsx'

type Inputs = {
  pilotname?: string
}

type SearchFormProps = {
  onSubmit: (data: Inputs) => void
  inputSize?: 'sm' | 'md' | 'lg'
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, inputSize = 'md' }) => {
  const methods = useForm()
  const [isfocused, setFocused] = useState(false)

  return (
    <FormProvider {...methods}>
      <form 
        className="flex w-full gap-4" 
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Input 
          maxLength={26}
          name="pilotname"
          placeholder="ex: Sonii"
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => {
            setFocused(false)
          }}
          size={inputSize}
        />

        <Button
          type='submit'
          background='blur'
          backgroundHoverColor='none'
          textColor='accent'
          textHovercolor='accent'
          className={clsx(
            'focus:ring-0 focus:outline-none h-16 aspect-square !p-0',
            {
              '!bg-[#2F3331]/80': isfocused,
            }
          )}
        >
          <RocketLaunch 
            size={24} 
            weight="duotone"
          />
        </Button>
      </form>
    </FormProvider>
  )
}

export default SearchForm