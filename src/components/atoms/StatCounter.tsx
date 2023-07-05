import clsx from 'clsx'

export interface StatCounterProps {
  label: string
  value: string | number
  valueClassName?: string
}

export default async function StatCounter({ label, value, valueClassName }: StatCounterProps) {
  return <div className='flex flex-col text-end justify-end w-full 2xl:w-min 2xl:whitespace-nowrap bg-secondary border border-secondary-border xl:border-none xl:bg-transparent h-full p-4 xl:p-0 rounded-lg'>
    <span 
      className={clsx(
        'text-xl font-semibold',
        valueClassName
      )}
    >{value}</span>
    <span className='text-xs text-subtle'>{label}</span>
  </div>
}
