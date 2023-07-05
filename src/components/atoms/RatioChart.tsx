'use client'

export interface RatioChartProps {
  data: {
    label: string
    percentile: number
    color: string
  }[]
}

export default function RatioChart({ data }: RatioChartProps) {
  return <div className='flex flex-col gap-2 w-full'>
    <div
      className='rounded-lg w-full h-8 overflow-hidden bg-support flex'
    >
      {
        data.map( item => {
          return <div
            key={`${item.label}-${item.percentile}`}
            className='h-full flex'
            style={{
              width: `${item.percentile.toFixed()}%`,
              backgroundColor: item.color,
            }}
          >
          </div>
        })
      }
    </div>
    <div className='flex gap-4'>
      {
        data.map( item => {
          return <div
            key={`label-${item.label}-${item.percentile}`}
            className='w-min flex gap-2 items-center'
          >
            <div className='w-4 h-4 rounded' style={{backgroundColor: item.color}} />
            <span className='whitespace-nowrap text-subtle text-xs'>{item.label} ({item.percentile.toFixed(1)}%)</span>
          </div>
        })
      }
    </div>
  </div>
}