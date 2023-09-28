import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./doughnut.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const data = {
    datasets: [
      {
        lable: "Poll",
        data: [100, 20],
        backgroundColor: ["#FF9F40", "#3751FF"],
        borderColor: ["#FF9F40", "#3751FF"],
        display: "flex",
      },
    ],
    labels: ["Budgeted", "Actual"],
  };

  
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        ltr: true,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 17,
          boxWidth: 3,
          boxHeight:3,
        },
        layout: {
          autoPadding: true,
        },
      },
    },
    maintainAspectRatio: false, // Add this line to disable aspect ratio maintenance
    cutout: "70%",
  };

  return (
    <div className="doughnutChart" style={{
      width: 164,
      height: 120,
    }}>
      <Doughnut
        data={data}
        options={options}
      ></Doughnut>
    </div>
  );
}

export default DoughnutChart;
