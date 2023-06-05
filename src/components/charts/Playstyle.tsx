import { calculateTotalAssists, calculateTotalGoals, calculateTotalKnockouts, calculateTotalSaves } from '@/core/utils/statistics'

import { Radar } from 'react-chartjs-2'

interface IRadarChartProps {
  forward?: {
    knockouts: number
    scores: number
    assists: number
    saves: number
  }
  goalie?: {
    knockouts: number
    scores: number
    assists: number
    saves: number
  }
}

const PlayStyleChart: React.FunctionComponent<IRadarChartProps> = ({ forward, goalie }) => {
  return <Radar 
  options={{
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255,255,255,.1)'
        },
        grid: {
          color: 'rgba(255,255,255,.1)'
        },
        ticks: {
          backdropColor: 'transparent',
          display: false,
        }
      }
    },
    plugins: {
      legend: {
        display: (!!goalie && !!forward)
      },
      datalabels: {
        display: false
      },
    }
  }}
  data={{
  labels: [
    'Goals', 
    // 'Saves',
    'Assists', 
    'Knockouts'
  ],
  datasets: [
    ...(forward ? [
      {
        label: 'Forward',
        backgroundColor: 'rgba(240, 84, 79,0.1)',
        borderColor: 'rgba(240, 84, 79,1)',
        pointBackgroundColor: 'rgba(240, 84, 79,.1)',
        pointBorderColor: 'rgba(255,255,255,1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        data: [
          forward.scores,
          // forward.saves,
          forward.assists,
          forward.knockouts,
        ],
      },
    ]: []),
    
    ...(goalie ? [
      {
      label: 'Goalie',
      backgroundColor: 'rgba(191, 182, 252,0.1)',
      borderColor: 'rgba(191, 182, 252,1)',
      pointBackgroundColor: 'rgba(191, 182, 252,.1)',
      pointBorderColor: 'rgba(255,255,255,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
      data: [
        goalie.scores,
        // goalie.saves,
        goalie.assists,
        goalie.knockouts,
      ],
    }] : []),
    ...(goalie && forward ? [{
      label: 'Self Average',
      backgroundColor: 'rgba(19,219,154,0.1)',
      borderColor: 'rgba(19,219,154,1)',
      pointBackgroundColor: 'rgba(19,219,154,.1)',
      pointBorderColor: 'rgba(255,255,255,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
      data: [
        (forward.scores + goalie.scores) / 2,
        // (forward.saves + goalie.saves) / 2,
        (forward.assists + goalie.assists) / 2,
        (forward.knockouts + goalie.knockouts) / 2,
      ],
    }] : []),
  ]
  }} 
/>
}

export default PlayStyleChart
