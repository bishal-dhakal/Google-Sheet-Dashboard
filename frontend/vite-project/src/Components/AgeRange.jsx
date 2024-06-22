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

const AgeRangeChart = ({ gender }) => {
  const [ageData, setAgeData] = useState({
    minAge: null,
    maxAge: null
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/min-max-age-by-gender/Female/`)
      .then(response => response.json())
      .then(data => {
        setAgeData({
          minAge: data.min_age,
          maxAge: data.max_age
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [gender]);

  const chartData = {
    labels: ['Minimum Age', 'Maximum Age'],
    datasets: [
      {
        label: 'Age Range',
        backgroundColor: '#3e95cd',
        data: [ageData.minAge, ageData.maxAge]
      }
    ]
  };

  const options = {
    legend: {
      display: false
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Age Range for {gender}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AgeRangeChart;
