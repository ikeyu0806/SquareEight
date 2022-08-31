import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

const labels = ['1日', '2日', '3日', '4日', '5日', '6日', '7日']

const transferAmountArray = [400, 500, 200, 900, 600, 900, 1000]

const feeAmountArray = [40, 50, 20, 90, 60, 90, 100]

export const data = {
  labels,
  datasets: [
    {
      label: '手数料',
      data: feeAmountArray,
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: '売上',
      data: transferAmountArray,
      backgroundColor: 'rgb(53, 162, 235)'
    },
  ],
}


const SalesLineChart = (): JSX.Element => {
  return (
    <Bar options={options} data={data} />
  )
}

export default SalesLineChart
