import clsx from 'clsx'

interface StatItemProps {
  title: string
  value: string | number
  color?: string
}

const PilotStatItem: React.FC<StatItemProps> = ({ title, value, color = 'text-white' }) => {
  return (
    <div className="flex flex-col justify-end text-end w-[calc(50%-1rem)] lg:w-[calc(33.8%-1rem)] xl:w-[calc(23%-1rem)] 2xl:w-[calc(19%-1rem)] bg-secondary xl:bg-transparent p-4 xl:p-0 rounded-lg">
      <h5 className={clsx('text-2xl xl:text-xl font-bold', color)} >{value}</h5>
      <h6 className="text-xs text-white/40">{title}</h6>
    </div>
  )
}

export default PilotStatItem