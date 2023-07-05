'use client'
import clsx from 'clsx'
import Link from 'next/link'

export interface NavbarLinkProps {
  name: string
  href: string
  active?: boolean
}

export default function NavbarLink({ href, active, name}: NavbarLinkProps) {
  return <Link 
    href={href}
    className={clsx(
      'duration-200 hover:text-accent/60',
      {
        'text-accent font-semibold': active, 
        'text-subtle': !active
      }
    )}
  >
    {name}
  </Link>
}