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
        borderColor: '#42A5F5', // you can choose any color you like
        fill: false,
      },
    ],
  };

  return (
    <>
      <div>
        <div className="chart">
          <Line data={data} />
        </div>
      </div>
    </>
  );
};

export default LineChart;
