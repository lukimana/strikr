'use client'

import { normalizePlaystyleAttributes } from '@/core/mathUtils'
import { Radar } from 'react-chartjs-2'

export interface PlaystyleChartProps {
  forward?: {
    assists: number
    knockouts: number
    scores: number
    saves: number
    mvp: number
  }
  goalie?:{
    assists: number
    knockouts: number
    scores: number
    saves: number
    mvp: number
  }
}

export default function PlaystyleChart({ forward, goalie }: PlaystyleChartProps) {
  const normalizedForwardValues = forward && normalizePlaystyleAttributes({ assists: forward.assists, knockouts: forward.knockouts, scores: forward.scores, mvp: forward.mvp })
  const normalizedGoalieValues = goalie && normalizePlaystyleAttributes({ assists: goalie.assists, knockouts: goalie.knockouts, scores: goalie.scores, mvp: goalie.mvp })

  return <Radar
    options={{
      responsive: true,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255,255,255,.05)'
          },
          grid: {
            color: 'rgba(255,255,255,.05)'
          },
          ticks: {
            backdropColor: 'transparent',
            display: false,
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
           
        },
        datalabels: {
          backgroundColor: 'rgb(64, 64, 64)',
          borderRadius: 4,
          // @ts-expect-error - chartjs-plugin-datalabels is not typed
          color: function(context) {
            return context.dataset.borderColor
          },
          font: {
            weight: 'bold'
          },
          formatter: (value) => value.toFixed(1),
          padding: 2
        }
      }
    }}
    data={{
      labels: [
        'Scores', 
        'Knockouts', 
        'Assists',
        // 'MVP'
        // 'Saves'
        // t('os.terms.saves')
      ],
      datasets: [
        ...(forward ? [
          {
            backgroundColor: '#F69E1866',
            borderColor: '#F69E18',
            label: 'Forward',
            data: [
              normalizedForwardValues!.scores,
              normalizedForwardValues!.knockouts,
              normalizedForwardValues!.assists,
              // normalizedForwardValues.mvp
              // normalizedForwardValues.saves
            ],
          }
        ] : []),
        ...(goalie ? [
          {
            backgroundColor: '#F6661866',
            borderColor: '#F66618',
            label: 'Goalie',
            data: [
              normalizedGoalieValues!.scores,
              normalizedGoalieValues!.knockouts,
              normalizedGoalieValues!.assists,
              // normalizedForwardValues.mvp
              // normalizedGoalieValues.saves
            ]
          }
        ] : [])
      ]
    }}
  />
}