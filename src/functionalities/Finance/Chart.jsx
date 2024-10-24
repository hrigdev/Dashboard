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

function Chart({ entries = [] }) {  // Add default empty array
  // Guard clause for undefined or null entries
  if (!entries || entries.length === 0) {
    return (
      <div style={{ height: '180px', width: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        No data to display
      </div>
    );
  }

  let amount = 0;
  const finalAmount = entries.map((entry) => {
    // Add null check for entry.amount and ensure it's a number
    const entryAmount = entry?.amount ? Number(entry.amount) : 0;
    amount = entry?.status === 'income' ? amount + entryAmount : amount - entryAmount;
    return amount;
  });

  // Add null checks for date processing
  const data_label = entries.map((entry) => 
    entry?.date ? entry.date.toString().substring(0, 14) : ''
  );

  const labels = data_label;
  
  const pointColors = entries.map((entry) =>
    entry?.status === 'income' ? 'green' : 'red'
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Current Balance',
        data: finalAmount,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointStyle: 'circle',
        pointBorderWidth: 1,
        pointHoverBorderWidth: 3,
      },
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
       legend: {
      //   position: 'top',
        display:false
      },
      // title: {
      //   display: false,
      //   text: 'Expenditure',
      // },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '180px', width:'600px', position:'relative', top:"5px" }}>
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;