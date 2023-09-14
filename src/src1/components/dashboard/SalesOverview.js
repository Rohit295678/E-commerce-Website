import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = ({product,order}) => {
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 10,
      max: 1000,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriessalesoverview = [
    {
      name: "Amount Buy",
      data: [product.Jan?product.Jan:0, product.Feb?product.Feb:0, product.Mar?product.Mar:0, product.Apr?product.Apr:0, product.May?product.May:0, product.Jun[0], product.Jul?product.Jul:0, product.Aug?product.Aug:0, product.Sep?product.Sep:0, product.Oct?product.Oct:0, product.Nov?product.Nov:0, product.Dec?product.Dec:0],
    },
    {
      name: "Amount Sell",
      data: [order.Jan?order.Jan:0, order.Feb?order.Feb:0, order.Mar?order.Mar:0, order.Apr?order.Apr:0, order.May?order.May:0, order.Jun?order.Jun:0, order.Jul?order.Jul:0, order.Aug?order.Aug:0, order.Sep?order.Sep:0, order.Oct?order.Oct:0, order.Nov?order.Nov:0, order.Dec?order.Dec:0],
    },
  ];
  return (
    <BaseCard title="Sales Overview">
      <Chart
        options={optionssalesoverview}
        series={seriessalesoverview}
        type="bar"
        height="295px"
      />
    </BaseCard>
  );
};



export default SalesOverview;
