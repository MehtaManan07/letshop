import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const Chart = ({ orders }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dateData = [];
  useEffect(() => {}, [orders]);

  const lineChart = (
    <Line
      data={{
        labels: orders.map((order) =>
          new Date(order.createdAt).toString().slice(4, 15)
        ),
        datasets: [
          {
            data: orders.map((order) => order.amount),
            label: "Revenue",
            borderColor: "#3333ff",
            fill: true,
          },
        ],
      }}
    />
  );
  return <div className="">{lineChart}</div>;
};

export default Chart;
