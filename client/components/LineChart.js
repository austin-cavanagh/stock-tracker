import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LinearScale, // y
  CategoryScale, // x
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';

Chart.register(
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement
);

const LineChart = ({ chartData }) => {
  const [labels, setLabels] = useState(() => {
    return chartData.map(item => item.date);
  });
  const [prices, setPrices] = useState(() => {
    return chartData.map(item => item.close);
  });
  const [volume, setVolume] = useState(() => {
    return chartData.map(item => item.volume);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Price',
        data: prices,
        borderColor: 'white',
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: value => {
            return '$' + parseInt(value).toLocaleString();
          },
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      maintainAspectRatio: false,
    },
  };

  return (
    <>
      <div className="chart-container">
        <h2 className="financial-statement-title">Stock Chart</h2>
        <div className="chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default LineChart;
