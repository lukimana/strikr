import { calculateTotalAssists, calculateTotalGoals, calculateTotalKnockouts, calculateTotalSaves } from '@/core/utils/statistics'

import { Radar } from 'react-chartjs-2'

interface IRadarChartProps {
  knockouts: number
  goals: number
  assists: number
  saves: number
  gamemode: string
}

const PlayStyleChart: React.FunctionComponent<IRadarChartProps> = ({ assists, goals, knockouts, saves, gamemode }) => {
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
        display: false
      }
    }
  }}
  data={{
  labels: ['Goals', 'Saves', 'Assists', 'Knockouts'],
  datasets: [
    {
      label: 'Total',
      backgroundColor: 'rgba(19,219,154,0.1)',
      borderColor: 'rgba(19,219,154,1)',
      pointBackgroundColor: 'rgba(19,219,154,.1)',
      pointBorderColor: 'rgba(255,255,255,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75,192,192,1)',
      data: [
        goals,
        saves,
        assists,
        knockouts,
      ],
    },
  ]
  }} 
/>
}

export default PlayStyleChart
