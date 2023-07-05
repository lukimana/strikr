'use client'

export interface ContentBlockProps {
  children?: React.ReactNode[]
  title: string
  subtitle?: string
  Icon?: React.ReactNode
}

export default function ContentBlock({ children, title, subtitle, Icon } : ContentBlockProps) {
  return <section
    className='flex flex-col items-center w-full rounded-lg'
  >
    <div className='w-full p-4 rounded-t-lg bg-secondary border-t border-secondary-border flex items-center gap-2 border-x select-none'>
      {/* @ts-ignore-error | This is being misinterpreted by typescript server */}
      {Icon && Icon }
      <div className='flex flex-col text-subtle'>
        {title}
        {subtitle && <span className='text-xs'>{subtitle}</span>}
      </div>
      {children && children.length > 0 && <div className='ml-auto'> {children[0]} </div>}
    </div>
    <div className="flex flex-col w-full rounded-b-lg bg-secondary border-b border-secondary-border px-4 border-x pb-4">
      {children && children.length > 0 && children.slice(1)}
    </div>
  </section>
}