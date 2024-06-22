import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement,
  Tooltip,
  Legend
)


const DataDisplay = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gender-count/');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map(item => item.gender),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };
  

  return (
    <div className="data-display">
      <h2>Data Display with Pie Chart</h2>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default DataDisplay;
