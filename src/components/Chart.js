import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Chart = ({ startIndex, displayCount, productsData }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const selectedProducts = productsData.slice();

    if (selectedProducts.length === 0) return;

    const chartData = {
      labels: selectedProducts[0].data.map((point) => {
        const date = new Date(point.x);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        return `${day} ${month}`;
      }),
    
      datasets: selectedProducts.map((product, index) => ({
        label: product.title,
        data: product.data.map((point) => point.y),
        borderColor: `hsl(${index * 36}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 36}, 70%, 50%, 0.3)`,
        tension: 0.4, 
      })),
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 20, 
          right: 20,
          top: 20, 
          bottom: 20,
        },
      },
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


    const ctx = canvasRef.current.getContext("2d");
    chartInstance.current = new ChartJS(ctx, {
      type: "line", 
      data: chartData,
      options: chartOptions,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [startIndex, displayCount, productsData]);

  const chartHeight =
    productsData.length > 15
      ? "h-[900px]"
      : productsData.length > 5
      ? "h-[600px]"
      : "h-[400px]";

  return (
    <div className={`w-[600px] ${chartHeight} sm:w-full`}>
    {productsData?.length === 0 ? (
      <div className="w-full h-full flex justify-center items-center text-xl font-semibold text-gray-500">
        No Data Available
      </div>
    ) : (
      <canvas ref={canvasRef}></canvas>
    )}
  </div>
  );
};

export default Chart;
