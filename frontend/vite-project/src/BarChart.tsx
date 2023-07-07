import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend, scales
} from "chart.js";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

import { Bar } from 'react-chartjs-2'
import './App.css'


type BarChartProps = {
    travelMethods: string[]
    co2Values: number[]
    chartYAxis: string
}

const BarChart = (props: BarChartProps) => {

        const labels = props.travelMethods;
        const data = {
            labels: labels,
            datasets: [{
                label: props.chartYAxis,
                data: props.co2Values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',

                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',

                ],
                borderWidth: 1
            }]
        };
    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Travel Method',
                    font: {
                        size: 24
                    }
                },
                ticks: {
                    font: {
                        size: 18,
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: props.chartYAxis,
                    font: {
                        size: 24
                    }
                },
                ticks: {
                    font: {
                        size: 18,
                    }
                }
            }
        }

    }
        return (<Bar
                data={data}
                options={options}
    />

        )
}

export default BarChart