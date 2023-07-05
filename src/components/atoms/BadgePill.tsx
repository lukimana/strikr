import clsx from 'clsx'

export interface BadgePillProps {
  content: string
  className?: string
}

export default async function BadgePill({ content, className}: BadgePillProps) {
  return <span 
    className={clsx('bg-support border-support-border rounded-lg border-[1px] px-2 py-1 w-min whitespace-nowrap', className)}
  >
    {content}
  </span>
}