import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '予約ページごと週間売り上げ',
    },
  },
}

const labels = ['1日', '2日', '3日', '4日', '5日', '6日', '7日']

export const data = {
  labels,
  datasets: [
    {
      label: '筋トレメソッド',
      data: [100, 300, 700, 400, 200, 300, 200],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'ボディリメイク',
      data: [400, 500, 200, 900, 600, 900, 1000],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const ReservePageSalesLineChart = (): JSX.Element => {
  return (
    <Line options={options} data={data} />
  )
}

export default ReservePageSalesLineChart
