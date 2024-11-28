import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function Chart({ startIndex, displayCount, productsData }) {

  const endIndex = Math.min(startIndex + displayCount, productsData.length);

  const selectedProducts = productsData.slice();

  if (selectedProducts.length === 0) {
    return <div className="text-2xl font-bold p-4 text-center">No Properties Found</div>;
  }

  const chartData = {
    labels: selectedProducts[0].data.map((point) => point.x),
    datasets: selectedProducts.map((product, index) => ({
      label: product.title,
      data: product.data.map((point) => point.y),
      borderColor: `hsl(${index * 36}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 36}, 70%, 50%, 0.3)`,
      fill: false,
    })),
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        title: { display: true, text: "Date" },
      },
      y: {
        reverse: true,
        title: { display: true, text: "Ranking" },
      },
    },
  };

    return (
      <div className="flex justify-center items-center w-full h-full p-4">
      <div className="w-full max-w-4xl h-full">
        <Line key={startIndex + displayCount} data={chartData} options={chartOptions} />
      </div>
    </div>
);
}

export default Chart;
