import ChartLayout from '@/components/layout/Chart'
import { Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient'
import datalabel from 'chartjs-plugin-datalabels'

import { getEloColor, getEloFromLP } from '@/core/relations/resolver'
import { useEffect } from 'react'

Chart.register(gradient)
Chart.register(datalabel)
interface IRatingHistoryProps {
  data: number[]
  labels: string[]
  bottomLine?: number
}


const RatingHistoryChart: React.FunctionComponent<IRatingHistoryProps> = ({ data, labels, bottomLine}) => {
  const max = Math.max(...data || [] )

  useEffect(()=>{
    (async () => {
      const zoom = await (await import('chartjs-plugin-zoom')).default
      
      Chart.register(zoom)
      setTimeout(()=>{

      }, 1000)
    })()
  }, [])

  return <Line 
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
                enabled: true,
                speed: 0.02
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
            pan: {
              modifierKey: 'ctrl',
              enabled: true,
              mode: 'xy',
            },
            // limits: {
            //   x: {
            //     min: 0,
            //     max: labels.length - 1
            //   },
            //   y: {
            //     min: bottomLine || 0,
            //     max: max
            //   }
            // }
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
        labels: labels,
        datasets: [
          {
            label: 'Rating',
            data: data, // Use appropriate property for rating
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
}

export default RatingHistoryChart
