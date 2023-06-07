import ChartLayout from '@/components/layout/Chart'
import { Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient'
import datalabel from 'chartjs-plugin-datalabels'

import { getEloColor, getEloFromLP } from '@/core/relations/resolver'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

Chart.register(gradient)
Chart.register(datalabel)
interface IRatingHistoryProps {
  data: {
    value: number,
    date: string
  }[]
  bottomLine?: number
}


const RatingHistoryChart: React.FunctionComponent<IRatingHistoryProps> = ({ data, bottomLine}) => {
  const max = Math.max(...data.map( d => d.value ) || [] )
  const [isZoomed, setZoomed] = useState(false)

  useEffect(()=>{
    (async () => {
      const zoom = await (await import('chartjs-plugin-zoom')).default
      
      Chart.register(zoom)
      setTimeout(()=>{

      }, 1000)
    })()
  }, [])

  return <>
    <Line 
      options={{
        plugins: {
          legend: {
            display: false
          },
          zoom: {
            zoom: {
              drag: {
                enabled: true,
                modifierKey: 'shift',
              },
              wheel: {
                enabled: false
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
              onZoomComplete: ({chart}) => {
                setZoomed(true)
              }
            },
            pan: {
              modifierKey: 'ctrl',
              enabled: true,
              mode: 'xy',
            },
            limits: {
              x: {
                max: data.length - 1
              },
              y: {
                min: bottomLine || 0,
                max: max
              }
            }
          },
          datalabels: {
            // @ts-expect-error - chartjs-plugin-datalabels is not typed
            backgroundColor: function(context) {
              return context.dataset.backgroundColor
            },
            borderRadius: 4,
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: Math.round,
            padding: 6
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true
            }
          },
          y: {
            display: true,
            suggestedMin: bottomLine,
            title: {
              display: true
            },
          },
        },
      }}
      data={{
        labels: data.map( d => dayjs(d.date).format('MM/DD/YYYY @ ')),
        datasets: [
          {
            label: 'Rating',
            data: data.map( d => d.value), // Use appropriate property for rating
            fill: true,
            // backgroundColor: 'rgba(19,219,154,0.1)',
            borderColor: 'rgba(19,219,154,1)',
            tension: 0.4,
            cubicInterpolationMode: 'monotone',
            gradient: {
              backgroundColor: {
                axis: 'y',
                colors: {
                  [bottomLine || 0]: 'transparent',
                  [max]: 'rgba(19,219,154,0.2)'
                }
              }
            },
            datalabels: {
              align: 'start',
              anchor: 'start'
            }
          }
        ],
      }}
    />
    { isZoomed && <span 
      className='absolute text-xs px-2 py-1.5 rounded-lg bg-primary right-0 -top-2'
      onClick={()=> setZoomed(false)}
    >
        Reset zoom
    </span> }
  </>
}

export default RatingHistoryChart
