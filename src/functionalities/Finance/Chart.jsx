import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ entries }) {
  
  let amount=0;

  const finalAmount= entries.map((entry)=>{
    amount= entry.status== 'income'? amount+ parseInt(entry.amount): amount- parseInt(entry.amount);
    return amount;
  });


  const data_Set= entries.map((entry)=>entry.amount);
  const data_label= entries.map((entry)=>entry.date.toString().substring(0,14));

  const labels =data_label;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'money',
        data:finalAmount, 
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenditure',
      }
    }
  };


  return (
    <div style={{ width: '500px' }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;
