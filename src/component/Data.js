import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

export const Data = () => {

    const drawChart = () => {
        const ctx = 'myChart';
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const [btcData, setBtcData] = useState([]);

    const getData = async () => {
        try {
            const { data } = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
            setBtcData(data)
            console.log(data)
        } catch (error) {
            window.alert('Erro!')
        }
    }


    useEffect(() => {
        getData()
        drawChart()
        console.log('getData')
    }, [])

    /* useEffect(() => {
        if (!!myChart) myChart.destroy()
        console.log('drawchart')
    }, [btcData]) */


    return (
        <>

            <canvas id="myChart" width="400" height="400" /* ref={canvasRef} */ ></canvas>
        </>
    )
}