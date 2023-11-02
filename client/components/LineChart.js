import React from 'react';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

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
        label: 'Closing Price',
        data: prices,
        borderColor: '#42A5F5', // you can choose any color you like
        fill: false,
      },
    ],
  };

  return (
    <>
      <div>
        <Line data={data} />
      </div>
    </>
  );
};

export default LineChart;
