'use client'

import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { getRankFromLP } from '@/core/relations/resolver'
import gradient from 'chartjs-plugin-gradient'
import datalabel from 'chartjs-plugin-datalabels'

dayjs.extend(localizedFormat)
ChartJS.register(gradient)
ChartJS.register(datalabel)

export interface RatingChartProps {
  data: {
    date: string | Date,
    rating: number
  }[]
  bottomLine?: number
  topLine?: number
}

export default function RatingChart({ data, bottomLine, topLine }: RatingChartProps) {

  const yLineGradientStops: { [key: number]: string } = {}

  Array.from( Array(data.length), (_, index) => index + 1 ).forEach( point => {
    const relativeRankData = getRankFromLP(data[point - 1].rating)
    yLineGradientStops[point-1] = relativeRankData.rankObject.color
  })
  const smallestSample = data.reduce( (acc, curr) => curr.rating < acc ? curr.rating : acc, data[0].rating)
  const largestSample = data.reduce( (acc, curr) => curr.rating > acc ? curr.rating : acc, data[0].rating)

  return <>
    <Line
      options={{
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            backgroundColor: data.map( r => getRankFromLP(r.rating).rankObject.color),
            borderRadius: 6,
            color: 'black',
            font: {
              weight: 'normal'
            },
            formatter: Math.round,
            padding: {
              left: 4,
              right: 4,
              top: 3,
              bottom: 3
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true
            },
            grid: {
              color: '#85828B0D'
            },
          },
          y: {
            display: true,
            suggestedMin: bottomLine,
            suggestedMax: topLine,
            grid: {
              color: '#85828B0D'
            },
            ticks: {
              callback: (value) => {
                const matchingRankData = getRankFromLP(value as number)

                if (matchingRankData.rankObject.threshold === value) {
                  return matchingRankData.rankObject.name
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
        labels: data.map(({ date }) => dayjs(date).format('ll')),
        datasets: [{
          fill: true,
          label: 'Rating',
          cubicInterpolationMode: 'monotone',
          data: data.map(({ rating }) => rating),
          gradient: {
            backgroundColor: {
              axis: 'y',
              colors: {
                [bottomLine || 0]: 'transparent',
                [topLine || largestSample]: '#85828B33'
              }
            },
            borderColor: {
              axis: 'x',
              colors: yLineGradientStops
            }
          }
        }]
      }}
    />
  </>
}