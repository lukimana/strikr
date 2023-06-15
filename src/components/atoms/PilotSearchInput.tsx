import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'

interface SearchInputProps {
  name: string;
  placeholder: string;
  maxLength: number;
  onFocus?: () => void
  onBlur?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const SearchInput: React.FC<SearchInputProps> = ({
  name,
  placeholder,
  maxLength,
  onFocus,
  onBlur,
  size = 'md'
}) => {
  const { register } = useFormContext()

  return (
    <input
      type='text'
      placeholder={placeholder}
      {...register(name, { required: true, maxLength })}
      className={clsx(
        'w-full text-white rounded-lg bg-[#2F3331]/40 backdrop-blur-md focus:ring-0 focus:outline-none focus:bg-[#2F3331]/80 duration-200 focus:font-medium peer placeholder:text-subtle/60',
        {
          'text-sm px-4 py-2': size === 'sm',
          'px-6 py-3': size === 'md',
          'text-lg px-6 py-4': size === 'lg',
          'text-xl px-6 py-4': size === 'xl',
        }
      )}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

export default SearchInput