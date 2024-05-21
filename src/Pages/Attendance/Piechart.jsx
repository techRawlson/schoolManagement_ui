// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({p,a,pb}) => {
    // Define the data for the chart

    const presentAbsentNumber=pb.length;
    const presentNumber=(p.length/(presentAbsentNumber))*100;
    const absentNumber=(a.length/(presentAbsentNumber))*100;
    
    console.log(presentAbsentNumber)
    const noRecord=((presentAbsentNumber-(a.length+p.length))/presentAbsentNumber)*100

    console.log(presentNumber,absentNumber,noRecord)
    const data = {
        labels: [ 'Present','Absent',  'No Record', ],
        datasets: [
            {
                label: '% of attendance',
                data: [presentNumber, absentNumber, noRecord],
                backgroundColor: [
                   
                    'green',
                    'yellow',
                    'orangered'
                    
                ],
                
                borderWidth: 1
            }
        ]
    };

    // Define options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
              
            },
            title: {
                display: true,
                text: 'Sample Pie Chart'
            }
        }
    };

    return <Pie data={data} options={options}  width={500} 
    height={500}/>;
};

export default PieChart;
