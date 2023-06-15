interface IChartLayoutProps {
  title: string
  subtitle: string
  children?: React.ReactNode
}

const ChartLayout: React.FunctionComponent<IChartLayoutProps> = ({ children, title, subtitle}) => {
  return <div className='flex flex-col justify-center items-center w-full gap-6 p-4 rounded-lg h-min bg-secondary'>
      <div className='flex flex-col w-full gap-1.5'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <span className='text-xs text-white/60'>{subtitle}</span>
      </div>
      {children && <div className='relative flex flex-col w-full gap-2 h-min whitespace-pre'>
        {children}
      </div> }
    </div>
}

export default ChartLayout
