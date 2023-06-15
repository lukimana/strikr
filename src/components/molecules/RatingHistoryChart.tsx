import ChartLayout from '@/components/layouts/Chart'
import { Chart } from 'chart.js'
import { Line } from 'react-chartjs-2'
import gradient from 'chartjs-plugin-gradient'
import datalabel from 'chartjs-plugin-datalabels'

import { getRankFromLP } from '@/core/relations/resolver'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { createSequentialArray } from '@/core/statistics/math'
import { text } from 'stream/consumers'
import rankRelation from '@/core/relations/objects/ranks'

dayjs.extend(localizedFormat)

Chart.register(gradient)
Chart.register(datalabel)
interface IRatingHistoryProps {
  data: {
    value: number,
    date: string
  }[]
  bottomLine?: number
  topLine?: number
}


const RatingHistoryChart: React.FunctionComponent<IRatingHistoryProps> = ({ data, bottomLine, topLine}) => {
  if (!data) { return <></>}
  
  const max = (topLine && topLine < 9000 ? topLine : false) || Math.max(...data.map( d => d.value ) || [] ) + 100
  const min = bottomLine || Math.min(...data.map( d => d.value ) || [] ) - 100
  const currentRank = getRankFromLP(data[data.length - 1].value)
  // const [isZoomed, setZoomed] = useState(false)
  const orderedData = data.sort((a, b) => dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1)


  return <>
    <Line 
      options={{
        plugins: {
          legend: {
            display: false
          },
          // zoom: {
          //   zoom: {
          //     drag: {
          //       enabled: true,
          //       modifierKey: 'shift',
          //     },
          //     wheel: {
          //       enabled: false
          //     },
          //     pinch: {
          //       enabled: true
          //     },
          //     mode: 'xy',
          //     onZoomComplete: ({chart}) => {
          //       setZoomed(true)
          //     }
          //   },
          //   pan: {
          //     modifierKey: 'ctrl',
          //     enabled: true,
          //     mode: 'xy',
          //   },
          //   limits: {
          //     x: {
          //       max: max
          //     },
          //     y: {
          //       min: min,
          //       max: max
          //     }
          //   }
          // },
          datalabels: {
            backgroundColor: data.map( r => getRankFromLP(r.value).rankObject.color + '80' ),
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
            },
          },
          y: {
            display: true,
            suggestedMin: min,
            suggestedMax: max,
            labels: ['Jorge'],
            ticks: {
              callback: (value) => {
                const exactThreshold = rankRelation.find( r => r.threshold === value)

                if (exactThreshold) {
                  return exactThreshold.name
                }

                return value
              },
              stepSize: 100,
              // color: createSequentialArray(min, max).filter( r => r % 100 === 0).map( v => getRankFromLP(v).rankObject.color ),
              color: (context) => {                
                return getRankFromLP(context.tick.value)?.rankObject.color || 'white'
              }
            },    
            title: {
              display: true
            },
          },
        },
      }}
      data={{
        labels: orderedData.map( d => dayjs(d.date).format('ll LT')),
        datasets: [
          {
            label: 'Rating',
            data: orderedData.map( d => d.value), // Use appropriate property for rating
            fill: true,
            borderColor: currentRank.rankObject.color,
            tension: 0.4,
            cubicInterpolationMode: 'monotone',
            gradient: {
              backgroundColor: {
                axis: 'y',
                colors: {
                  [bottomLine || 0]: 'transparent',
                  [max]: currentRank.rankObject.color + '80'
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
    {/* { isZoomed && <span 
      className='absolute text-xs px-2 py-1.5 rounded-lg bg-primary right-0 -top-2'
      onClick={()=> setZoomed(false)}
    >
        Reset zoom
    </span> } */}
  </>
}

export default RatingHistoryChart
