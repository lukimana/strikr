import clsx from 'clsx'

type ButtonProps = {
  background?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'subtle' | 'blur' | 'none'
  backgroundHoverColor?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'subtle' | 'blur' | 'none'
  textColor?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'subtle' | 'none'
  textHovercolor?: 'primary' | 'secondary' | 'tertiary' | 'accent' | 'subtle' | 'none'
  type?: 'submit' | 'button' | 'reset'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  fluid?: boolean
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  background = 'bg-secondary',
  backgroundHoverColor = 'none',
  textColor = 'text-subtle',
  textHovercolor = 'none',
  type = 'submit',
  size = 'md',
  fluid = false,
  className,
  children,
  onClick
}) => {
  const buttonClasses = clsx(
    'inline-flex items-center justify-center',
    {
      'rounded-lg duration-200': true,
      'px-4 py-2 text-xs': size === 'xs',
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
      'w-full': fluid,
      'bg-primary': background === 'primary',
      'bg-secondary': background === 'secondary',
      'bg-tertiary': background === 'tertiary',
      'bg-accent': background === 'accent',
      'bg-subtle': background === 'subtle',
      'bg-[#2F3331]/40 backdrop-blur-md': background === 'blur',
      'hover:bg-primary': backgroundHoverColor === 'primary',
      'hover:bg-secondary': backgroundHoverColor === 'secondary',
      'hover:bg-tertiary': backgroundHoverColor === 'tertiary',
      'hover:bg-accent': backgroundHoverColor === 'accent',
      'hover:bg-subtle': backgroundHoverColor === 'subtle',
      'hover:bg-[#2F3331]/40 hover:backdrop-blur-md': backgroundHoverColor === 'blur',
      'text-primary': textColor === 'primary',
      'text-secondary': textColor === 'secondary',
      'text-tertiary': textColor === 'tertiary',
      'text-accent': textColor === 'accent',
      'text-subtle': textColor === 'subtle',
      'hover:text-primary': textHovercolor === 'primary',
      'hover:text-secondary': textHovercolor === 'secondary',
      'hover:text-tertiary': textHovercolor === 'tertiary',
      'hover:text-accent': textHovercolor === 'accent',
      'hover:text-subtle': textHovercolor === 'subtle',
    },
    className
  )

  return <button 
    onClick={onClick} 
    type={type} 
    className={buttonClasses}
  >
    {children}
  </button>
}

export default Button