import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ info = {} }) { 
  const siteEntries = Object.entries(info);
  
  const labels = siteEntries.map(([site]) => site);

  const generateColor = (index) => {
    const baseColor = 100; 
    const r = (baseColor + index * 10) % 256; 
    const g = (baseColor + index * 20) % 256; 
    const b = (baseColor + index * 30) % 256; 
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Increased opacity for better visibility
  };

  const dataValues = siteEntries.map(([, time]) => time / (60000 * 60)); // Convert time to hours

  const data = {
    labels,
    datasets: [{
      label: 'Time Spent (hours)', // Use a single dataset for better alignment
      data: dataValues,
      borderColor: labels.map((_, index) => generateColor(index)), // Generate colors for each bar
      backgroundColor: labels.map((_, index) => generateColor(index)), // Same as borderColor
      barThickness: 15,
    }],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    scales: {
      x: {
        max: 24,
      },
      y: {
        beginAtZero: true,
        stacked: false,
      },
    },
    plugins: {
      legend: {
        position: 'none',
      },
      title: {
        display: true,
        text: 'Web Usage Chart',
      },
    },
    barPercentage: 0.5, // Reduces the width of the bars
    categoryPercentage: 0.8, // Reduces the space each category takes up
  };
  
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}

export default Chart;
