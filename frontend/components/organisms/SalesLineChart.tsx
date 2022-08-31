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
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

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


const SalesLineChart = (): JSX.Element => {
  const transferAmountArray = useSelector((state: RootState) => state.dashboard.transferAmountArray)
  const feeAmountArray = useSelector((state: RootState) => state.dashboard.feeAmountArray)
  const weekDays = useSelector((state: RootState) => state.dashboard.weekDays)

  const labels = weekDays

  const data = {
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

  return (
    <>
      {console.log(data)}
      <Bar options={options} data={data} />
    </>
  )
}

export default SalesLineChart
