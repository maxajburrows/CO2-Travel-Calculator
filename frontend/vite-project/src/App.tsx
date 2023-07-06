
import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";


import {
        Chart as ChartJS,
        BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)


function App() {
        const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'];
        const data = {
                labels: labels,
                datasets: [{
                        label: 'My First Dataset',
                        data: [65, 59, 80, 81, 56, 55, 40],
                        backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                                'rgb(255, 99, 132)',
                                'rgb(255, 159, 64)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(54, 162, 235)',
                                'rgb(153, 102, 255)',
                                'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                }]
        };
        const config = {
                type: 'bar',
                data: data,
                options: {
                        scales: {
                                y: {
                                        beginAtZero: true
                                }
                        }
                },
        };


    // const getDataFromBackend = async () => {
    //     try {
    //         console.log((await axios.get(`http://localhost:8080/api/travelCO2`)));
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }
    //
    //     useEffect(() => {
    //         getDataFromBackend()
    //     }, []);

        return (<Bar
                data={data}
            options={config}/>






        )

}

export default App;
