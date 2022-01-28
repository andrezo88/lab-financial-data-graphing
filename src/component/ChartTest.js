import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import axios from 'axios'

export const ChartTest = () => {

    const [data, setData] = useState({
        labels: [], // x axis
        datasets: [
            {
                id: 1,
                label: '', // y axis
                data: [],
            },
        ],
    })

    useEffect(() => {
        getData()

        console.log('getData')
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            }
        }
    };

    const getData = async () => {
        try {
            const { data } = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
            //console.log(Object.keys(data.bpi))
            console.log(Object.values(data.bpi))
            const xAxys = { labels: Object.keys(data.bpi), dataSets: [{ id: 1, label: '', data: Object.values(data.bpi) }] }
            setData(xAxys)
            //console.log(data)
        } catch (error) {
            window.alert('Erro!')
        }
    }





    return (

        <Line
            data={data}
            options={options}
            width='400px'
            height='400px'
        />

    )
}