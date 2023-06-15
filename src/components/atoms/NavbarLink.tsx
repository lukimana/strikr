import clsx from 'clsx'
import Link from 'next/link'

interface NavbarLinkProps {
  href: string
  isActive: boolean
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ href, isActive, children, className }) => {
  return <Link href={href}>
    <span
      className={clsx(className, {
        'font-normal opacity-60 hover:opacity-100 duration-200 hover:text-accent text-sm': true,
        '!font-bold !opacity-100': isActive,
      })}
    >
      {children}
    </span>
  </Link>
}

export default NavbarLink
