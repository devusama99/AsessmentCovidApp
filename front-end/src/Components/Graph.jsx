import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const labels = [
  "Monday",
  "Tuesday",
  "Wednessday",
  "Thurday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Graph({ dataWeek }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: "Positive Cases",
            data: dataWeek,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}
