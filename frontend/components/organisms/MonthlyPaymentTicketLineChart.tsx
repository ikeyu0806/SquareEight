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
      text: '月額課金プラン加入者数推移',
    },
  },
}

const labels = ['1日', '2日', '3日', '4日', '5日', '6日', '7日']

export const data = {
  labels,
  datasets: [
    {
      label: '受講し放題プラン',
      data: [70, 80, 80, 85, 85, 90, 100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: '週１プラン',
      data: [100, 110, 120, 120, 140, 140, 150],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

const MonthlyPaymentTicketLineChart = (): JSX.Element => {
  return (
    <Line options={options} data={data} />
  )
}

export default MonthlyPaymentTicketLineChart
