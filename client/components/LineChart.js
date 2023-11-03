import React from 'react';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LinearScale, // y
  CategoryScale, // x
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

Chart.register(
  LinearScale,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip
);

const LineChart = ({ chartData }) => {
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    setLabels(chartData.map(item => item.date));
    setPrices(chartData.map(item => item.close));
    setVolume(chartData.map(item => item.volume));
  }, [chartData]);

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
          color: 'white',
          font: {
            size: 15,
          },
        },
        grid: {
          display: false,
        },
        border: {
          width: 1,
          color: 'white',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 8,
          color: 'white',
          font: {
            size: 15,
          },
        },
        border: {
          width: 1,
          color: 'white',
        },
      },
      maintainAspectRatio: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    fullWidth: true,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    plugins: {
      tooltip: {
        displayColors: false,
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            const formattedValue = Number(value).toFixed(2);
            return '$' + formattedValue.toLocaleString();
          },
        },
        backgroundColor: 'white',
        titleColor: '#001f3f',
        bodyColor: '#001f3f',
        borderColor: '#001f3f',
        borderWidth: 1,
        bodyFont: {
          size: 16,
          family: 'Arial',
        },
        titleFont: {
          size: 16,
          family: 'Arial',
        },
      },
      title: {
        display: true,
        text: 'Your Chart Title',
        position: 'chartArea', // places the title inside the chart area
        align: 'start', // aligns to the start (can also use 'end' or 'center')
        font: {
          size: 20, // font size for the title
          color: 'white',
        },
        padding: {
          // padding around the title
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
    },
  };

  return (
    <>
      <div className="chart">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
