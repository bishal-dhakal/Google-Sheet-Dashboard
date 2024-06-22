import React, { useEffect, useState } from 'react';
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

ChartJS.register(Title, Tooltip, Legend);

const SalaryRangeChart = () => {
  const [chartData, setChartData] = useState({
    minSalary: null,
    maxSalary: null
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/salary-range/28/30/')  // Adjust URL as per your Django API endpoint
      .then(response => response.json())
      .then(data => {
        setChartData({
          minSalary: parseFloat(data.min_salary),  // Convert to float if necessary
          maxSalary: parseFloat(data.max_salary)   // Convert to float if necessary
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const chartDataObj = {
    labels: ['Minimum Salary', 'Maximum Salary'],
    datasets: [
      {
        label: 'Salary Range',
        backgroundColor: ['#3e95cd', '#8e5ea2'],
        data: [chartData.minSalary, chartData.maxSalary]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Salary Range Chart</h2>
      <Bar data={chartDataObj} options={options} />
    </div>
  );
};

export default SalaryRangeChart;
