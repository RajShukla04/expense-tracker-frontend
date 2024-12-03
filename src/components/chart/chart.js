"use client";
// ChartSection.jsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Automatically registers all necessary components

const ChartSection = ({ expenseData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Create the chart only once on component mount
    console.log(expenseData);
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar", // Change to 'bar', 'line', etc. for different chart types
      data: {
        labels: expenseData.map((expense) => expense.category),
        datasets: [
          {
            data: expenseData.map((expense) => expense.amount),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "here's your Expenses by Category",
          },
        },
      },
    });

    // Cleanup to avoid memory leaks
    return () => {
      chart.destroy();
    };
  }, [expenseData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartSection;
