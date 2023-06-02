import ChartLayout from '@/components/layout/Chart'
import { Line } from 'react-chartjs-2'

interface IRatingHistoryProps {
  data: number[]
  labels: string[]
  bottomLine?: number
}

const RatingHistoryChart: React.FunctionComponent<IRatingHistoryProps> = ({ data, labels, bottomLine}) => {
  return <Line 
      options={{
        
        plugins: {
          legend: {
            display: false
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
            backgroundColor: 'rgba(19,219,154,0.1)',
            borderColor: 'rgba(19,219,154,1)',
            tension: 0.4,
            cubicInterpolationMode: 'monotone',
          }
        ],
      }}
    />
}

export default RatingHistoryChart
