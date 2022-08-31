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
import { RootState } from 'redux/store'
import { useSelector } from 'react-redux'

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
      text: '顧客数推移',
    },
  },
}

const CustomersLineChart = (): JSX.Element => {
  const customerCountArray = useSelector((state: RootState) => state.dashboard.customerCountArray)
  const weekDays = useSelector((state: RootState) => state.dashboard.weekDays)

  const labels = weekDays

  const data = {
    labels,
    datasets: [
      {
        label: '累計顧客数',
        data: customerCountArray,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }
  return (
    <Line options={options} data={data} />
  )
}

export default CustomersLineChart
